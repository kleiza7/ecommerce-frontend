import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { ReqProductsListPayload } from "../../../../api/payloads/ReqProductsListPayload.model";
import type { ReqBrandsGetAllResponse } from "../../../../api/responses/ReqBrandsGetAllResponse.model";
import type { ReqCategoriesGetAllResponse } from "../../../../api/responses/ReqCategoriesGetAllResponse.model";
import { useProductsListInfinite } from "../../../../hooks/useProductsListInfinite";
import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import type { CategoryNode } from "../../../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../../shared/utils/CategoryTree.util";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import ProductCard from "./components/ProductCard";
import ProductCardSkeleton from "./components/ProductCardSkeleton";

const collectLeafIds = (node: CategoryNode): number[] => {
  if (node.children.length === 0) return [node.id];
  return node.children.flatMap(collectLeafIds);
};

const ProductsGrid = ({
  categories,
  brands,
}: {
  categories: ReqCategoriesGetAllResponse;
  brands: ReqBrandsGetAllResponse;
}) => {
  const [params] = useSearchParams();

  const selectedCategorySlug = params.get("category");

  const categoryIds = useMemo(() => {
    if (!selectedCategorySlug) return undefined;

    const tree = buildCategoryTree(categories);
    const slugMap = buildCategorySlugMap(tree);

    const node = slugMap.get(selectedCategorySlug);
    if (!node) return undefined;

    return collectLeafIds(node);
  }, [categories, selectedCategorySlug]);

  const selectedBrandSlugs = useMemo(() => {
    return params.get("brands")?.split(",") ?? [];
  }, [params]);

  const brandIds = useMemo(() => {
    if (selectedBrandSlugs.length === 0) return undefined;

    const ids = brands
      .filter((brand) => selectedBrandSlugs.includes(brand.slug))
      .map((brand) => brand.id);

    return ids.length > 0 ? ids : undefined;
  }, [brands, selectedBrandSlugs]);

  const selectedSellerIds = useMemo(() => {
    return params.get("sellers")?.split(",").map(Number) ?? [];
  }, [params]);

  const sellerIds = useMemo(() => {
    return selectedSellerIds.length > 0 ? selectedSellerIds : undefined;
  }, [selectedSellerIds]);

  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: 20,
    ...(categoryIds && { categoryIds }),
    ...(brandIds && { brandIds }),
    ...(sellerIds && { sellerIds }),
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsListInfinite(payload);

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (allProducts.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <span className="text-s14-l20 text-gray-500">Hiç ürün bulunamadı</span>
      </div>
    );
  }

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
        <div className="flex justify-center py-6">
          <LoadingSpinner size={28} borderWidth={3} />
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
