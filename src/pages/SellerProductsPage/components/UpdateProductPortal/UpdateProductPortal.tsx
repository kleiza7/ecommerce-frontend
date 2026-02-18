import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../shared/constants/MediaQuery.constants";
import UpdateProductDialog from "./components/UpdateProductDialog";
import UpdateProductDrawer from "./components/UpdateProductDrawer";

const UpdateProductPortal = ({
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
    <UpdateProductDrawer open={open} setOpen={setOpen} productId={productId} />
  ) : (
    <UpdateProductDialog open={open} setOpen={setOpen} productId={productId} />
  );
};

export default UpdateProductPortal;
