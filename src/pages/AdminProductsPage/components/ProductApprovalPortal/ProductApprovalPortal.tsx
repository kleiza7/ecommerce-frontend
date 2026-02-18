import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../shared/constants/MediaQuery.constants";
import ProductApprovalDialog from "./components/ProductApprovalDialog";
import ProductApprovalDrawer from "./components/ProductApprovalDrawer";

const ProductApprovalPortal = ({
  open,
  setOpen,
  productId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  return isMobileOrTablet ? (
    <ProductApprovalDrawer
      open={open}
      setOpen={setOpen}
      productId={productId}
    />
  ) : (
    <ProductApprovalDialog
      open={open}
      setOpen={setOpen}
      productId={productId}
    />
  );
};

export default ProductApprovalPortal;
