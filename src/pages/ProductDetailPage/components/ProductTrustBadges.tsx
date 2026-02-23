import {
  AssignmentReturnIcon,
  LocalShippingIcon,
  ShieldIcon,
  VerifiedUserIcon,
} from "../../../assets/icons";

const ProductTrustBadges = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="flex items-center gap-x-3">
        <LocalShippingIcon className="fill-primary" />
        <span className="text-s12-l16 text-text-primary font-bold">
          Free Shipping Options
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <VerifiedUserIcon className="fill-primary" />
        <span className="text-s12-l16 text-text-primary font-bold">
          Warranty Available
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <AssignmentReturnIcon className="fill-primary" />
        <span className="text-s12-l16 text-text-primary font-bold">
          Easy Returns
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <ShieldIcon className="fill-primary" />
        <span className="text-s12-l16 text-text-primary font-bold">
          Secure Checkout
        </span>
      </div>
    </div>
  );
};

export default ProductTrustBadges;
