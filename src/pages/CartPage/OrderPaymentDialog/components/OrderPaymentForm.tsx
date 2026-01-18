import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdersCompletePayment } from "../../../../hooks/useOrdersCompletePayment";
import {
  GenericDialogClose,
  GenericDialogTitle,
} from "../../../../shared/components/GenericDialog";
import InputErrorLabel from "../../../../shared/components/InputErrorLabel";
import InputLabel from "../../../../shared/components/InputLabel";
import {
  BUTTON_PRIMARY,
  BUTTON_PRIMARY_OUTLINED,
  INPUT_BASE,
  TEXT_AREA_BASE,
} from "../../../../shared/constants/CommonTailwindClasses.constants";
import { customTwMerge } from "../../../../shared/utils/Tailwind.util";

type OrderPaymentFormType = {
  receiverFullName: string;
  receiverPhoneNumber: string;
  receiverAddress: string;

  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

type OrderPaymentFormErrors = Partial<
  Record<keyof OrderPaymentFormType, string>
>;

const formatCardNumberForDisplay = (rawValue: string) => {
  const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 16);
  const groups: string[] = [];

  for (let index = 0; index < digitsOnly.length; index += 4) {
    groups.push(digitsOnly.slice(index, index + 4));
  }

  const formatted = groups.join(" ");
  return formatted.padEnd(19, "•");
};

const formatExpiryForDisplay = (rawValue: string) => {
  const digitsOnly = rawValue.replace(/\D/g, "").slice(0, 4);
  if (digitsOnly.length <= 2) {
    return digitsOnly.padEnd(2, "•") + "/••";
  }

  const month = digitsOnly.slice(0, 2);
  const year = digitsOnly.slice(2, 4);
  return `${month}/${year.padEnd(2, "•")}`;
};

const formatNameForDisplay = (rawValue: string) => {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return "FULL NAME";
  }

  return trimmed.toUpperCase();
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

  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const [values, setValues] = useState<OrderPaymentFormType>({
    receiverFullName: "",
    receiverPhoneNumber: "",
    receiverAddress: "",
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const [errors, setErrors] = useState<OrderPaymentFormErrors>({});

  const cardPreview = useMemo(() => {
    return {
      name: formatNameForDisplay(values.cardHolderName),
      number: formatCardNumberForDisplay(values.cardNumber),
      expiry: formatExpiryForDisplay(values.cardExpiry),
      cvc: (values.cardCvc || "•••").slice(0, 3).padEnd(3, "•"),
    };
  }, [
    values.cardHolderName,
    values.cardNumber,
    values.cardExpiry,
    values.cardCvc,
  ]);

  const setFieldValue = <TKey extends keyof OrderPaymentFormType>(
    key: TKey,
    nextValue: OrderPaymentFormType[TKey],
  ) => {
    setValues((prev) => {
      return { ...prev, [key]: nextValue };
    });

    setErrors((prev) => {
      if (!prev[key]) {
        return prev;
      }

      return { ...prev, [key]: "" };
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    completePayment(orderId, {
      onSuccess: () => {
        close();
        navigate(`/order-detail/${orderId}`);
      },
    });
  };

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <GenericDialogTitle>Payment</GenericDialogTitle>
        <span className="text-s14-l20 text-gray-8">
          Please review your receiver and card details before completing the
          payment.
        </span>
      </div>

      {/* LEFT + RIGHT (no media queries) */}
      <div className="flex gap-x-6">
        {/* LEFT: all inputs same width */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Receiver Information */}
          <div className="flex flex-col gap-4">
            <span className="text-s14-l20 text-text-primary font-medium">
              Receiver Information
            </span>

            <div className="flex flex-col gap-5">
              <div className="relative flex flex-col">
                <InputLabel label="Full Name" hasAsterisk />
                <input
                  value={values.receiverFullName}
                  onChange={(event) => {
                    setFieldValue("receiverFullName", event.target.value);
                  }}
                  disabled={isPending}
                  className={INPUT_BASE}
                />
                <InputErrorLabel message={errors.receiverFullName} />
              </div>

              <div className="relative flex flex-col">
                <InputLabel label="Phone Number" hasAsterisk />
                <input
                  value={values.receiverPhoneNumber}
                  onChange={(event) => {
                    setFieldValue("receiverPhoneNumber", event.target.value);
                  }}
                  disabled={isPending}
                  className={INPUT_BASE}
                />
                <InputErrorLabel message={errors.receiverPhoneNumber} />
              </div>

              <div className="relative flex flex-col">
                <InputLabel label="Address" hasAsterisk />
                <textarea
                  value={values.receiverAddress}
                  onChange={(event) => {
                    setFieldValue("receiverAddress", event.target.value);
                  }}
                  disabled={isPending}
                  rows={3}
                  className={TEXT_AREA_BASE}
                />
                <InputErrorLabel message={errors.receiverAddress} />
              </div>
            </div>
          </div>

          {/* Card Owner Information */}
          <div className="flex flex-col gap-4">
            <span className="text-s14-l20 text-text-primary font-medium">
              Card Owner Information
            </span>

            <div className="flex flex-col gap-5">
              <div className="relative flex flex-col">
                <InputLabel label="Card Holder Name" hasAsterisk />
                <input
                  value={values.cardHolderName}
                  onChange={(event) => {
                    setFieldValue("cardHolderName", event.target.value);
                  }}
                  disabled={isPending}
                  className={INPUT_BASE}
                />
                <InputErrorLabel message={errors.cardHolderName} />
              </div>

              <div className="relative flex flex-col">
                <InputLabel label="Card Number" hasAsterisk />
                <input
                  value={values.cardNumber}
                  onChange={(event) => {
                    const digitsOnly = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);
                    setFieldValue("cardNumber", digitsOnly);
                  }}
                  disabled={isPending}
                  inputMode="numeric"
                  className={INPUT_BASE}
                />
                <InputErrorLabel message={errors.cardNumber} />
              </div>

              <div className="flex gap-x-4">
                <div className="relative flex flex-1 flex-col">
                  <InputLabel label="Expiry (MM/YY)" hasAsterisk />
                  <input
                    value={values.cardExpiry}
                    onChange={(event) => {
                      const digitsOnly = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                      setFieldValue("cardExpiry", digitsOnly);
                    }}
                    disabled={isPending}
                    inputMode="numeric"
                    className={INPUT_BASE}
                  />
                  <InputErrorLabel message={errors.cardExpiry} />
                </div>

                <div className="relative flex flex-1 flex-col">
                  <InputLabel label="CVC" hasAsterisk />
                  <input
                    value={values.cardCvc}
                    onChange={(event) => {
                      const digitsOnly = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 3);
                      setFieldValue("cardCvc", digitsOnly);
                    }}
                    onFocus={() => {
                      setIsCardFlipped(true);
                    }}
                    onClick={() => {
                      setIsCardFlipped(true);
                    }}
                    onBlur={() => {
                      setIsCardFlipped(false);
                    }}
                    disabled={isPending}
                    inputMode="numeric"
                    className={INPUT_BASE}
                  />
                  <InputErrorLabel message={errors.cardCvc} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: card pinned to bottom-right */}
        <div className="flex w-[500px] shrink-0 items-end justify-end">
          <button
            type="button"
            onClick={() => {
              setIsCardFlipped((prev) => {
                return !prev;
              });
            }}
            className="w-full text-left"
          >
            <div
              className="w-full"
              style={{
                perspective: "1200px",
              }}
            >
              <div
                className={customTwMerge(
                  "relative h-[220px] w-full transform-gpu transition-transform duration-500 ease-in-out will-change-transform",
                )}
                style={{
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transform: isCardFlipped
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl bg-black px-6 py-6 shadow-sm"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-s14-l20 font-medium text-white/90">
                          Master Card
                        </span>
                        <span className="text-s14-l20 text-white/50">
                          Card Number
                        </span>
                      </div>

                      <div className="bg-yellow-1/80 h-10 w-14 rounded-md" />
                    </div>

                    <div className="flex flex-col gap-10">
                      <div>
                        <span className="text-s16-l24 tracking-widest text-white">
                          {cardPreview.number}
                        </span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-s14-l20 text-white/50">
                            Card Holder
                          </span>
                          <span className="text-s14-l20 text-white">
                            {cardPreview.name}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <span className="text-s14-l20 text-white/50">
                            Valid Thru
                          </span>
                          <span className="text-s14-l20 text-white">
                            {cardPreview.expiry}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 overflow-hidden rounded-2xl bg-black px-6 py-6 shadow-sm"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="flex flex-col gap-6 pt-2">
                    <div className="h-10 w-full rounded bg-white/20" />

                    <div className="flex flex-col gap-10">
                      <div className="flex items-center justify-end">
                        <div className="flex w-full max-w-[220px] items-center justify-between rounded bg-white/10 px-4 py-3">
                          <span className="text-s14-l20 text-white/60">
                            CVC
                          </span>
                          <span className="text-s14-l20 tracking-widest text-white">
                            {cardPreview.cvc}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <span className="text-s14-l20 text-white/50">
                          {cardPreview.name}
                        </span>
                        <span className="text-s14-l20 text-white/50">
                          {cardPreview.expiry}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Buttons */}
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
          disabled={isPending}
          className={customTwMerge(BUTTON_PRIMARY, "px-4")}
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default OrderPaymentForm;
