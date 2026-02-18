import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { MEDIA_QUERY } from "../../constants/MediaQuery.constants";
import GenericConfirmationDialog from "./components/GenericConfirmationDialog";
import GenericConfirmationDrawer from "./components/GenericConfirmationDrawer";

const GenericConfirmationPortal = ({
  open,
  setOpen,
  title,
  description,
  onConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
}) => {
  const isMobileOrTablet = useMediaQuery(MEDIA_QUERY.BELOW_LG);

  return isMobileOrTablet ? (
    <GenericConfirmationDrawer
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      onConfirm={onConfirm}
    />
  ) : (
    <GenericConfirmationDialog
      open={open}
      setOpen={setOpen}
      title={title}
      description={description}
      onConfirm={onConfirm}
    />
  );
};

export default GenericConfirmationPortal;
