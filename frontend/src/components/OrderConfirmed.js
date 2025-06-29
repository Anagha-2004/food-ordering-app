import React from "react";
import { Link } from "react-router-dom";

function OrderConfirmed() {
  return (
    <div style={styles.container}>
      <h2>✅ Order Confirmed</h2>
      <p>Thanks for ordering!</p>
      <Link to="/">
        <button style={styles.button}>Back to Menu</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
  },
};

export default OrderConfirmed;
