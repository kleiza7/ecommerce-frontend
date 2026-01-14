import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-1 flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-orange text-[120px] leading-none font-bold">
          404
        </span>

        <span className="text-text-primary text-s32-l40 font-semibold">
          Page not found
        </span>

        <p className="text-text-primary text-s16-l24 max-w-lg">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <button
          type="button"
          onClick={() => navigate("/products")}
          className="bg-orange hover:bg-orange-dark text-s16-l24 rounded-lg px-8 py-3 font-medium text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
