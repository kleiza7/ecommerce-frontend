import { useBrandsGetAll } from "../../hooks/useBrandsGetAll";
import { useCategoriesGetAll } from "../../hooks/useCategoriesGetAll";
import ProductsFilterSidebar from "./components/ProductsFilterSidebar";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";

const ProductsPage = () => {
  const { data: categories } = useCategoriesGetAll();
  const { data: brands } = useBrandsGetAll();

  return (
    <div className="flex h-full w-full gap-6 p-6">
      <aside className="w-[200px] shrink-0">
        <ProductsFilterSidebar
          categories={categories ?? []}
          brands={brands ?? []}
        />
      </aside>

      <main className="flex-1">
        <ProductsGrid categories={categories ?? []} brands={brands ?? []} />
      </main>
    </div>
  );
};

export default ProductsPage;
