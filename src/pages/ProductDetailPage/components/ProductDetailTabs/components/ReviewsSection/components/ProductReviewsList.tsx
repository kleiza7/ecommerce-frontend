import { Fragment, useCallback, useMemo, useState } from "react";
import type { ReqProductReviewsGetReviewsByProductIdResponse } from "../../../../../../../api/responses/ReqProductReviewsGetReviewsByProductIdResponse.model";
import { TrashIcon } from "../../../../../../../assets/icons";
import { useProductReviewsDelete } from "../../../../../../../hooks/useProductReviewsDelete";
import GenericConfirmationPortal from "../../../../../../../shared/components/GenericConfirmationPortal/GenericConfirmationPortal";
import GenericSelect from "../../../../../../../shared/components/GenericSelect";
import GenericTooltip from "../../../../../../../shared/components/GenericTooltip";
import RatingStars from "../../../../../../../shared/components/RatingStars";
import { getMaskedName } from "../../../../../../../shared/utils/Common.util";
import { useUserStore } from "../../../../../../../stores/UserStore";

const SORT_OPTIONS: { label: string; value: "newest" | "oldest" }[] = [
  { label: "Most Recent", value: "newest" },
  { label: "Oldest First", value: "oldest" },
];

const ProductReviewsList = ({
  productId,
  productReviews,
}: {
  productId: number;
  productReviews: ReqProductReviewsGetReviewsByProductIdResponse;
}) => {
  const user = useUserStore((state) => state.user);
  const { mutate: deleteReview, isPending: isDeleting } =
    useProductReviewsDelete();

  const [selectedSort, setSelectedSort] = useState<"newest" | "oldest">(
    "newest",
  );

  const [isConfirmationPortalOpen, setIsConfirmationPortalOpen] =
    useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const openConfirmationPortal = useCallback((id: number) => {
    setSelectedReviewId(id);
    setIsConfirmationPortalOpen(true);
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (!selectedReviewId) {
      return;
    }

    deleteReview({ id: selectedReviewId, productId });
    setSelectedReviewId(null);
  }, [deleteReview, selectedReviewId, productId]);

  const sortedProductReviews = useMemo(() => {
    if (selectedSort === "oldest") {
      return [...productReviews].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return [...productReviews].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [productReviews, selectedSort]);

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div className="border-border-secondary flex items-center justify-between border-b pb-4">
          <span className="text-s20-l28 text-text-primary font-bold">
            Customer Reviews ({sortedProductReviews.length})
          </span>

          <div className="flex items-center gap-x-2">
            <span className="text-s14-l20 text-text-muted whitespace-nowrap">
              Sort by:
            </span>
            <GenericSelect<"newest" | "oldest">
              value={selectedSort}
              options={SORT_OPTIONS}
              onChange={setSelectedSort}
            />
          </div>
        </div>

        <div className="flex h-[340px] flex-col gap-y-8 overflow-y-auto pr-1">
          {sortedProductReviews.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <span className="text-s14-l20 text-text-muted text-center">
                No reviews yet. Be the first to share your experience with this
                product.
              </span>
            </div>
          ) : (
            sortedProductReviews.map((review, index) => {
              const isOwnReview = user?.id === review.user.id;

              return (
                <Fragment key={review.id}>
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-y-1">
                        <span className="text-s16-l24 text-text-primary font-semibold">
                          {getMaskedName(review.user.name)}
                        </span>

                        <RatingStars avgRating={review.rating} />
                      </div>

                      <div className="flex flex-col items-end gap-y-2">
                        <span className="text-s14-l20 text-text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>

                        {isOwnReview && (
                          <GenericTooltip content="Remove your review">
                            <button
                              disabled={isDeleting}
                              onClick={() => openConfirmationPortal(review.id)}
                              className="flex cursor-pointer items-center gap-x-1 disabled:opacity-40"
                            >
                              <TrashIcon className="fill-text-muted h-4 w-4" />
                              <span className="text-s14-l20 text-text-muted font-medium">
                                Remove
                              </span>
                            </button>
                          </GenericTooltip>
                        )}
                      </div>
                    </div>

                    {review.comment && (
                      <p className="text-s14-l20 text-text-muted">
                        {review.comment}
                      </p>
                    )}
                  </div>

                  {index !== sortedProductReviews.length - 1 && (
                    <div className="bg-border-secondary h-px w-full" />
                  )}
                </Fragment>
              );
            })
          )}
        </div>
      </div>

      {selectedReviewId && (
        <GenericConfirmationPortal
          open={isConfirmationPortalOpen}
          setOpen={setIsConfirmationPortalOpen}
          title="Remove Review"
          description="Are you sure you want to remove your review?"
          onConfirm={handleConfirmRemove}
        />
      )}
    </>
  );
};

export default ProductReviewsList;
