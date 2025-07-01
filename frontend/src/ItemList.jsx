import React, { useEffect, useState } from "react";
import ItemList from './ItemList';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch items from your backend API
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Items</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {items.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <img src={item.imageUrl} alt={item.brand} style={{ width: "200px" }} />
            <h3>{item.brand}</h3>
            <p>Category: {item.category}</p>
            <p>Status: {item.status}</p>
            <p>Tags: {Array.isArray(item.tags) ? item.tags.join(", ") : item.tags}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;