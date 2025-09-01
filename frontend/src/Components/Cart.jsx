import { useContext, useState } from "react";
import { ProductContext } from "../Product context/ProductContext";
import "./Cart.css";

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } =
    useContext(ProductContext);

  const [showCheckout, setShowCheckout] = useState(false);

  //  Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );


  if (cart.length === 0) {
    return (
      <div className="emptyCartDiv">
        <h2 className="empty">Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      {/* LEFT: Cart Items */}
      <div className="cart-left">
        <div className="cart-contain">
          <h2 className="cart-header">Your Cart 🛒</h2>

          {cart.map((item) => {
            if (!item.product) return null; // skip if product missing

            return (
              <div key={item.product._id} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="cart-item-img"
                />
                <div className="cart-details">
                  <h3>{item.product.title}</h3>
                  <p>${item.product.price}</p>

                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product._id, Number(e.target.value))
                    }
                  />
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div> 
            );
          })}
          <div className="clearBtnDiv">
          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Checkout Summary */}
      <div className="cart-right">
        <div className="checkout-card">
          <h3>Order Summary</h3>

          <div className="summary-item">
            <span>Items:</span>
            <span>{cart.length}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => setShowCheckout(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Checkout</h3>
            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("✅ Order placed successfully!");
                setShowCheckout(false);
                clearCart();
              }}
            >
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <textarea placeholder="Shipping Address" required></textarea>

              <div className="form-btns">
                <button type="submit">Confirm Order</button>
                <button type="button" onClick={() => setShowCheckout(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
