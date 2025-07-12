import { Footer } from "../component/FooterNav";
import { Model } from "../component/Model/Modal";
import { NavBar } from "../component/NavBar";

export const PaymentCancel = () => {
  return (
    <>
      <NavBar />
      <Model
        modal={false}
        modalDisplay={true}
        icon={`error`}
        message={`payment was cancelled`}
        direction={`/`}
        buttonText={"Back Home"}
      />
    </>
  );
};
