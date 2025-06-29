import React from "react";

function FoodItemCard({ item, onAddToCart }) {
  return (
    <div style={styles.card}>
      {/* This displays the image */}
      <img src={item.image} alt={item.name} style={styles.image} />
      <h3>{item.name}</h3>
      <p>Price: ₹{item.price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    width: "160px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  image: {
    width: "150px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "5px",
  },
};

export default FoodItemCard;
