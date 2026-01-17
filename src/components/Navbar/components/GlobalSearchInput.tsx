import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReqSearchResponse } from "../../../api/responses/ReqSearchResponse.model";
import { CloseIcon, SearchIcon } from "../../../assets/icons";
import { useCategoriesGetAll } from "../../../hooks/useCategoriesGetAll";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";
import { useSearch } from "../../../hooks/useSearch";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { INPUT_BASE } from "../../../shared/constants/CommonTailwindClasses.constants";
import {
  buildCategorySlugMap,
  buildCategoryTree,
} from "../../../shared/utils/CategoryTree.util";
import { customTwMerge } from "../../../shared/utils/Tailwind.util";

const STORAGE_KEY = "search_histories";
const HISTORIES_LIMIT = 10;

const SEARCH_ITEM_TYPE = {
  SUGGESTION: "SUGGESTION",
  BRAND: "BRAND",
  CATEGORY: "CATEGORY",
} as const;

type SEARCH_ITEM_TYPE =
  (typeof SEARCH_ITEM_TYPE)[keyof typeof SEARCH_ITEM_TYPE];

type SearchItem =
  | {
      type: typeof SEARCH_ITEM_TYPE.SUGGESTION;
      suggestion: ReqSearchResponse["suggestions"][number];
    }
  | {
      type: typeof SEARCH_ITEM_TYPE.BRAND;
      brand: ReqSearchResponse["brands"][number];
    }
  | {
      type: typeof SEARCH_ITEM_TYPE.CATEGORY;
      category: ReqSearchResponse["categories"][number];
    };

const getSearchItemKey = (item: SearchItem): string => {
  switch (item.type) {
    case SEARCH_ITEM_TYPE.SUGGESTION: {
      return `SUGGESTION:${item.suggestion}`;
    }
    case SEARCH_ITEM_TYPE.BRAND: {
      return `BRAND:${item.brand.slug}`;
    }
    case SEARCH_ITEM_TYPE.CATEGORY: {
      return `CATEGORY:${item.category.slug}`;
    }
    default: {
      return "UNKNOWN";
    }
  }
};

const isValidSearchItem = (value: unknown): value is SearchItem => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const maybeType = (value as { type?: unknown }).type;
  if (
    maybeType !== SEARCH_ITEM_TYPE.SUGGESTION &&
    maybeType !== SEARCH_ITEM_TYPE.BRAND &&
    maybeType !== SEARCH_ITEM_TYPE.CATEGORY
  ) {
    return false;
  }

  if (maybeType === SEARCH_ITEM_TYPE.SUGGESTION) {
    const suggestion = (value as { suggestion?: unknown }).suggestion;
    return typeof suggestion === "string";
  }

  if (maybeType === SEARCH_ITEM_TYPE.BRAND) {
    const brand = (value as { brand?: unknown }).brand as
      | { slug?: unknown; name?: unknown }
      | undefined;

    if (!brand || typeof brand !== "object") {
      return false;
    }

    return typeof brand.slug === "string" && typeof brand.name === "string";
  }

  if (maybeType === SEARCH_ITEM_TYPE.CATEGORY) {
    const category = (value as { category?: unknown }).category as
      | { slug?: unknown; name?: unknown }
      | undefined;

    if (!category || typeof category !== "object") {
      return false;
    }

    return (
      typeof category.slug === "string" && typeof category.name === "string"
    );
  }

  return false;
};

const readHistoriesFromStorage = (): SearchItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    const validItems = parsed.filter((item) =>
      isValidSearchItem(item),
    ) as SearchItem[];

    return validItems.slice(0, HISTORIES_LIMIT);
  } catch {
    return [];
  }
};

const writeHistoriesToStorage = (histories: SearchItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(histories));
  } catch {
    // ignore
  }
};

const moveToFrontWithLimit = (
  histories: SearchItem[],
  item: SearchItem,
): SearchItem[] => {
  const clickedKey = getSearchItemKey(item);

  const withoutClicked = histories.filter((history) => {
    return getSearchItemKey(history) !== clickedKey;
  });

  const nextHistories = [item, ...withoutClicked];

  if (nextHistories.length > HISTORIES_LIMIT) {
    return nextHistories.slice(0, HISTORIES_LIMIT);
  }

  return nextHistories;
};

const GlobalSearchInput = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { data: categories = [] } = useCategoriesGetAll();

  const [searchText, setSearchText] = useState("");
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [histories, setHistories] = useState<SearchItem[]>(() => {
    return readHistoriesFromStorage();
  });

  const debouncedSearchText = useDebouncedValue(searchText, 500);

  const {
    data = {
      brands: [],
      categories: [],
      suggestions: [],
    },
    isFetching,
  } = useSearch(debouncedSearchText);

  const showResults = debouncedSearchText.length >= 2;

  const items: SearchItem[] = useMemo(() => {
    return [
      ...data.suggestions.map((suggestion) => ({
        type: SEARCH_ITEM_TYPE.SUGGESTION,
        suggestion,
      })),
      ...data.brands.map((brand) => ({
        type: SEARCH_ITEM_TYPE.BRAND,
        brand,
      })),
      ...data.categories.map((category) => ({
        type: SEARCH_ITEM_TYPE.CATEGORY,
        category,
      })),
    ];
  }, [data]);

  const categoryTree = useMemo(() => {
    return buildCategoryTree(categories);
  }, [categories]);

  const slugMap = useMemo(() => {
    return buildCategorySlugMap(categoryTree);
  }, [categoryTree]);

  const shortToFullCategorySlugMap = useMemo(() => {
    const map = new Map<string, string>();

    for (const [fullPathSlug, categoryNode] of slugMap.entries()) {
      if (!map.has(categoryNode.slug)) {
        map.set(categoryNode.slug, fullPathSlug);
      }
    }

    return map;
  }, [slugMap]);

  const getPrimaryLabel = (item: SearchItem) => {
    switch (item.type) {
      case SEARCH_ITEM_TYPE.SUGGESTION: {
        return item.suggestion;
      }
      case SEARCH_ITEM_TYPE.CATEGORY: {
        return item.category.name;
      }
      case SEARCH_ITEM_TYPE.BRAND: {
        return item.brand.name;
      }
      default: {
        return "";
      }
    }
  };

  const getSecondaryLabel = (item: SearchItem) => {
    switch (item.type) {
      case SEARCH_ITEM_TYPE.CATEGORY: {
        return "Category";
      }
      case SEARCH_ITEM_TYPE.BRAND: {
        return "Brand";
      }
      default: {
        return "";
      }
    }
  };

  const closePortalAndBlur = useCallback(() => {
    setIsPortalOpen(false);
    inputRef.current?.blur();
  }, []);

  const pushHistoryToFront = useCallback((item: SearchItem) => {
    setHistories((prev) => {
      const nextHistories = moveToFrontWithLimit(prev, item);
      writeHistoriesToStorage(nextHistories);
      return nextHistories;
    });
  }, []);

  const navigateByItem = useCallback(
    (item: SearchItem) => {
      pushHistoryToFront(item);

      const params = new URLSearchParams();

      switch (item.type) {
        case SEARCH_ITEM_TYPE.SUGGESTION: {
          params.set("q", item.suggestion);
          break;
        }
        case SEARCH_ITEM_TYPE.CATEGORY: {
          const fullPathSlug = shortToFullCategorySlugMap.get(
            item.category.slug,
          );
          params.set("category", fullPathSlug ?? item.category.slug);
          break;
        }
        case SEARCH_ITEM_TYPE.BRAND: {
          params.set("sellers", item.brand.slug);
          break;
        }
        default: {
          break;
        }
      }

      navigate(`/products?${params.toString()}`);

      setSearchText("");

      closePortalAndBlur();
    },
    [
      closePortalAndBlur,
      navigate,
      pushHistoryToFront,
      shortToFullCategorySlugMap,
    ],
  );

  const navigateAsSuggestion = useCallback(
    (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText) {
        return;
      }

      const suggestionItem: SearchItem = {
        type: SEARCH_ITEM_TYPE.SUGGESTION,
        suggestion: trimmedText,
      };

      navigateByItem(suggestionItem);
    },
    [navigateByItem],
  );

  const onClickSearchItem = useCallback(
    (item: SearchItem) => {
      navigateByItem(item);
    },
    [navigateByItem],
  );

  const onClearHistories = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    setHistories([]);
  }, []);

  const onKeyDownInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        navigateAsSuggestion(searchText);
      }

      if (e.key === "Escape") {
        closePortalAndBlur();
      }
    },
    [closePortalAndBlur, navigateAsSuggestion, searchText],
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        closePortalAndBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePortalAndBlur]);

  return (
    <div ref={wrapperRef} className="relative flex flex-1">
      <SearchIcon className="fill-orange absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2" />

      <input
        ref={inputRef}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsPortalOpen(true)}
        onKeyDown={onKeyDownInput}
        placeholder="Search product, category or brand"
        className={customTwMerge(
          INPUT_BASE,
          "bg-gray-3 placeholder:text-gray-8 h-11 w-full px-10",
          isPortalOpen
            ? "border-orange bg-surface-primary rounded-t-lg rounded-b-none border-2 shadow-lg"
            : "border-gray-2 rounded-lg border",
        )}
      />

      {searchText && (
        <button
          type="button"
          onClick={() => setSearchText("")}
          className="absolute top-1/2 right-3 -translate-y-1/2"
        >
          <CloseIcon className="fill-text-primary h-4 w-4" />
        </button>
      )}

      {isPortalOpen && (
        <div className="bg-surface-primary border-orange absolute top-full left-0 z-50 flex w-full flex-col gap-y-3 rounded-b-lg border-2 border-t-0 p-4 shadow-xl">
          {showResults ? (
            <>
              <div className="text-text-primary text-s14-l20 px-2 font-semibold">
                Related Results
              </div>

              {!isFetching ? (
                items.length !== 0 ? (
                  <ul className="flex flex-col">
                    {items.map((item) => (
                      <li
                        key={getSearchItemKey(item)}
                        className="hover:bg-gray-1 flex h-10 cursor-pointer items-center justify-between rounded px-2"
                        onClick={() => onClickSearchItem(item)}
                      >
                        <span className="text-s14-l20 text-text-primary">
                          {getPrimaryLabel(item)}
                        </span>

                        <span className="text-s12-l16 text-gray-7">
                          {getSecondaryLabel(item)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-s14-l20 text-gray-7 text-center">
                    No results found.
                  </div>
                )
              ) : (
                <LoadingSpinner size={28} borderWidth={3} className="mx-auto" />
              )}
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="text-text-primary text-s14-l20 px-2 font-semibold">
                  Recent Searches
                </div>
                {histories.length !== 0 && (
                  <button
                    className="text-s14-l20 text-text-primary cursor-pointer hover:underline"
                    onClick={onClearHistories}
                  >
                    Clear
                  </button>
                )}
              </div>

              {histories.length !== 0 ? (
                <ul className="flex flex-col">
                  {histories.map((item) => (
                    <li
                      key={`HISTORY-${getSearchItemKey(item)}`}
                      className="hover:bg-gray-1 flex h-10 cursor-pointer items-center justify-between rounded px-2"
                      onClick={() => onClickSearchItem(item)}
                    >
                      <span className="text-s14-l20 text-text-primary">
                        {getPrimaryLabel(item)}
                      </span>

                      <span className="text-s12-l16 text-gray-7">
                        {getSecondaryLabel(item)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-s14-l20 text-gray-7 text-center">
                  No recent searches.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearchInput;
