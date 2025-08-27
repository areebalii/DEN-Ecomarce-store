import { useState } from 'react';
import "./Contact.css";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you shortly.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <div className="contact-wrapper">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            required
            onChange={handleChange}
            placeholder="Write your message..."
          />

          <button type="submit">Send Message</button>
        </form>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@yourstore.com</p>
          <p><strong>Phone:</strong> +1 234 567 8901</p>
          <p><strong>Address:</strong> 123 Main Street, YourCity, Country</p>
          <p><strong>Hours:</strong> Mon - Fri, 9am - 6pm</p>
        </div>
      </div>
    </div>
  );
};
