import { Outlet } from "react-router-dom";
import AdminLeftMenu from "./AdminLeftMenu";

const AdminLayout = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1480px] gap-8 p-3 md:px-10 md:py-8">
      <AdminLeftMenu />

      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
