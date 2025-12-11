import type { ReqProductsListPayload } from "../../../../api/payloads/ReqProductsListPayload.model";
import { useProductsListInfinite } from "../../../../hooks/useProductsListInfinite";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";

const ProductsGrid = () => {
  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: 20,
    categoryId: undefined,
    brandId: undefined,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsListInfinite(payload);

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {allProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
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
        <div className="py-4 text-center text-sm text-gray-500">
          Yükleniyor...
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
