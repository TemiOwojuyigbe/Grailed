const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        let user = await User.findOne({ email});
        if(user){
            return res.status(400).json({ message: "User already exists"});
        }

        user = new User({ username, email, password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {user: {id: user._id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.status(201).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error:'Server error'});
    }

};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials"});

        const payload = {user: {id: user._id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};