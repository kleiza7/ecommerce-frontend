import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();

  return <div>Product Detail — ID: {id}</div>;
};

export default ProductDetailPage;
