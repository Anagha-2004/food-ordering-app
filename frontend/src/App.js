import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import FoodItemCard from "./components/FoodItemCard";
import Cart from "./components/Cart";
import OrderConfirmed from "./components/OrderConfirmed";
import burgerImg from "./assets/burger.png";
import pizzaImg from "./assets/pizza.png";
import pastaImg from "./assets/pasta.png";
import lemonadeImg from "./assets/lemonade.png";
import orangeJuiceImg from "./assets/orangejuice.png";

function HomePage() {
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  const foodItems = [
    { name: "Burger", price: 120, image: burgerImg },
    { name: "Pizza", price: 250, image: pizzaImg },
    { name: "Pasta", price: 180, image: pastaImg },
    { name: "Lemonade", price: 60, image: lemonadeImg },
    { name: "Orange Juice", price: 80, image: orangeJuiceImg },
  ];

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[item.name]?.quantity || 0;
      return {
        ...prevCart,
        [item.name]: { ...item, quantity: currentQuantity + 1 },
      };
    });
  };

  const handleIncrease = (itemName) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemName]: {
        ...prevCart[itemName],
        quantity: prevCart[itemName].quantity + 1,
      },
    }));
  };

  const handleDecrease = (itemName) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[itemName].quantity;
      if (currentQuantity <= 1) {
        const newCart = { ...prevCart };
        delete newCart[itemName];
        return newCart;
      } else {
        return {
          ...prevCart,
          [itemName]: {
            ...prevCart[itemName],
            quantity: currentQuantity - 1,
          },
        };
      }
    });
  };

  const handlePlaceOrder = async () => {
    const items = Object.values(cart);
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    console.log("handlePlaceOrder called. Sending order:", {
      items,
      totalAmount,
    });

    try {
      await axios.post("http://localhost:5000/api/orders", {
        items,
        totalAmount,
      });
      console.log("Order successfully sent to backend.");
      setCart({});
      navigate("/order-confirmed");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Food Ordering App</h1>
      <div style={styles.foodList}>
        {foodItems.map((item) => (
          <FoodItemCard
            key={item.name}
            item={item}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <Cart
        cart={cart}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      {Object.keys(cart).length > 0 && (
        <button
          style={styles.orderButton}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundImage:
      "url('https://t4.ftcdn.net/jpg/05/64/97/31/360_F_564973106_xO0n1BvNmsFy2Sj2SK2Uy2pzH3hDqeDy.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  foodList: {
    display: "flex",
    flexWrap: "wrap",
  },
  orderButton: {
    marginTop: "20px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
      </Routes>
    </Router>
  );
}
