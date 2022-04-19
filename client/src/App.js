import "./App.css";
import ClientView from "./components/ClientView/ClientView";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import SingleProductView from "./components/SingleProductView/SingleProductView";
import NavBar from "./components/NavBar/NavBar";
import HomeRegistration from "./components/Registration/HomeRegistration";
import UserRegistration from "./components/Registration/UserRegistration/UserRegistration";
import AdminHome from "./components/AdminView/AdminHome";
import CreateNewUser from "./components/Registration/UserRegistration/CreateNewUser";
import CheckOutProductList from "./components/CheckOutProducts/CheckOutProductList";
import CreateNewAdmin from "./components/Registration/AdminRegistration/CreateNewAdmin";
import AdminLogin from "./components/Registration/AdminRegistration/AdminLogin";

function App() {
  return (
    <div className="App">
      
      {/* Nav bar components */}
      <NavBar />

      {/* Route components */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin-registration" element={<CreateNewAdmin />}></Route>
        <Route path="/user" element={<UserRegistration />}></Route>
        <Route path="/user-registration" element={<CreateNewUser />}></Route>
        <Route path="/registration" element={<HomeRegistration />}></Route>
        <Route path="/products" element={<ClientView />}></Route>
        <Route path="/product/:id" element={<SingleProductView />}></Route>
        <Route path="/carts" element={<Cart />}></Route>
        <Route path="/admin" element={<AdminHome />}></Route>
        <Route
          path="/admin-orders"
          element={<CheckOutProductList viewid={1}/>}
        ></Route>
        <Route
          path="/client-orders"
          element={<CheckOutProductList viewid={2} />}
        ></Route>     
      </Routes>

      <ToastContainer />

    </div>
  );
}

export default App;
