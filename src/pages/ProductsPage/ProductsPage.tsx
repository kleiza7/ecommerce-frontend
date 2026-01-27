import { useCallback, useMemo, useState } from "react";
import type { ReqProductsListPayload } from "../../api/payloads/ReqProductsListPayload.model";
import { useAuthGetAllSellers } from "../../hooks/useAuthGetAllSellers";
import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import { useProductsListInfinite } from "../../hooks/useProductsListInfinite";
import { useProductsNavigation } from "../../hooks/useProductsNavigation";
import CategoryBreadcrumb from "../../shared/components/CategoryBreadcrumb";
import type { CategoryNode } from "../../shared/models/CategoryNode.model";
import {
  buildCategorySlugMap,
  buildCategoryTreeWithMap,
} from "../../shared/utils/CategoryTree.util";
import ProductListHeader from "./components/ProductListHeader";
import ProductsFilterDrawer from "./components/ProductsFilterDrawer/ProductsFilterDrawer";
import ProductsFilterSidebar from "./components/ProductsFilterSidebar/ProductsFilterSidebar";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";
import ProductsRangeIndicator from "./components/ProductsRangeIndicator";
import ProductsSortDrawer from "./components/ProductsSortDrawer";

const PAGE_LIMIT = 20;

const collectLeafIds = (node: CategoryNode): number[] => {
  if (node.children.length === 0) {
    return [node.id];
  }

  return node.children.flatMap(collectLeafIds);
};

const ProductsPage = () => {
  const {
    selectedCategorySlug,
    selectedBrandSlugs,
    selectedSellerIds,
    query,
    sortBy,
  } = useProductsNavigation();

  const { data: categories = [] } = useCategoriesGetAll();
  const { data: brands = [] } = useBrandsGetAll();
  const { data: sellers = [] } = useAuthGetAllSellers();

  /* =======================
     CATEGORY
  ======================= */

  const selectedCategoryNode = useMemo(() => {
    if (!selectedCategorySlug || categories.length === 0) {
      return undefined;
    }

    const { tree } = buildCategoryTreeWithMap(categories);
    const slugMap = buildCategorySlugMap(tree);

    return slugMap.get(selectedCategorySlug);
  }, [categories, selectedCategorySlug]);

  const selectedCategoryId = selectedCategoryNode?.id;
  const selectedCategoryName = selectedCategoryNode?.name;

  const categoryIds = useMemo(() => {
    if (!selectedCategoryNode) {
      return undefined;
    }

    return collectLeafIds(selectedCategoryNode);
  }, [selectedCategoryNode]);

  /* =======================
     BRAND / SELLER
  ======================= */

  const brandIds = useMemo(() => {
    if (selectedBrandSlugs.length === 0) {
      return undefined;
    }

    const ids = brands
      .filter((brand) => selectedBrandSlugs.includes(brand.slug))
      .map((brand) => brand.id);

    return ids.length > 0 ? ids : undefined;
  }, [brands, selectedBrandSlugs]);

  const sellerIds = useMemo(() => {
    return selectedSellerIds.length > 0 ? selectedSellerIds : undefined;
  }, [selectedSellerIds]);

  /* =======================
     SORT
  ======================= */

  const sort = useMemo<ReqProductsListPayload["sort"]>(() => {
    if (!sortBy) {
      return undefined;
    }

    const [field, order] = sortBy.split("-");

    if (
      (field === "id" || field === "createdAt" || field === "price") &&
      (order === "asc" || order === "desc")
    ) {
      return { field, order };
    }

    return undefined;
  }, [sortBy]);

  /* =======================
     PAYLOAD
  ======================= */

  const payload: Omit<ReqProductsListPayload, "page"> = {
    limit: PAGE_LIMIT,

    ...(categoryIds || brandIds || sellerIds || query
      ? {
          filter: {
            ...(categoryIds && { categoryIds }),
            ...(brandIds && { brandIds }),
            ...(sellerIds && { sellerIds }),
            ...(query && { query }),
          },
        }
      : {}),

    ...(sort && { sort }),
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useProductsListInfinite(payload);

  /* =======================
     UI STATE
  ======================= */

  const [isProductsSortPortalOpen, setIsProductsSortPortalOpen] =
    useState(false);
  const [isProductsFilterPortalOpen, setIsProductsFilterPortalOpen] =
    useState(false);

  const openProductsSortPortal = useCallback(() => {
    setIsProductsSortPortalOpen(true);
  }, []);

  const openProductsFilterPortal = useCallback(() => {
    setIsProductsFilterPortalOpen(true);
  }, []);

  /* =======================
     DATA
  ======================= */

  const allProducts = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.pagination.total ?? 0;

  const rangeEnd = allProducts.length;
  const rangeStart = Math.max(1, rangeEnd - PAGE_LIMIT + 1);

  /* =======================
     RENDER
  ======================= */

  return (
    <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-5 pb-4 md:px-10 md:py-4">
      <CategoryBreadcrumb selectedCategoryId={selectedCategoryId} />

      <div className="flex gap-6">
        <aside className="hidden w-[200px] shrink-0 md:block">
          <ProductsFilterSidebar
            categories={categories}
            brands={brands}
            sellers={sellers}
          />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col gap-3 md:gap-6">
            <ProductListHeader
              selectedCategoryName={selectedCategoryName}
              totalCount={totalCount}
              openProductsSortPortal={openProductsSortPortal}
              openProductsFilterPortal={openProductsFilterPortal}
            />

            <ProductsGrid
              allProducts={allProducts}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>

      <ProductsRangeIndicator
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        totalCount={totalCount}
      />

      <ProductsSortDrawer
        open={isProductsSortPortalOpen}
        setOpen={setIsProductsSortPortalOpen}
      />

      <ProductsFilterDrawer
        open={isProductsFilterPortalOpen}
        setOpen={setIsProductsFilterPortalOpen}
        categories={categories}
        brands={brands}
        sellers={sellers}
      />
    </div>
  );
};

export default ProductsPage;
