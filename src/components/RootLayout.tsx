import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
