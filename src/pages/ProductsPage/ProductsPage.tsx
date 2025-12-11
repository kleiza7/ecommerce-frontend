import ProductsFilterSidebar from "./components/ProductsFilterSidebar";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";

const ProductsPage = () => {
  return (
    <div className="flex h-full w-full gap-6 p-6">
      {/* Sidebar → w-[200px] BURADA veriliyor */}
      <aside className="w-[200px] shrink-0">
        <ProductsFilterSidebar />
      </aside>

      {/* Content */}
      <main className="flex-1">
        <ProductsGrid />
      </main>
    </div>
  );
};

export default ProductsPage;
