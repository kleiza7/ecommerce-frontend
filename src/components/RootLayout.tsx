import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex flex-1">
        <div className="flex w-full flex-col p-4 2xl:mx-auto 2xl:max-w-[1536px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
