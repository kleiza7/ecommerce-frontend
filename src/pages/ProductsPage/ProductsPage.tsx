import { useEffect } from 'react';
import { useProductStore } from '../../stores/ProductStore';
import ProductCard from './components/ProductCard';
import { reqGetAllProducts } from '../../api/controllers/Product.controller';

const ProductsPage = () => {
  const { products, setProducts } = useProductStore((state) => ({
    products: state.products,
    setProducts: state.setProducts,
  }));

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await reqGetAllProducts();

        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="flex-1 p-6 overflow-y-auto grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsPage;
