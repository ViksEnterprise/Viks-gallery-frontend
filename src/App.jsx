import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { About } from "./pages/About";
import { LoginAccount } from "./accounts/LoginAuth";
import { SignUp } from "./accounts/SignUp";
import { ForgotAccountDetails } from "./accounts/ForgotPassword";
import { Gallery } from "./pages/Gallery";
import { Error404 } from "./views/NotFound";
import { Contact } from "./pages/Contact";
import { ShoppingCart } from "./views/Carts";
import { Single } from "./pages/Single";
import { UpdatePassword } from "./accounts/UpdatePassword";
import { Checkout } from "./views/CheckOutView";
import { Verification } from "./accounts/Verification";
import { HasCredentials } from "./component/Middlewares/LoginCredentials/Credentials";
import { HasEmailCredentials } from "./component/Middlewares/EmailCredentials/Credentials";
import { PaymentSuccess } from "./views/PaymentSuccess";
import { PaymentCancel } from "./views/PaymentCancel";
import { DashBoardCollection } from "./views/dashboard/Collections";
import { DashBoardOrder } from "./views/dashboard/Orders";
import { Shipment } from "./views/dashboard/Shipments";
import { HasAdminCredentials } from "./component/Middlewares/LoginCredentials/AdminCredentials";
import { DashBoardUsers } from "./views/dashboard/Users";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/art-gallery" element={<Gallery />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/myCart" element={<ShoppingCart />}></Route>
        <Route path="/:artworkId/art-gallery" element={<Single />}></Route>
        <Route path="/success" element={<PaymentSuccess />}></Route>
        <Route path="/cancel" element={<PaymentCancel />}></Route>

        {/* Has user access and right */}
        <Route element={<HasCredentials />}>
          <Route path="/cart/checkout" element={<Checkout />}></Route>
        </Route>

        {/* Has admin access and right */}
        <Route element={<HasAdminCredentials />}>
          <Route
            path="/dashboard/collections"
            element={<DashBoardCollection />}
          ></Route>
          <Route path="/dashboard/orders" element={<DashBoardOrder />}></Route>
          <Route path="/dashboard/shipments" element={<Shipment />}></Route>
          <Route path="/dashboard/users" element={<DashBoardUsers />}></Route>
        </Route>

        {/* Authentications Route */}

        <Route path="/login" element={<LoginAccount />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/reset-pass" element={<ForgotAccountDetails />}></Route>

        <Route element={<HasEmailCredentials />}>
          <Route path="/update-password" element={<UpdatePassword />}></Route>
          <Route path="/verification" element={<Verification />}></Route>
        </Route>

        {/* 404 Route */}

        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
