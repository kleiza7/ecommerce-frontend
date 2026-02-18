import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../shared/constants/MediaQuery.constants";
import NewProductDialog from "./components/NewProductDialog";
import NewProductDrawer from "./components/NewProductDrawer";

const NewProductPortal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  return isMobileOrTablet ? (
    <NewProductDrawer open={open} setOpen={setOpen} />
  ) : (
    <NewProductDialog open={open} setOpen={setOpen} />
  );
};

export default NewProductPortal;
