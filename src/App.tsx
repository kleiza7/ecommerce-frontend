import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AppHeader from './components/AppHeader/AppHeader';
import ProductDetailPage from './pages/ProductDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
