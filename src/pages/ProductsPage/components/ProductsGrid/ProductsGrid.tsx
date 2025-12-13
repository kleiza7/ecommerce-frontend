import { useSearchParams } from "react-router-dom";
import type { ReqProductsListPayload } from "../../../../api/payloads/ReqProductsListPayload.model";
import { useProductsListInfinite } from "../../../../hooks/useProductsListInfinite";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";

const ProductsGrid = () => {
  const [params] = useSearchParams();

  const categoryId = params.get("category")
    ? Number(params.get("category"))
    : undefined;

  const brandId = params.get("brand") ? Number(params.get("brand")) : undefined;

  // WARNING: there is no page because we are using infinite scrolling
  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: 20,
    categoryId,
    brandId,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsListInfinite(payload);

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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
        // TODO: fix this loading spinner
        <div className="py-4 text-center text-sm text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default ProductsGrid;
