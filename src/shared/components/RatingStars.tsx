import {
  StarFilledIcon,
  StarHalfFilledIcon,
  StarIcon,
} from "../../assets/icons";

const RatingStars = ({ avgRating }: { avgRating: number }) => {
  const fullStars = Math.floor(avgRating);
  const decimalPart = avgRating - fullStars;
  const hasHalfStar = decimalPart >= 0.25 && decimalPart < 0.75;
  const roundedUpFullStars = decimalPart >= 0.75 ? fullStars + 1 : fullStars;

  return (
    <div className="flex items-center gap-x-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < roundedUpFullStars && !hasHalfStar) {
          return (
            <StarFilledIcon
              key={index}
              className="fill-rating-primary h-5 w-5"
            />
          );
        }

        if (index < fullStars) {
          return (
            <StarFilledIcon
              key={index}
              className="fill-rating-primary h-5 w-5"
            />
          );
        }

        if (index === fullStars && hasHalfStar) {
          return (
            <StarHalfFilledIcon
              key={index}
              className="fill-rating-primary h-5 w-5"
            />
          );
        }

        return <StarIcon key={index} className="fill-rating-primary h-5 w-5" />;
      })}
    </div>
  );
};

export default RatingStars;
