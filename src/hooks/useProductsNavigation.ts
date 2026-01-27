import { useCallback, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const PRODUCTS_PATH = "/products";

export const useProductsNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /* =======================
     PARSED URL STATE
  ======================= */

  const selectedCategorySlug = searchParams.get("category");

  const selectedBrandSlugs = useMemo(() => {
    return searchParams.get("brands")?.split(",") ?? [];
  }, [searchParams]);

  const selectedSellerIds = useMemo(() => {
    return searchParams.get("sellers")?.split(",").map(Number) ?? [];
  }, [searchParams]);

  const query = useMemo(() => {
    const value = searchParams.get("q")?.trim();
    return value && value.length > 0 ? value : undefined;
  }, [searchParams]);

  const sortBy = useMemo(() => {
    const value = searchParams.get("sortBy")?.trim();
    return value && value.length > 0 ? value : undefined;
  }, [searchParams]);

  /* =======================
     NAVIGATION
  ======================= */

  const goToProductsPage = useCallback(
    ({
      categorySlug,
      brandSlugs,
      sellerIds,
      q,
      sortBy,
      overrideParams = false,
    }: {
      categorySlug?: string | null;
      brandSlugs?: string[];
      sellerIds?: number[];
      q?: string;
      sortBy?: string;
      overrideParams?: boolean;
    }) => {
      const params = overrideParams
        ? new URLSearchParams()
        : new URLSearchParams(searchParams);

      if (categorySlug !== undefined) {
        if (categorySlug) {
          params.set("category", categorySlug);
        } else {
          params.delete("category");
        }
      }

      if (brandSlugs !== undefined) {
        if (brandSlugs.length > 0) {
          params.set("brands", brandSlugs.join(","));
        } else {
          params.delete("brands");
        }
      }

      if (sellerIds !== undefined) {
        if (sellerIds.length > 0) {
          params.set("sellers", sellerIds.join(","));
        } else {
          params.delete("sellers");
        }
      }

      if (q !== undefined) {
        const value = q.trim();
        if (value.length > 0) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
      }

      if (sortBy !== undefined) {
        const value = sortBy.trim();
        if (value.length > 0) {
          params.set("sortBy", value);
        } else {
          params.delete("sortBy");
        }
      }

      if (location.pathname === PRODUCTS_PATH) {
        setSearchParams(params);
      } else {
        const queryString = params.toString();
        navigate(
          queryString.length > 0
            ? `${PRODUCTS_PATH}?${queryString}`
            : PRODUCTS_PATH,
        );
      }
    },
    [location.pathname, navigate, searchParams, setSearchParams],
  );

  return {
    selectedCategorySlug,
    selectedBrandSlugs,
    selectedSellerIds,
    query,
    sortBy,
    goToProductsPage,
  };
};
