# 🎨 E-Commerce Frontend

A modern and scalable **React + TypeScript** frontend built for the E‑Commerce platform.  
This project is structured to integrate seamlessly with the backend API and provides a foundation for a complete e‑commerce web application.

Backend repository:  
➡️ https://github.com/kleiza7/ecommerce-backend

---

## ✨ Tech Stack

- ⚛️ **React** (with functional components & hooks)
- 🧩 **TypeScript**
- 🎨 **Tailwind CSS** for utility‑first styling
- 🖼️ **React SVGR** for converting SVGs into components
- 🔌 **API layer with fully typed request/response models**
- 🧱 Vite development environment
- 🧼 Prettier + Tailwind plugin for clean formatting

The project currently contains initial setup and structure.  
Future features will be built upon this clean foundation.

---

## 📦 Features (Implemented so far)

### 🎨 Tailwind Setup

- Fully configured Tailwind environment
- Custom theme extensions ready for UI components
- Prettier Tailwind plugin for automatic class sorting

### 🖼 React SVGR Integration

- SVG files can be imported as React components
- Example:

```tsx
import Logo from "@/assets/logo.svg";
```

### 🔌 Typed API Layer

- Centralized API folder
- Request and response types defined
- Easy expansion for product, user, cart, and checkout endpoints

---

## 📁 Project Structure

```
src/
 ├── assets/         # Images & SVGs
 ├── components/     # Reusable UI components
 ├── hooks/          # Custom hooks
 ├── lib/            # Typed API functions
 ├── pages/          # Page components
 ├── styles/         # Global styles
 ├── main.tsx        # App entry
 └── App.tsx         # Root component
```

The structure is intentionally simple but scalable, allowing new modules to be added easily.

---

## ⚙️ Environment Setup

You may create a `.env` file for frontend configuration when needed (API URL, etc.).  
A typical example:

```ini
VITE_API_URL="http://localhost:5000/api"
```

---

## 🚀 Running the Project

```bash
npm install
npm run dev
```

Local development server:

```
http://localhost:5173
```

---

## 🎯 Vision

This frontend will evolve into a complete e‑commerce interface including:

- Product browsing and filtering
- Cart and checkout flows
- User authentication pages
- Seller dashboard components
- Responsive and modern UI

All upcoming features will be built while keeping maximum type‑safety and clean architecture.

---

## 🤝 Contributing

Contributions and suggestions are welcome as the project grows.

---

## 📄 License

MIT
