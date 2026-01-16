import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOrdersCompletePayment } from "../../../../hooks/useOrdersCompletePayment";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../shared/components/GenericDialog";
import GenericFormInput from "../../../../shared/components/GenericFormInput";
import InputErrorLabel from "../../../../shared/components/InputErrorLabel";
import InputLabel from "../../../../shared/components/InputLabel";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";

type OrderPaymentFormType = {
  cardNumber: string;
};

const OrderPaymentForm = ({
  orderId,
  close,
}: {
  orderId: number;
  close: () => void;
}) => {
  const navigate = useNavigate();
  const { mutate: completePayment, isPending } = useOrdersCompletePayment();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<OrderPaymentFormType>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<OrderPaymentFormType> = () => {
    completePayment(orderId, {
      onSuccess: () => {
        close();
        navigate(`/order-detail/${orderId}`);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-6"
    >
      <div className="flex flex-col gap-y-1">
        <GenericDialogTitle>Payment</GenericDialogTitle>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="relative flex flex-col">
          <InputLabel label="Card Number" hasAsterisk />
          <GenericFormInput
            field="cardNumber"
            control={control}
            required
            disabled={isPending}
          />
          <InputErrorLabel message={errors.cardNumber?.message} />
        </div>
      </div>

      <div className="flex justify-end gap-x-2">
        <GenericDialogClose>
          <button
            type="button"
            disabled={isPending}
            onClick={close}
            className={customTwMerge(BUTTON_PRIMARY_OUTLINED, "px-4")}
          >
            Cancel
          </button>
        </GenericDialogClose>

        <button
          type="submit"
          disabled={!isValid || isPending}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default OrderPaymentForm;
