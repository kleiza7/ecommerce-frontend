import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useProductReviewsGetReviewsByProductId } from "../../../../../../hooks/useProductReviewsGetReviewsByProductId";
import LoadingSpinner from "../../../../../../shared/components/LoadingSpinner";
import { EVENT_TYPE } from "../../../../../../shared/enums/EventType.enum";
import { useUserStore } from "../../../../../../stores/UserStore";
import NewProductReviewForm from "./components/NewProductReviewForm";
import ProductReviewsList from "./components/ProductReviewsList";

const ProductReviewsSection = () => {
  const { productId } = useParams();
  const parsedProductId = Number(productId);

  const {
    data: productReviews = [],
    isLoading,
    refetch,
  } = useProductReviewsGetReviewsByProductId(parsedProductId);

  const user = useUserStore((state) => state.user);

  const hasUserReviewed = useMemo(() => {
    if (!user) {
      return false;
    }

    return productReviews.some((review) => review.user.id === user.id);
  }, [productReviews, user]);

  useEffect(() => {
    const onProductReviewCreated = () => {
      refetch();
    };
    const onProductReviewUpdated = () => {
      refetch();
    };
    const onProductReviewDeleted = () => {
      refetch();
    };

    window.addEventListener(
      EVENT_TYPE.PRODUCT_REVIEW_CREATED,
      onProductReviewCreated,
    );
    window.addEventListener(
      EVENT_TYPE.PRODUCT_REVIEW_UPDATED,
      onProductReviewUpdated,
    );
    window.addEventListener(
      EVENT_TYPE.PRODUCT_REVIEW_DELETED,
      onProductReviewDeleted,
    );

    return () => {
      window.removeEventListener(
        EVENT_TYPE.PRODUCT_REVIEW_CREATED,
        onProductReviewCreated,
      );
      window.removeEventListener(
        EVENT_TYPE.PRODUCT_REVIEW_UPDATED,
        onProductReviewUpdated,
      );
      window.removeEventListener(
        EVENT_TYPE.PRODUCT_REVIEW_DELETED,
        onProductReviewDeleted,
      );
    };
  }, [refetch]);

  if (isLoading) {
    return <LoadingSpinner size={56} borderWidth={3} />;
  }

  return (
    <div className="flex flex-col gap-y-12">
      {!hasUserReviewed && <NewProductReviewForm productId={parsedProductId} />}

      <ProductReviewsList
        productId={parsedProductId}
        productReviews={productReviews}
      />
    </div>
  );
};

export default ProductReviewsSection;
