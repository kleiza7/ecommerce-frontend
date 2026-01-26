import type {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import type { ReqProductsListResponse } from "../../../../api/responses/ReqProductsListResponse.model";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";

const ProductsGrid = ({
  allProducts,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  allProducts: ReqProductsListResponse["items"];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<ReqProductsListResponse, unknown>,
      Error
    >
  >;
}) => {
  return isLoading ? (
    <div className="grid grid-cols-2 gap-3 px-3 md:gap-6 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  ) : allProducts.length === 0 ? (
    <div className="flex h-[300px] items-center justify-center">
      <span className="text-s14-l20 text-gray-8">No products found</span>
    </div>
  ) : (
    <>
      <div className="grid grid-cols-2 gap-3 px-3 md:gap-6 md:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <InfiniteScrollTrigger
        onIntersect={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />

      {isFetchingNextPage && (
        <div className="flex justify-center py-6">
          <LoadingSpinner size={28} borderWidth={3} />
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
