import UserForm from './components/UserForm';
import OrderForm from './components/OrderForm';
import ProductForm from './components/ProductForm';
import Home from './pages/home';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold text-center mb-8">E-commerce Management</h1>
        <Home />
        
        {/* Flexbox container for the forms */}
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <UserForm />
          <OrderForm />
          <ProductForm />
        </div>
        
      </div>
    </div>
  );
};

export default App;
