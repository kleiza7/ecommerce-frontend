import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
