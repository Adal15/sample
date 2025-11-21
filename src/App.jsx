import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import "./assets/css/main.css"; // Adjust the path based on where you placed the CSS file

import Header from "./components/Header";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
import Accounts from "./Pages/Accounts";
import Wishlist from "./Pages/Wishlist";
import Shop from "./Pages/Shop";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Register from "./Pages/Register";
import ItemList from "./components/ItemList";
import Items from "./components/Items";
import { CartProvider } from "./CartContext/CartContext";
import ProductDetails from "./Pages/ProductDetails";
import ContactUs from "./Pages/ContactUs";
import UserRegistration from "./Pages/UserRegistration";
import Test from "./components/Test";

const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <Nav />
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* LandingPage will be shown as the homepage */}
            <Route index element={<LandingPage />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            {/* <Route path="/itemlist" element={<ItemList />} /> */}
            <Route path="/itemlist/:categoryId" element={<ItemList />} />{" "}
            <Route path="/items" element={<Items />} />
            {/* <Route path="/items/:id" element={<ProductDetails />} /> */}
            <Route path="/items/:id" element={<ProductDetails />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/userregistration" element={<UserRegistration />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
