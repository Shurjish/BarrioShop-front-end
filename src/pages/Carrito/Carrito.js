import React, { useState } from "react";
import "./Carrito.css";

const Carrito = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const calculateTotalUnits = (cart) => {
    const totalUnits = cart.reduce((total, product) => total + product.quantity, 0);
    return totalUnits;
  };

  const addToCart = (product) => {
    console.log(`Añadir ${product.name} al carrito`);
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        const updatedCart = prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          return prevCart.filter((product) => product._id !== productId);
        } else {
          const updatedCart = prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
          return updatedCart;
        }
      }
      return prevCart;
    });
  };

  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    return totalPrice.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  };

  return (
    <div>
    <button onClick={handleCartClick}>
          {showCart ? "Ocultar Carrito" : "Mostrar Carrito"}
        </button>
        {showCart && (
    <aside className="shopping">
    <h4>Carrito de compras</h4>
    <p>Cantidad de productos: {calculateTotalUnits(cart)}</p>
    <ul  style={{ listStyle: "none" }}>
      {cart.map((product) => (
        <li key={product._id}>
          <div>
            <img src={product.image} alt={product.name} style={{ width: "150px" }} />
          </div>
          <div>{product.name}</div>
          <div>{product.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}</div>
          <div>
            <button onClick={() => removeFromCart(product._id)} className="btn btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-bag-dash" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5.5 10a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
            <div className="count">{product.quantity}</div>
            <button onClick={() => addToCart(product)} className="btn btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-bag-plus" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
        </li>
      ))}
    </ul>
    <div className="total">Total: {calculateTotal(cart)}</div>
  </aside>
  )}
      </div>

  );
};

export default Carrito;