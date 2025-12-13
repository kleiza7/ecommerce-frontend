import ProductsFilterSidebar from "./components/ProductsFilterSidebar";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";

const ProductsPage = () => {
  return (
    <div className="flex h-full w-full gap-6 p-6">
      <aside className="w-[200px] shrink-0">
        <ProductsFilterSidebar />
      </aside>

      <main className="flex-1">
        <ProductsGrid />
      </main>
    </div>
  );
};

export default ProductsPage;
