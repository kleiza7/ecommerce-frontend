import RatingStars from "./RatingStars";

const ProductRatingSummary = ({
  avgRating,
  reviewCount,
}: {
  avgRating: number;
  reviewCount: number;
}) => {
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-s14-l20 text-text-primary font-semibold">
        {avgRating.toFixed(1)}
      </span>

      <RatingStars avgRating={avgRating} />

      <span className="text-s14-l20 text-text-muted">
        ({reviewCount} {reviewCount === 1 ? "Review" : "Reviews"})
      </span>
    </div>
  );
};

export default ProductRatingSummary;
