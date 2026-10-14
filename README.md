# 🛍️ Multivendor E-Shop

A full-stack multi-vendor e-commerce platform designed to bring multiple sellers and customers together in one online marketplace. The project uses React for the frontend, Node.js and Express for the backend, MongoDB for data storage, and a separate Socket.IO service for real-time communication.

## ✨ Overview

Multivendor E-Shop provides a foundation for an online marketplace where customers can explore products and sellers can manage their online businesses. The application is organized into separate frontend, backend, and socket services to keep the codebase modular and easier to maintain.

## 🚀 Features

The project includes integrations and dependencies for the following capabilities. Availability may depend on the implemented screens and backend routes.

- 🛒 **E-commerce experience** — A React-based storefront for browsing and interacting with the marketplace.
- 👤 **Authentication** — JWT-based authentication utilities and password hashing support.
- 🏪 **Multi-vendor architecture** — A foundation for supporting multiple sellers.
- 💳 **Payment integration** — Stripe and PayPal frontend integrations, with Stripe support on the backend.
- 📦 **Backend API** — REST API development using Node.js and Express.
- 🗄️ **Database integration** — MongoDB with Mongoose for data modeling and persistence.
- ⚡ **Real-time communication** — Socket.IO integration for real-time features.
- 📧 **Email support** — Nodemailer integration for sending emails.
- 📁 **File uploads** — Multer-based upload handling.
- 🎨 **Modern UI** — React, Material UI, Tailwind CSS, and React Icons.
- 🔄 **State management** — Redux Toolkit and React Redux.

## 🧰 Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 19, Vite, JavaScript |
| UI | Material UI, Tailwind CSS, React Icons |
| State management | Redux Toolkit, React Redux |
| Routing | React Router |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Payments | Stripe, PayPal integrations |
| Real-time communication | Socket.IO |
| Email | Nodemailer |
| HTTP requests | Axios |

## 📁 Project Structure

```text
Multivendor-Eshop/
├── frontend/       # React frontend application
├── backend/        # Express API and backend logic
├── socket/         # Socket.IO service
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB instance (local or hosted)
- Git
- Stripe or PayPal credentials if you want to test the corresponding payment integrations

### 1. Clone the repository

```bash
git clone https://github.com/sheikh-Zulkifal/Multivendor-Eshop.git
cd Multivendor-Eshop
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal from the project root:

```bash
cd backend
npm install
```

### 4. Install socket service dependencies

Open a third terminal from the project root:

```bash
cd socket
npm install
```

### 5. Configure environment variables

Create the appropriate `.env` files for the backend and socket service. Configure the required values according to the code.

Typical backend configuration may include:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

These are example variable names, not verified configuration keys. Check the source code to confirm the exact names, required values, and ports. Never commit real API keys, database credentials, or secrets to GitHub.

### 6. Run the application

Start each service in a separate terminal.

**Frontend**

```bash
cd frontend
npm run dev
```

**Backend**

```bash
cd backend
npm start
```

**Socket service**

```bash
cd socket
npm start
```

Open the local URL printed by Vite in your terminal. Ensure that your MongoDB connection, environment variables, API URL, and socket URL are configured correctly.

## 🔐 Security Notes

- Keep credentials and secret keys in environment variables.
- Never expose Stripe secret keys or JWT signing secrets in frontend code.
- Validate incoming requests on the backend.
- Enforce authorization checks for seller-specific and administrative operations.
- Verify payment status on the server before confirming orders.

## 🧪 Development

Run the frontend linter with:

```bash
cd frontend
npm run lint
```

Create a production frontend build with:

```bash
cd frontend
npm run build
```

## 👨‍💻 Author

**Zulkifal**

- GitHub: [@sheikh-Zulkifal](https://github.com/sheikh-Zulkifal)
- Project repository: [Multivendor-Eshop](https://github.com/sheikh-Zulkifal/Multivendor-Eshop)

## 📄 License

Check the repository's license before using, modifying, or distributing this project.
