import { useForm, type SubmitHandler } from "react-hook-form";
import { CreditCardIcon } from "../../../assets/icons";
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
  cardExpiryDate: string;
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
      cardExpiryDate: "",
      cardCvc: "",
    },
  });

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col gap-y-6"
    >
      <div className="border-border-primary flex flex-col rounded-md border">
        <div className="border-border-primary bg-surface-muted border-b px-6 py-4">
          <span className="text-s16-l24 text-text-primary font-semibold">
            Receiver Information
          </span>
        </div>

        <div className="flex flex-col gap-y-6 p-8">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative flex flex-1 flex-col">
              <InputLabel label="Full Name" hasAsterisk />
              <GenericFormInput
                field="receiverFullName"
                control={control}
                required
                hasError={!!errors.receiverFullName}
                disabled={isPending}
                placeholder="Enter your full name"
              />
              <InputErrorLabel message={errors.receiverFullName?.message} />
            </div>

            <div className="relative flex flex-1 flex-col">
              <InputLabel label="Phone Number" hasAsterisk />
              <GenericFormInput
                field="receiverPhoneNumber"
                control={control}
                required
                hasError={!!errors.receiverPhoneNumber}
                disabled={isPending}
                placeholder="e.g. +90 5xx xxx xx xx"
              />
              <InputErrorLabel message={errors.receiverPhoneNumber?.message} />
            </div>
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
              placeholder="Enter your full delivery address"
            />
            <InputErrorLabel message={errors.receiverAddress?.message} />
          </div>
        </div>
      </div>

      <div className="border-border-primary flex flex-col rounded-md border">
        <div className="border-border-primary bg-surface-muted border-b px-6 py-4">
          <span className="text-s16-l24 text-text-primary font-semibold">
            Payment Details
          </span>
        </div>

        <div className="flex flex-col gap-y-6 p-8">
          <div className="relative flex flex-col">
            <InputLabel label="Card Holder Name" hasAsterisk />
            <GenericFormInput
              field="cardHolderName"
              control={control}
              required
              hasError={!!errors.cardHolderName}
              disabled={isPending}
              placeholder="Enter the name on your card"
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
              placeholder="0000 0000 0000 0000"
            />
            <CreditCardIcon className="fill-text-disabled absolute right-2 bottom-2" />

            <InputErrorLabel message={errors.cardNumber?.message} />
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative flex flex-1 flex-col">
              <InputLabel label="Expiry Date" hasAsterisk />
              <GenericFormInput
                field="cardExpiryDate"
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
                hasError={!!errors.cardExpiryDate}
                disabled={isPending}
                placeholder="MM/YY"
              />
              <InputErrorLabel message={errors.cardExpiryDate?.message} />
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
                placeholder="***"
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
