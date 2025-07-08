import { useEffect } from 'react';
import { useProductStore } from '../../stores/ProductStore';
import ProductCard from './components/ProductCard';
import { reqProductsGetAll } from '../../api/controllers/Product.controller';

const ProductsPage = () => {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await reqProductsGetAll();

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getAllProducts();
  }, [setProducts]);

  return (
    <div className="flex-1 p-6 overflow-y-auto grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
