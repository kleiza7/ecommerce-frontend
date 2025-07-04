import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import AppHeader from './components/AppHeader';

const App = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
