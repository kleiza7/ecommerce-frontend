import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqProductsListPayload } from "../../../../api/payloads/ReqProductsListPayload.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useProductsListInfinite } from "../../../../hooks/useProductsListInfinite";
import type { CategoryNode } from "../../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../../shared/utils/CategoryTree.util";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";

const collectLeafIds = (node: CategoryNode): number[] => {
  if (node.children.length === 0) return [node.id];
  return node.children.flatMap(collectLeafIds);
};

const ProductsGrid = ({
  categories,
  brands,
}: {
  categories?: ReqCategoriesGetAllResponse;
  brands?: ReqBrandsGetAllResponse;
}) => {
  const [params] = useSearchParams();

  /* ---------------- URL PARAMS ---------------- */

  const selectedCategorySlug = params.get("category");

  const selectedBrandSlugs = useMemo(() => {
    return params.get("brands")?.split(",") ?? [];
  }, [params]);

  /* ---------------- CATEGORY IDS ---------------- */

  const categoryIds = useMemo(() => {
    if (!categories || !selectedCategorySlug) return undefined;

    const tree = buildCategoryTree(categories);
    const slugMap = buildCategorySlugMap(tree);

    const node = slugMap.get(selectedCategorySlug);
    if (!node) return undefined;

    return collectLeafIds(node);
  }, [categories, selectedCategorySlug]);

  /* ---------------- BRAND IDS ---------------- */

  const brandIds = useMemo(() => {
    if (!brands || selectedBrandSlugs.length === 0) return undefined;

    const ids = brands
      .filter((brand) => selectedBrandSlugs.includes(brand.slug))
      .map((brand) => brand.id);

    return ids.length > 0 ? ids : undefined;
  }, [brands, selectedBrandSlugs]);

  /* ---------------- QUERY PAYLOAD ---------------- */

  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: 20,
    ...(categoryIds && { categoryIds }),
    ...(brandIds && { brandIds }),
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsListInfinite(payload);

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  /* ---------------- UI ---------------- */

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
