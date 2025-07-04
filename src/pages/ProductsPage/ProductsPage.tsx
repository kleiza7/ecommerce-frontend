import { useProductStore } from '../../stores/ProductStore';
import ProductCard from './components/ProductCard';

const ProductsPage = () => {
  const products = useProductStore((state) => state.products);

  return (
    <div className="flex-1 p-6 overflow-y-auto grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
