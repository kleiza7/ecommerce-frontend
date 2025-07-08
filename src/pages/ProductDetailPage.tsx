import { useParams } from 'react-router-dom';
import { reqProductsGetById } from '../api/controllers/Product.controller';
import { useEffect, useState } from 'react';
import type { ReqProductsGetByIdResponse } from '../api/responses/ReqProductsGetByIdResponse.model';

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<ReqProductsGetByIdResponse>();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await reqProductsGetById(+id!);

        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    if (!id) return;

    getProductById();
  }, [id]);

  return <div>{product ? <>{product.name}</> : <></>}</div>;
};

export default ProductDetailPage;
