import { useState } from "react";
import type { ReqProductsGetByIdResponse } from "../../../../api/responses/ReqProductsGetByIdResponse.model";
import AboutSellerSection from "./components/AboutSellerSection";
import ProductReviewsSection from "./components/ReviewsSection/ProductReviewsSection";

const PRODUCT_DETAIL_SECTION = {
  PRODUCT_REVIEWS: "PRODUCT_REVIEWS",
  ABOUT_SELLER: "ABOUT_SELLER",
} as const;

type PRODUCT_DETAIL_SECTION =
  (typeof PRODUCT_DETAIL_SECTION)[keyof typeof PRODUCT_DETAIL_SECTION];

const TABS: {
  label: string;
  section: PRODUCT_DETAIL_SECTION;
}[] = [
  {
    label: "Reviews",
    section: PRODUCT_DETAIL_SECTION.PRODUCT_REVIEWS,
  },
  {
    label: "About the Seller",
    section: PRODUCT_DETAIL_SECTION.ABOUT_SELLER,
  },
];

const ProductDetailTabs = ({
  reviewCount,
  seller,
}: {
  reviewCount: number;
  seller: ReqProductsGetByIdResponse["seller"];
}) => {
  const [activeSection, setActiveSection] = useState<PRODUCT_DETAIL_SECTION>(
    PRODUCT_DETAIL_SECTION.PRODUCT_REVIEWS,
  );

  const getActiveSection = () => {
    switch (activeSection) {
      case PRODUCT_DETAIL_SECTION.PRODUCT_REVIEWS: {
        return <ProductReviewsSection />;
      }
      case PRODUCT_DETAIL_SECTION.ABOUT_SELLER: {
        return <AboutSellerSection seller={seller} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-col px-4 md:px-0">
      <div className="border-border-primary border-b">
        <div className="relative min-w-0 flex-1">
          <div className="no-scrollbar flex items-center gap-x-8 overflow-x-auto pr-10 whitespace-nowrap">
            {TABS.map((tab) => {
              const isActive = activeSection === tab.section;

              return (
                <button
                  key={tab.section}
                  type="button"
                  onClick={() => setActiveSection(tab.section)}
                  className={`text-s14-l20 relative flex shrink-0 cursor-pointer items-center justify-center px-1 py-4 font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  {tab.label}
                  {tab.section === PRODUCT_DETAIL_SECTION.PRODUCT_REVIEWS && (
                    <span className="ml-1">({reviewCount})</span>
                  )}

                  {isActive && (
                    <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-full rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="from-surface-primary pointer-events-none absolute top-0 right-0 h-full w-8 bg-linear-to-l to-transparent" />
        </div>
      </div>

      <div className="py-4 md:py-8 lg:py-12">{getActiveSection()}</div>
    </div>
  );
};

export default ProductDetailTabs;
