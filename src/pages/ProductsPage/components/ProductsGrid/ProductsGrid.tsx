import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqProductsListPayload } from "../../../../api/payloads/ReqProductsListPayload.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useProductsListInfinite } from "../../../../hooks/useProductsListInfinite";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";

const ProductsGrid = ({
  categories,
  brands,
}: {
  categories?: ReqCategoriesGetAllResponse;
  brands?: ReqBrandsGetAllResponse;
}) => {
  const [params] = useSearchParams();

  const categorySlugs = useMemo(
    () => params.get("categories")?.split(",") ?? [],
    [params],
  );

  const brandSlugs = useMemo(
    () => params.get("brands")?.split(",") ?? [],
    [params],
  );

  const categoryIds = useMemo(() => {
    if (!categories || categorySlugs.length === 0) return undefined;

    const ids = categories
      .filter((category) => categorySlugs.includes(category.slug))
      .map((category) => category.id);

    return ids.length > 0 ? ids : undefined;
  }, [categories, categorySlugs]);

  const brandIds = useMemo(() => {
    if (!brands || brandSlugs.length === 0) return undefined;

    const ids = brands
      .filter((brand) => brandSlugs.includes(brand.slug))
      .map((brand) => brand.id);

    return ids.length > 0 ? ids : undefined;
  }, [brands, brandSlugs]);

  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: 20,
    ...(categoryIds && { categoryIds }),
    ...(brandIds && { brandIds }),
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
        <div className="py-4 text-center text-sm text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default ProductsGrid;
