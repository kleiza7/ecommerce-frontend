import { useState } from "react";
import AboutSellerSection from "./components/AboutSellerSection";
import ProductDescriptionSection from "./components/ProductDescriptionSection";
import ReviewsSection from "./components/ReviewsSection";
import TechnicalSpecificationsSection from "./components/TechnicalSpecificationsSection";

const PRODUCT_DETAIL_SECTION = {
  PRODUCT_DESCRIPTION: "PRODUCT_DESCRIPTION",
  TECHNICAL_SPECIFICATIONS: "TECHNICAL_SPECIFICATIONS",
  REVIEWS: "REVIEWS",
  ABOUT_SELLER: "ABOUT_SELLER",
} as const;

type PRODUCT_DETAIL_SECTION =
  (typeof PRODUCT_DETAIL_SECTION)[keyof typeof PRODUCT_DETAIL_SECTION];

const TABS: {
  label: string;
  section: PRODUCT_DETAIL_SECTION;
}[] = [
  {
    label: "Product Description",
    section: PRODUCT_DETAIL_SECTION.PRODUCT_DESCRIPTION,
  },
  {
    label: "Technical Specifications",
    section: PRODUCT_DETAIL_SECTION.TECHNICAL_SPECIFICATIONS,
  },
  {
    label: "Reviews (1,240)",
    section: PRODUCT_DETAIL_SECTION.REVIEWS,
  },
  {
    label: "About the Seller",
    section: PRODUCT_DETAIL_SECTION.ABOUT_SELLER,
  },
];

const ProductDetailTabs = ({ description }: { description: string }) => {
  const [activeSection, setActiveSection] = useState<PRODUCT_DETAIL_SECTION>(
    PRODUCT_DETAIL_SECTION.PRODUCT_DESCRIPTION,
  );

  const getActiveSection = () => {
    switch (activeSection) {
      case PRODUCT_DETAIL_SECTION.PRODUCT_DESCRIPTION: {
        return <ProductDescriptionSection description={description} />;
      }
      case PRODUCT_DETAIL_SECTION.TECHNICAL_SPECIFICATIONS: {
        return <TechnicalSpecificationsSection />;
      }
      case PRODUCT_DETAIL_SECTION.REVIEWS: {
        return <ReviewsSection />;
      }
      case PRODUCT_DETAIL_SECTION.ABOUT_SELLER: {
        return <AboutSellerSection />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-12">
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

      {getActiveSection()}
    </div>
  );
};

export default ProductDetailTabs;
