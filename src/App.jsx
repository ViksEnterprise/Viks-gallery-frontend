import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import { About } from "./pages/About";
import { LoginAccount } from "./accounts/login";
import { SignUp } from "./accounts/Register";
import { ForgotAccountDetails } from "./accounts/Forget";
import { Gallery } from "./pages/Gallery";
import { Error404 } from "./views/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/art-gallery" element={<Gallery />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
        <Route path="/login" element={<LoginAccount />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
        <Route path="/reset-pass" element={<ForgotAccountDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
