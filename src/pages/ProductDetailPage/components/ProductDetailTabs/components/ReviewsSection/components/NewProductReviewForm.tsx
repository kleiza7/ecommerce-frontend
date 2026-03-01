import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { StarFilledIcon, StarIcon } from "../../../../../../../assets/icons";
import { useProductReviewsCreate } from "../../../../../../../hooks/useProductReviewsCreate";
import GenericFormTextArea from "../../../../../../../shared/components/GenericFormTextArea";
import {
  BUTTON_PRIMARY,
  BUTTON_SIZE_X_LARGE,
} from "../../../../../../../shared/constants/CommonTailwindClasses.constants";
import { TOAST_TYPE } from "../../../../../../../shared/enums/ToastType.enum";
import { customTwMerge } from "../../../../../../../shared/utils/Tailwind.util";
import { showToast } from "../../../../../../../shared/utils/Toast.util";
import { useUserStore } from "../../../../../../../stores/UserStore";

type ProductReviewFormType = {
  rating: number;
  comment?: string;
};

const NewProductReviewForm = ({ productId }: { productId: number }) => {
  const { mutate: createProductReview, isPending } = useProductReviewsCreate();

  const user = useUserStore((state) => state.user);

  const isAuthenticated = Boolean(user);

  const { control, handleSubmit, setValue } = useForm<ProductReviewFormType>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const currentRating = useWatch({
    control,
    name: "rating",
  });

  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const onSubmit: SubmitHandler<ProductReviewFormType> = (values) => {
    if (!isAuthenticated) {
      showToast({
        title: "Authentication Required",
        description: "Please sign in to submit a review.",
        type: TOAST_TYPE.ERROR,
      });
      return;
    }

    if (!values.rating) {
      showToast({
        title: "Rating Required",
        description: "Please select a rating.",
        type: TOAST_TYPE.ERROR,
      });
      return;
    }

    createProductReview({
      productId,
      rating: values.rating,
      comment: values.comment?.trim() ? values.comment : undefined,
    });
  };

  const displayRating = hoverRating ?? currentRating ?? 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border-secondary flex flex-col gap-y-6 rounded-lg border p-8 shadow-lg"
    >
      <span className="text-s20-l28 text-text-primary font-bold">
        Write a Review
      </span>

      <div className="flex flex-col gap-y-2">
        <span className="text-s14-l20 text-text-secondary">Overall Rating</span>

        <div
          className="flex items-center gap-x-0.5"
          onMouseLeave={() => setHoverRating(null)}
        >
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= displayRating;

            return (
              <button
                key={starValue}
                type="button"
                disabled={isPending}
                onMouseEnter={() => setHoverRating(starValue)}
                onClick={() => {
                  setValue("rating", starValue, { shouldValidate: true });
                }}
                className="cursor-pointer"
              >
                {isFilled ? (
                  <StarFilledIcon className="fill-rating-primary h-6 w-6" />
                ) : (
                  <StarIcon className="fill-rating-primary h-6 w-6" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <GenericFormTextArea
        field="comment"
        control={control}
        rows={4}
        disabled={isPending}
        minLength={1}
        maxLength={1000}
        placeholder="Share your thoughts about this product..."
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className={customTwMerge(BUTTON_PRIMARY, BUTTON_SIZE_X_LARGE)}
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default NewProductReviewForm;
