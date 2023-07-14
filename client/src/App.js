import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import DashBoard from "./components/user/DashBoard";
// import PrivateRoute from "./components/Route/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminRoute from "./components/Route/AdminRoute";
import CreateCategory from "./components/admin/CreateCategory";
import CreateProduct from "./components/admin/CreateProduct";
import Users from "./components/admin/Users";
import Profile from "./components/user/Profile";
import Orders from "./components/user/Orders";
import Products from "./components/admin/Products";
import UpdateProduct from "./components/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import CartPage from "./pages/CartPage";
import AdminOrders from "./components/admin/AdminOrders";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* user routes */}
        <Route path="/dashboard/user" element={<DashBoard />} />
        <Route path="/dashboard/user/profile" element={<Profile />} />
        <Route path="/dashboard/user/orders" element={<Orders />} />
        

        {/* admin routes */}
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route
          path="/dashboard/admin/create-category"
          element={<CreateCategory />}
        />
        <Route
          path="/dashboard/admin/create-product"
          element={<CreateProduct />}
        />
        <Route
          path="/dashboard/admin/product/:slug"
          element={<UpdateProduct />}
        />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/users" element={<Users />} />
        <Route path="/dashboard/admin/orders" element={<AdminOrders/>}/>
        {/* <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route> */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
