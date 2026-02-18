import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../../../shared/constants/MediaQuery.constants";
import NewBrandDialog from "./components/NewBrandDialog";
import NewBrandDrawer from "./components/NewBrandDrawer";

const NewBrandPortal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  return isMobileOrTablet ? (
    <NewBrandDrawer open={open} setOpen={setOpen} />
  ) : (
    <NewBrandDialog open={open} setOpen={setOpen} />
  );
};

export default NewBrandPortal;
