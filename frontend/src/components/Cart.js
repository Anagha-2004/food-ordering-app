import React from "react";

function Cart({ cart, onIncrease, onDecrease }) {
  const cartItems = Object.values(cart);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.cart}>
      <h2>Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.name} style={styles.itemRow}>
            <span>
              {item.name} — ₹{item.price * item.quantity}
            </span>
            <div>
              <button onClick={() => onDecrease(item.name)} style={styles.button}>–</button>
              <span style={styles.quantity}>{item.quantity}</span>
              <button onClick={() => onIncrease(item.name)} style={styles.button}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{totalAmount}</h3>
    </div>
  );
}

const styles = {
  cart: {
    border: "1px solid #888",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "5px 0",
  },
  button: {
    margin: "0 5px",
    padding: "3px 8px",
  },
  quantity: {
    minWidth: "20px",
    display: "inline-block",
    textAlign: "center",
  },
};

export default Cart;
