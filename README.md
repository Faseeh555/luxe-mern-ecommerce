  # LUXE — MERN Stack E-Commerce
  ### NUML BSCS Web Engineering · Spring 2026

  ---

  ## 📁 Project Structure

  ```
  ecommerce/
  ├── backend/          ← Node.js + Express + MongoDB
  │   ├── models/       ← Mongoose schemas
  │   ├── routes/       ← API endpoints
  │   ├── server.js     ← Main server entry
  │   ├── seed.js       ← Database seeder (12 products)
  │   ├── .env          ← Environment variables
  │   └── package.json
  │
  └── frontend/         ← React 19 + Redux Toolkit + Vite
      ├── src/
      │   ├── components/   ← Navbar, CartDrawer, ProductCard, Toast
      │   ├── pages/        ← Home, Products, ProductDetail, Checkout, OrderSuccess
      │   ├── store/        ← Redux store + cartSlice
      │   ├── api.js        ← Axios API calls
      │   └── main.jsx      ← App entry point
      └── package.json
  ```

  ---

  ## 🚀 HOW TO RUN — Step by Step (Complete Guide)

  ### STEP 1: Install Node.js

  1. Go to **https://nodejs.org**
  2. Download the **LTS version** (green button)
  3. Install it (click Next → Next → Install)
  4. Verify: open **Command Prompt** and type:
    ```
    node --version
    ```
    You should see something like `v20.x.x`

  ---

  ### STEP 2: Install MongoDB

  1. Go to **https://www.mongodb.com/try/download/community**
  2. Download **MongoDB Community Server** (Windows, version 7.x)
  3. Install it — choose "Complete" setup
  4. ✅ Make sure "Install MongoDB as a Service" is **checked**
  5. After install, MongoDB runs automatically in background

  **Verify MongoDB is running:**
  - Press `Win + R`, type `services.msc`, press Enter
  - Look for **"MongoDB"** — it should say "Running"

  > If not running: right-click MongoDB → Start

  ---

  ### STEP 3: Set Up the Backend

  Open **Command Prompt** (press Win + R, type `cmd`, press Enter)

  ```bash
  # Navigate into the backend folder
  cd path\to\ecommerce\backend

  # Example:
  cd C:\Users\YourName\Downloads\ecommerce\backend

  # Install dependencies
  npm install

  # Seed the database (adds 12 products)
  npm run seed
  ```

  You should see:
  ```
  ✅ Connected to MongoDB
  🗑️  Cleared existing products
  ✅ Seeded 12 products successfully!
  ```

  Now start the backend server:
  ```bash
  npm run dev
  ```

  You should see:
  ```
  ✅ MongoDB connected
  🚀 Server running on http://localhost:5000
  ```

  **Leave this terminal open!** Don't close it.

  ---

  ### STEP 4: Set Up the Frontend

  Open a **NEW** Command Prompt window (important!)

  ```bash
  # Navigate into the frontend folder
  cd path\to\ecommerce\frontend

  # Example:
  cd C:\Users\YourName\Downloads\ecommerce\frontend

  # Install dependencies
  npm install

  # Start the frontend
  npm run dev
  ```

  You should see:
  ```
    ➜  Local:   http://localhost:5173/
  ```

  ---

  ### STEP 5: Open the App

  Open your browser and go to:
  ```
  http://localhost:5173
  ```

  🎉 **Your e-commerce app is running!**

  ---

  ## 🧪 Testing the App

  1. **Home Page** — See featured products and categories
  2. **Shop Page** (`/products`) — Browse all 12 products, search, filter by category, sort
  3. **Product Page** — Click any product card to see details
  4. **Add to Cart** — Click "Add to Cart" on any product
  5. **Cart Drawer** — Click the bag icon in navbar
  6. **Checkout** (`/checkout`) — Fill the form and place order
  7. **Order Confirmation** — See your order details

  ---

  ## 🔌 API Endpoints

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | `/api/products` | Get all products (supports `search`, `category`, `minPrice`, `maxPrice`, `sort` query params) |
  | GET | `/api/products/:id` | Get single product by ID |
  | POST | `/api/products` | Create a product |
  | GET | `/api/products/meta/categories` | Get all categories |
  | POST | `/api/orders` | Place an order |
  | GET | `/api/orders` | Get all orders |
  | GET | `/api/orders/:id` | Get order by ID |
  | GET | `/api/health` | Server health check |

  ---

  ## 🏗️ System Architecture

  ```
  ┌─────────────────────────────────────────────────┐
  │                   FRONTEND (React 19)            │
  │                  localhost:5173                  │
  │                                                  │
  │  Pages: Home | Products | Detail | Checkout      │
  │  State: Redux Toolkit (cartSlice)                │
  │  Routing: React Router DOM v6                    │
  │  HTTP: Axios → /api/* (proxied to backend)       │
  └─────────────────────┬───────────────────────────┘
                        │ HTTP/REST
                        ▼
  ┌─────────────────────────────────────────────────┐
  │                  BACKEND (Express)               │
  │                  localhost:5000                  │
  │                                                  │
  │  Routes: /api/products, /api/orders              │
  │  Middleware: CORS, express.json()                │
  │  Validation: express-validator                   │
  └─────────────────────┬───────────────────────────┘
                        │ Mongoose ODM
                        ▼
  ┌─────────────────────────────────────────────────┐
  │              MongoDB (local)                     │
  │         mongodb://localhost:27017                │
  │         Database: ecommerce_db                   │
  │         Collections: products, orders            │
  └─────────────────────────────────────────────────┘
  ```

  ---

  ## 🗂️ Redux State Structure

  ```js
  store = {
    cart: {
      items: [
        {
          _id: "...",
          name: "Product Name",
          price: 99.99,
          image: "...",
          quantity: 2
        }
      ],
      isOpen: false   // cart drawer open/closed
    }
  }
  ```

  ### Cart Actions:
  - `addToCart(product)` — add or increment
  - `removeFromCart(id)` — remove item
  - `updateQuantity({ id, quantity })` — change qty
  - `clearCart()` — empty after order
  - `toggleCart()` — open/close drawer

  ---

  ## 📦 Tech Stack

  | Layer | Technology |
  |-------|------------|
  | Frontend | React 19, Vite 5 |
  | Routing | React Router DOM v6 |
  | State | Redux Toolkit + React-Redux |
  | Styling | CSS Modules |
  | HTTP Client | Axios |
  | Backend | Node.js, Express 4 |
  | Database | MongoDB + Mongoose |
  | Dev Tool | Nodemon |

  ---

  ## ⚠️ Common Problems & Fixes

  **"Cannot connect to MongoDB"**
  → Make sure MongoDB service is running (check services.msc)

  **"Port 5000 already in use"**
  → Change PORT in backend/.env to 5001

  **"npm not recognized"**
  → Node.js not installed or not in PATH — reinstall Node.js

  **Frontend shows blank page / API errors**
  → Make sure backend is running on port 5000 first

  ---

  ## 👨‍💻 Instructor: M. Emad Amjad | NUML BSCS Spring 2026
