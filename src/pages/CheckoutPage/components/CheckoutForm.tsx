import { useForm, type SubmitHandler } from "react-hook-form";
import GenericFormInput from "../../../shared/components/GenericFormInput";
import GenericFormTextArea from "../../../shared/components/GenericFormTextArea";
import InputErrorLabel from "../../../shared/components/InputErrorLabel";
import InputLabel from "../../../shared/components/InputLabel";
import {
  CARD_CVC_REGEX,
  CARD_EXPIRY_REGEX,
  CARD_NUMBER_REGEX,
} from "../../../shared/constants/Regex.constants";

export type CheckoutFormType = {
  receiverFullName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

const CheckoutForm = ({
  onSubmit,
  isPending,
}: {
  onSubmit: SubmitHandler<CheckoutFormType>;
  isPending: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormType>({
    mode: "onBlur",
    reValidateMode: "onChange",
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

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-6"
    >
      <div className="border-gray-2 flex flex-col rounded-md border">
        <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
          <span className="text-s18-l28 text-text-primary font-medium">
            Receiver Information
          </span>
        </div>

        <div className="flex flex-col gap-y-3 px-5 py-4">
          <div className="relative flex flex-col">
            <InputLabel label="Full Name" hasAsterisk />
            <GenericFormInput
              field="receiverFullName"
              control={control}
              required
              hasError={!!errors.receiverFullName}
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
              hasError={!!errors.receiverPhoneNumber}
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
              hasError={!!errors.receiverAddress}
              disabled={isPending}
            />
            <InputErrorLabel message={errors.receiverAddress?.message} />
          </div>
        </div>
      </div>

      <div className="border-gray-2 flex flex-col rounded-md border">
        <div className="border-gray-2 bg-gray-3 border-b px-5 py-3">
          <span className="text-s18-l28 text-text-primary font-medium">
            Card Information
          </span>
        </div>

        <div className="flex flex-col gap-y-3 px-5 py-4">
          <div className="relative flex flex-col">
            <InputLabel label="Card Holder Name" hasAsterisk />
            <GenericFormInput
              field="cardHolderName"
              control={control}
              required
              hasError={!!errors.cardHolderName}
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
              hasError={!!errors.cardNumber}
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
                hasError={!!errors.cardExpiry}
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
                hasError={!!errors.cardCvc}
                disabled={isPending}
              />
              <InputErrorLabel message={errors.cardCvc?.message} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
