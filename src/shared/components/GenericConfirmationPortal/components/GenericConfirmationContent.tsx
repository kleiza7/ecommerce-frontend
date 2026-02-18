import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../utils/Tailwind.util";
import { GenericDialogClose, GenericDialogTitle } from "../../GenericDialog";

const GenericConfirmationContent = ({
  title,
  description,
  close,
  onConfirm,
}: {
  title: string;
  description: string;
  close: () => void;
  onConfirm: () => void;
}) => {
  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <div className="relative flex h-full flex-col gap-y-6">
      <div className="flex shrink-0 flex-col gap-y-1">
        <GenericDialogTitle>{title}</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">{description}</span>
      </div>

      <div className="flex shrink-0 justify-end gap-x-2">
        <GenericDialogClose>
          <button
            type="button"
            onClick={close}
            className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "px-4")}
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="button"
          onClick={handleConfirm}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default GenericConfirmationContent;
