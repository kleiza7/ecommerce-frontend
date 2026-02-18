import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../shared/constants/MediaQuery.constants";
import UpdateBrandDialog from "./components/UpdateBrandDialog";
import UpdateBrandDrawer from "./components/UpdateBrandDrawer";

const UpdateBrandPortal = ({
  open,
  setOpen,
  brandId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  brandId: number;
}) => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  return isMobileOrTablet ? (
    <UpdateBrandDrawer open={open} setOpen={setOpen} brandId={brandId} />
  ) : (
    <UpdateBrandDialog open={open} setOpen={setOpen} brandId={brandId} />
  );
};

export default UpdateBrandPortal;
