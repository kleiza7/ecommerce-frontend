import { useCartStore } from '../stores/CartStore';

const AppHeader = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="h-20 bg-orange-500 justify-between shrink-0 flex items-center px-6">
      <span className="text-s32-l40 font-bold text-white">Shop Land</span>
      {cart.length}
    </div>
  );
};

export default AppHeader;
