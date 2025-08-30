import { useContext, useEffect, useState } from "react"
import { ProductContext } from "../Product context/ProductContext"
import "./Cart.css"

export const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(ProductContext);
  const [subtotal, setSubtotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    alert(`Order Placed!\nName: ${formData.name}\nEmail: ${formData.email}`);
    setShowModal(false);
    setFormData({ name: "", email: "", address: "", phone: "" });
  };

  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.qty
    });
    setSubtotal(total.toFixed(2));
  }, [cart])

  if (cart.length === 0) {
    return (
      <div className="cart-contain">
        <h2>Your Cart is Empty</h2>
      </div>
    )
  }


  return (
    <>
      <div className="cart-contain">
        <h2>Your Shopping Cart</h2>
        <div className="cart-layout">
          <div className="cart-left">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>${item.price} x {item.qty}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQuantity(item.id, +e.target.value)}
                  />
                  <button onClick={() => removeFromCart(item.id)}>X</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-right">
            <div className="checkout-card">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Items ({cart.length})</span>
                <span>${subtotal}</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="summary-item">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <hr />
              <div className="summary-item total">
                <span>Total</span>
                <span>${(parseFloat(subtotal) + 5).toFixed(2)}</span>
              </div>
              <button
                className="checkout-btn"
                disabled={cart.length === 0}
                onClick={() => setShowModal(true)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Enter Delivery Details</h2>
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} value={formData.name} />
              <input type="email" name="email" placeholder="Email" required onChange={handleInputChange} value={formData.email} />
              <input type="text" name="phone" placeholder="Phone" required onChange={handleInputChange} value={formData.phone} />
              <textarea name="address" placeholder="Address" rows="3" required onChange={handleInputChange} value={formData.address}></textarea>
              <div className="form-btns">
                <button type="submit">Place Order</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}