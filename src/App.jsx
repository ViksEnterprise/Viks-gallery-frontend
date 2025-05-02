import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { About } from "./pages/About";
import { LoginAccount } from "./accounts/login";
import { SignUp } from "./accounts/register";
import { ForgotAccountDetails } from "./accounts/forget";
import { Gallery } from "./pages/Gallery";
import { Error404 } from "./views/NotFound";
import { Contact } from "./pages/Contact";
import { ShoppingCart } from "./views/Carts";
import { Single } from "./pages/Single";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/art-gallery" element={<Gallery />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path="/myCart" element={<ShoppingCart />} ></Route>
        <Route path='/single' element={<Single />}></Route>
        <Route path="/login" element={<LoginAccount />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/reset-pass" element={<ForgotAccountDetails />}></Route>

        
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </>
  );
}

export default App;
