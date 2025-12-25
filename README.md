# 🎨 E-Commerce Frontend (Phase-1)

**Production App:**  
https://ecommerce-frontend-seven-orpin.vercel.app/products

Modern, scalable **React + TypeScript** frontend built for a real-world E‑Commerce platform.  
Designed to work seamlessly with the backend API and evolve into a full-featured shopping experience.

Backend repository:  
➡️ https://github.com/kleiza7/ecommerce-backend

---

## ✨ What Was Built (Phase-1)

This frontend is **not a UI-only mock**. It is structured to mirror production-grade frontend architecture and data flow.

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
Hooks (data / logic)
     ↓
Typed API layer
     ↓
Backend API
```

- UI components are **stateless & reusable**
- Business logic lives in hooks
- API layer is fully typed and centralized
- Easy to refactor, test, and scale

---

## 🔌 Backend Integration

- Works with a **production-ready backend**
- Supports:
  - Products
  - Categories
  - Brands
  - Cart logic
- Environment-based API URL configuration

---

## 📦 Features Implemented

### 🛍 Product Listing

- Product grid layout
- Image rendering (local in dev, CDN in prod)
- Primary image handling
- Stock & price display

### 🧭 Routing

- Page-based routing structure
- Ready for protected routes (auth, seller)

### 🔌 Typed API Layer

- Centralized API folder
- Strong request/response typing
- Scales cleanly as endpoints grow

---

## 📁 Project Structure

```
src/
 ├── assets/         # Images & SVGs
 ├── components/     # Reusable UI components
 ├── hooks/          # Custom hooks (data + logic)
 ├── lib/            # Typed API client
 ├── pages/          # Page-level components
 ├── stores/         # Global state (cart, UI)
 ├── styles/         # Global styles
 ├── main.tsx        # App entry
 └── App.tsx         # Root component
```

This structure is intentionally **simple but scalable**.

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

- Built with Vite
- Deployed on **Vercel**
- Uses backend production API
- CDN-served images handled automatically

---

## 📌 Phase-1 Scope (Completed)

✔ Product listing  
✔ API integration  
✔ Typed data flow  
✔ Clean architecture  
✔ Production deployment

**Phase-2** will include:

- Authentication UI
- Cart & checkout flows
- Filters & search
- Seller dashboard
- Responsive UX refinements

---

## 📄 License

MIT
