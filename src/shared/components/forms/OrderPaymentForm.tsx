import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useOrdersCompletePayment } from "../../../hooks/useOrdersCompletePayment";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
} from "../../constants/CommonTailwindClasses.constants";
import {
  CARD_CVC_REGEX,
  CARD_EXPIRY_REGEX,
  CARD_NUMBER_REGEX,
} from "../../constants/Regex.constants";
import { customTwMerge } from "../../utils/Tailwind.util";
import { GenericDialogClose, GenericDialogTitle } from "../GenericDialog";
import GenericFormInput from "../GenericFormInput";
import GenericFormTextArea from "../GenericFormTextArea";
import InputErrorLabel from "../InputErrorLabel";
import InputLabel from "../InputLabel";

type OrderPaymentFormType = {
  receiverFullName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;

  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
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
    formState: { errors, isValid },
  } = useForm<OrderPaymentFormType>({
    mode: "onChange",
    defaultValues: {
      receiverFullName: "",
      receiverPhoneNumber: "",
      receiverAddress: "",
      cardHolderName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
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
      {/* HEADER */}
      <div className="flex flex-col gap-y-1">
        <GenericDialogTitle>Payment</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Please review your details before payment.
        </span>
      </div>

      {/* RECEIVER INFO */}
      <div className="flex flex-col gap-y-3">
        <span className="text-s16-l24 text-text-primary font-medium">
          Receiver Information
        </span>

        <div className="relative flex flex-col">
          <InputLabel label="Full Name" hasAsterisk />
          <GenericFormInput
            field="receiverFullName"
            control={control}
            required
            disabled={isPending}
          />
          <InputErrorLabel message={errors.receiverFullName?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Phone Number" hasAsterisk />
          <GenericFormInput
            field="receiverPhoneNumber"
            control={control}
            required
            disabled={isPending}
          />
          <InputErrorLabel message={errors.receiverPhoneNumber?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Address" hasAsterisk />
          <GenericFormTextArea
            field="receiverAddress"
            control={control}
            required
            rows={3}
            disabled={isPending}
          />
          <InputErrorLabel message={errors.receiverAddress?.message} />
        </div>
      </div>

      {/* CARD INFO */}
      <div className="flex flex-col gap-y-3">
        <span className="text-s16-l24 text-text-primary font-medium">
          Card Information
        </span>

        <div className="relative flex flex-col">
          <InputLabel label="Card Holder Name" hasAsterisk />
          <GenericFormInput
            field="cardHolderName"
            control={control}
            required
            disabled={isPending}
          />
          <InputErrorLabel message={errors.cardHolderName?.message} />
        </div>

        <div className="relative flex flex-col">
          <InputLabel label="Card Number" hasAsterisk />
          <GenericFormInput
            field="cardNumber"
            control={control}
            required
            minLength={16}
            maxLength={16}
            rules={{
              pattern: {
                value: CARD_NUMBER_REGEX,
                message: "Card number must be 16 digits",
              },
            }}
            disabled={isPending}
          />
          <InputErrorLabel message={errors.cardNumber?.message} />
        </div>

        <div className="flex gap-x-4">
          <div className="relative flex flex-1 flex-col">
            <InputLabel label="Expiry (MM/YY)" hasAsterisk />
            <GenericFormInput
              field="cardExpiry"
              control={control}
              required
              minLength={4}
              maxLength={4}
              rules={{
                pattern: {
                  value: CARD_EXPIRY_REGEX,
                  message: "Invalid expiry format",
                },
              }}
              disabled={isPending}
            />
            <InputErrorLabel message={errors.cardExpiry?.message} />
          </div>

          <div className="relative flex flex-1 flex-col">
            <InputLabel label="CVC" hasAsterisk />
            <GenericFormInput
              field="cardCvc"
              control={control}
              required
              minLength={3}
              maxLength={3}
              rules={{
                pattern: {
                  value: CARD_CVC_REGEX,
                  message: "CVC must be 3 digits",
                },
              }}
              disabled={isPending}
            />
            <InputErrorLabel message={errors.cardCvc?.message} />
          </div>
        </div>
      </div>

      {/* ACTIONS */}
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
