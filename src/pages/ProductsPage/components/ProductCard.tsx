import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../../stores/CartStore';
import type { ReqProductsGetAllResponse } from '../../../api/responses/ReqProductsGetAllResponse.model';

const ProductCard = ({ product }: { product: ReqProductsGetAllResponse[number] }) => {
  const navigate = useNavigate();
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const goToProductDetailPage = (id: number) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div
      className="h-[300px] overflow-hidden border rounded-md flex flex-col"
      onClick={() => goToProductDetailPage(product.id)}
    >
      <img src={''} alt={product.name} className="w-full h-[70%] object-cover" />
      <div className="p-2 flex flex-1 flex-col gap-y-1 shrink-0">
        <span className="text-s14-l20 text-textPrimary">{product.name}</span>
        <span className="text-s12-l16 text-textSecondary">{product.description}</span>
        <span className="text-s14-l20 text-textPrimary">{product.price.toFixed(2)} TL</span>
        <button
          className="bg-orange-500 rounded-md text-white"
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart(product.id);
          }}
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
