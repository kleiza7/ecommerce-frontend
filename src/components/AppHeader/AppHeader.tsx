import { NavLink } from 'react-router-dom';
import CartPopover from './components/CartPopover';

const AppHeader = () => {
  return (
    <div className="h-20 bg-orange-500 justify-between shrink-0 flex items-center px-6">
      <NavLink to="/" className="text-s32-l40 font-bold text-white">
        Shop Land
      </NavLink>
      <CartPopover />
    </div>
  );
};

export default AppHeader;
