import React from 'react';
import "./About.css";

export const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      <p className="about-intro">
        Welcome to our store – your one-stop destination for quality, value, and convenience.
        Whether you're shopping for fashion, electronics, or essentials, we aim to deliver excellence in every product.
      </p>

      {/* Our Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded in 2023 by a small group of passionate creators, our journey began with a vision to make shopping smarter, simpler, and more personal.
          What started as a side project quickly evolved into a growing platform trusted by hundreds of customers.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to offer a curated selection of high-quality products with a focus on affordability and customer satisfaction.
          We believe that good products should be accessible to everyone, without compromise.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become a household name in eCommerce by building a community of happy customers who return not just for our products, but for the experience we provide.
        </p>
      </section>

      {/* Core Values */}
      <section className="about-section">
        <h2>Our Core Values</h2>
        <ul>
          <li>🔍 Transparency – We believe in clear communication and honest pricing.</li>
          <li>🤝 Customer First – Your satisfaction is our top priority.</li>
          <li>🚀 Innovation – We constantly explore ways to improve our platform and services.</li>
          <li>🌱 Sustainability – We support eco-friendly packaging and ethical sourcing.</li>
        </ul>
      </section>

      {/* Optional: Team */}
      <section className="about-section">
        <h2>Meet Our Team</h2>
        <p>
          Behind every great experience is a great team. We are developers, designers, marketers, and support specialists – all working together to serve you better.
        </p>
      </section>

      {/* Testimonials */}
      <section className="about-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <blockquote>
            "Fantastic quality and fast delivery. Will definitely shop here again!"<br />
            <span>- Sarah K.</span>
          </blockquote>
          <blockquote>
            "The customer service is top-notch. They helped me with an exchange hassle-free."<br />
            <span>- Jason M.</span>
          </blockquote>
        </div>
      </section>

      {/* Final Note */}
      <section className="about-section">
        <p>
          Thank you for visiting us. We look forward to becoming your favorite place to shop online!
        </p>
      </section>
    </div>
  );
};
