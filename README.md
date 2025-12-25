# 🎨 E-Commerce Frontend (Phase-1)

**Production App:**  
https://ecommerce-frontend-seven-orpin.vercel.app/products

Modern, scalable **React + TypeScript** frontend built for a real-world E-Commerce platform.  
Designed to work seamlessly with the backend API and evolve into a full-featured shopping experience.

Backend repository:  
➡️ https://github.com/kleiza7/ecommerce-backend

---

## ✨ What Was Built (Phase-1)

This frontend is **not a UI-only mock**. It is structured to mirror production-grade frontend architecture and real e‑commerce data flow.

### ✅ Core Highlights

- ⚛️ **React** with functional components & hooks
- 🧩 **TypeScript-first architecture** (strict typing)
- 🎨 **Tailwind CSS** (utility-first, scalable styling)
- 🧱 **Vite** for fast dev & build
- 🔌 **Fully typed API layer** (request / response models)
- 🧠 **Separation of concerns** (UI, hooks, state, API)
- 📦 **Reusable component system**
- 🧼 **Prettier + Tailwind plugin** for consistent formatting

---

## 🧠 Architecture Overview

```
UI Components
     ↓
Pages
     ↓
Hooks (business logic)
     ↓
Typed API layer
     ↓
Backend API
```

- UI components are **stateless & reusable**
- Business logic lives inside hooks
- API layer is fully typed and centralized
- Easy to scale, refactor, and test

---

## 🔌 Backend Integration

- Integrated with a **production-ready backend**
- Supports:
  - Products
  - Categories
  - Brands
  - Cart
- Environment-based API URL configuration

---

## 🛒 Cart & Merge Logic

The cart system is designed to behave like **real e‑commerce platforms (e.g. Trendyol)**.

### 🧾 Guest User (Not Logged In)

- Cart data is stored in **localStorage**
- Users can freely:
  - Add products
  - Update quantities
  - Remove items

### 🔐 After Login

- When a user logs in:
  1. Local cart is sent to backend
  2. Backend merges local cart with user’s server-side cart
  3. Quantity conflicts are resolved deterministically
  4. Final cart state is returned from backend
- Local cart is then cleared

This ensures:

- No cart data loss
- Seamless guest → authenticated transition
- Consistent cart state across devices

---

## 📦 Features Implemented

### 🛍 Product Listing

- Product grid layout
- Image rendering:
  - Local URLs in development
  - CDN URLs in production
- Primary image handling
- Stock & price display

### 🧭 Routing

- Page-based routing
- Ready for protected routes (auth / seller)

### 🔌 Typed API Layer

- Centralized API client
- Strong request/response typing
- Easy to expand for new endpoints

---

## 📁 Project Structure

```
src/
 ├── assets/         # Images & SVGs
 ├── components/     # Reusable UI components
 ├── hooks/          # Custom hooks (cart, products, logic)
 ├── lib/            # Typed API client
 ├── pages/          # Page-level components
 ├── stores/         # Global state (cart, UI)
 ├── styles/         # Global styles
 ├── main.tsx        # App entry
 └── App.tsx         # Root component
```

The structure is intentionally **simple but scalable**.

---

## ⚙️ Environment Setup

Create a `.env` file:

```ini
VITE_API_URL=https://ecommerce-backend-z39w.onrender.com/api
```

Local example:

```ini
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Local server:

```
http://localhost:5173
```

---

## 🚀 Production

- Built with **Vite**
- Deployed on **Vercel**
- Uses backend production API
- CDN-served images handled automatically

---

## 📌 Phase-1 Scope (Completed)

✔ Product listing  
✔ Typed API integration  
✔ Cart with merge logic  
✔ Clean architecture  
✔ Production deployment

**Phase-2** will include:

- Authentication UI
- Checkout flow
- Filters & search
- Seller dashboard
- UX & performance optimizations

---

## 📄 License

MIT
