import { Footer } from "../component/FooterNav";
import { Model } from "../component/Model/Modal";
import { NavBar } from "../component/NavBar";

export const PaymentSuccess = () => {
  return (
    <>
      <NavBar />
      <Model
        modal={false}
        modalDisplay={true}
        icon={`success`}
        message={`payment was successful`}
        direction={`/`}
        buttonText={"Back Home"}
      />
    </>
  );
};
