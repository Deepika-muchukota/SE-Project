import React from 'react';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import FoodStalls from './FoodStalls'; 
import CartPage from './CartPage';
import Profile from './Profile';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import Orders from './Orders';
import PaymentForm from './PaymentForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Burger352 from './Burger_352/Burger352'; 
import Babas from './Baba/Babas';
import StarBucksDrinks from './Starbucks/StarBucksDrinks';
import PandaExpress from './Panda_Exp/PandaExpress';
import Burger from './Burger_352/Burger';
import Chicken from './Burger_352/Chicken';
import Shakes from './Burger_352/Shakes';
import Sides from './Burger_352/Sides';
import Steaks from './Burger_352/Steaks';
import Vegeterian from './Baba/Vegeterian';
import Nvegeterian from './Baba/Nvegeterian';
import Layout from './Layout';

// Import Subway components
import Subway from './subway/subway';
import Bread from './subway/bread';
import Protien from './subway/protien';
import Toppings from './subway/toppings';
import Sauces from './subway/sauces';
import SubwaySides from './subway/sides';
import Drinks from './subway/drinks';

// Import Halal Shack components 
import HalalShack from './Halal_shack/HalalShack';
import Base from './Halal_shack/base';
import HalalProtein from './Halal_shack/protein';
import HalalToppings from './Halal_shack/toppings';
import HalalSauces from './Halal_shack/sauces';
import HalalDrinks from './Halal_shack/drinks';

// Import context providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import { SubwayOrderProvider } from './context/SubwayOrderContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <SubwayOrderProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/signin" replace />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                
                {/* Protected Routes */}
                <Route path="profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                
                <Route path="change-password" element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                } />

                <Route path="/delete-account" element={
                  <ProtectedRoute>
                    <DeleteAccount />
                  </ProtectedRoute>
                } />

                <Route path="orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                
                <Route path="payment" element={
                  <ProtectedRoute>
                    <PaymentForm />
                  </ProtectedRoute>
                } />
                
                <Route path="foodstalls" element={
                  <ProtectedRoute>
                    <FoodStalls />
                  </ProtectedRoute>
                } />
                
                <Route path="cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />
                
                {/* Food Stall Routes */}
                <Route path="foodstalls/burger352" element={
                  <ProtectedRoute>
                    <Burger352 />
                  </ProtectedRoute>
                } />
                <Route path="foodstalls/burger352/burger" element={<Burger />} />
                <Route path="foodstalls/burger352/chicken" element={<Chicken />} />
                <Route path="foodstalls/burger352/shakes" element={<Shakes />} />
                <Route path="foodstalls/burger352/sides" element={<Sides />} />
                <Route path="foodstalls/burger352/steaks" element={<Steaks />} />
                
                {/* Baba's routes */}
                <Route path="foodstalls/babas" element={
                  <ProtectedRoute>
                    <Babas />
                  </ProtectedRoute>
                } />
                <Route path="foodstalls/babas/Vegeterian" element={<Vegeterian />} />
                <Route path="foodstalls/babas/Nvegeterian" element={<Nvegeterian />} />
                
                {/* Starbucks routes */}
                <Route path="foodstalls/starbucks" element={
                  <ProtectedRoute>
                    <StarBucksDrinks />
                  </ProtectedRoute>
                } />
                
                {/* Subway routes */}
                <Route path="foodstalls/subway" element={
                  <ProtectedRoute>
                    <Subway />
                  </ProtectedRoute>
                } />
                <Route path="foodstalls/subway/bread" element={<Bread />} />
                <Route path="foodstalls/subway/protien" element={<Protien />} />
                <Route path="foodstalls/subway/toppings" element={<Toppings />} />
                <Route path="foodstalls/subway/sauces" element={<Sauces />} />
                <Route path="foodstalls/subway/sides" element={<SubwaySides />} />
                <Route path="foodstalls/subway/drinks" element={<Drinks />} />
                
                {/* Halal Shack routes */}
                <Route path="foodstalls/halalshack" element={
                  <ProtectedRoute>
                    <HalalShack />
                  </ProtectedRoute>
                } />
                <Route path="foodstalls/halalshack/base" element={<Base />} />
                <Route path="foodstalls/halalshack/protein" element={<HalalProtein />} />
                <Route path="foodstalls/halalshack/toppings" element={<HalalToppings />} />
                <Route path="foodstalls/halalshack/sauces" element={<HalalSauces />} />
                <Route path="foodstalls/halalshack/drinks" element={<HalalDrinks />} />
                
                {/* Panda Express routes */}
                <Route path="foodstalls/pandaexpress" element={
                  <ProtectedRoute>
                    <PandaExpress />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </SubwayOrderProvider>
    </AuthProvider>
  );
}

export default App;
