import { Outlet } from "react-router-dom";
import SellerLeftMenu from "./SellerLeftMenu";

const SellerLayout = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] gap-8 p-3 md:px-10 md:py-8">
      <SellerLeftMenu />

      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerLayout;
