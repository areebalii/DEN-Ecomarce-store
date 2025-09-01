🛍️ MERN E-Commerce Store

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js).
It allows users to browse products, view details, add items to cart, and checkout.

🚀 Features
🔹 Frontend (React)

Responsive UI with React + React Router

Product listing & details page

Cart functionality (add, update, remove items)

User authentication (login/register)

Hamburger menu for mobile navigation

Related products & customer reviews section

🔹 Backend (Node.js + Express + MongoDB)

RESTful API for products, users, and cart

Integrated with MongoDB Atlas / Local MongoDB

Image upload handling

Product seeding (from Fake Store API → MongoDB)

🛠️ Tech Stack

Frontend: React, Context API, React Router, CSS

Backend: Node.js, Express.js, MongoDB (Mongoose)

Authentication: JWT (JSON Web Tokens)

Database: MongoDB Atlas / Local MongoDB

Other Tools: Axios, dotenv, bcrypt

📂 Project Structure    

ecommerce-store/
│── backend/
│   ├── models/        # MongoDB models (User, Product, Cart)
│   ├── routes/        # Express routes (auth, products, cart)
│   ├── server.js      # Express server entry
│   └── config/        # DB connection, JWT utils
│
│── frontend/
│   ├── src/
│   │   ├── components/    # Navbar, Footer, etc.
│   │   ├── pages/         # Home, Products, Cart, Login
│   │   ├── context/       # ProductContext
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│
│── README.md
│── package.json
⚡ Getting Started
1️⃣ Clone Repository
git clone https://github.com/yourusername/mern-ecommerce-store.git
cd mern-ecommerce-store

2️⃣ Install Dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

3️⃣ Setup Environment Variables

Create a .env file in the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4️⃣ Run the Application
Run backend
cd backend
npm start

Run frontend
cd frontend
npm start

📝 Future Enhancements
Payment gateway integration (Stripe/PayPal)

Admin panel for managing products & orders

👨‍💻 Author
Developed by Areeb Ali ✨






















