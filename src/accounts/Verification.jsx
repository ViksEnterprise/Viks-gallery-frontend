import { useEffect, useState } from "react";
import { FormCard } from "../component/FormModal";
import login from "../assets/login.jpg";
import { Model } from "../component/Model/Modal";
import axios from "../service/axios";

export const Verification = () => {
  const [formData, setFormData] = useState({
    email: "",
    code: "",
  });
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
    direction: "",
  });
  const [toggleModal, setToggleModal] = useState(false);
  const [request, setRequest] = useState("");
  const [count, setCount] = useState(30);
  const [disable, setDisable] = useState(false);

  const form = [
    {
      for: "code",
      label: "enter the code sent to your mail",
      type: "text",
      name: "code",
    },
  ];

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const startCountdown = () => {
    setDisable(true);
    setCount(30);

    const resendCount = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(resendCount);
          setDisable(false);
          return 0;
        }
        return prev - 1;
      });
    }, 2500);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const symbols = /[!#$%^&*()]/;
    const newErr = {};

    if (!formData.code) {
      newErr.code = "code required";
    } else if (symbols.test(formData.code)) {
      newErr.code = "Invalid code";
    } else {
      const request = localStorage.getItem("request_type");
      formData.email = localStorage.getItem("user_reset_email");

      let url;

      setRequest(request);

      if (request == "Reset Password") url = "verify-reset-password-code";

      if (request == "Verify Account") url = "verify-user-account";

      setLoader(true);
      try {
        const response = await axios.post(url, formData);
        if (response) {
          setModalMsg({
            message: `${response.data.message}`,
            direction:
              request == "Verify Account" ? "/login" : "/update-password",
            icon: "success",
          });
          setToggleModal(true);
        }
      } catch (err) {
        if (err) {
          if (err.response.data?.non_field_errors?.[0]) {
            setModalMsg({
              message: `${err.response.data.non_field_errors[0]}`,
              icon: "error",
            });
            setToggleModal(true);
          }

          if (err.status == 500) {
            setModalMsg({
              message: "server error",
              icon: "error",
            });
            setToggleModal(true);
          }
        }
        return;
      } finally {
        setLoader(false);
      }
    }

    if (Object.keys(newErr).length > 0) {
      setError(newErr);
      return;
    }
  };

  const resendCode = async () => {
    const request = localStorage.getItem("request_type");
    const email = localStorage.getItem("user_reset_email");

    let url;
    let payload;

    setRequest(request);

    if (request == "Reset Password")
      (url = "resend-password-reset-code"),
        (payload = {
          email: email,
          verification_type: "Reset Password",
        });

    if (request == "Verify Account")
      (url = "resend-verification-code"),
        (payload = {
          email: email,
          verification_type: "Email Verification",
        });

    setLoader(true);

    try {
      const response = await axios.post(url, payload);
      if (response) {
        setModalMsg({
          message: `${response.data.message}`,
          icon: "success",
        });
        setToggleModal(true);
        startCountdown();
      }
    } catch (err) {
      if (err) {
        if (err.response.data?.non_field_errors?.[0]) {
          setModalMsg({
            message: `${err.response.data.non_field_errors[0]}`,
            icon: "error",
          });
          setToggleModal(true);
        }

        if (err.status == 500) {
          setModalMsg({
            message: "server error",
            icon: "error",
          });
          setToggleModal(true);
        }
      }
      return;
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <FormCard
        authImg={login}
        heading="ViksGallery"
        authMessage="Verify Code"
        formInHolder={form.map((f) => ({
          ...f,
          value: formData[f.name],
        }))}
        error={error}
        handleChange={(e) => handleInput(e)}
        handleSubmit={(e) => handleFormSubmit(e)}
        resendButton={() => resendCode()}
        loading={loader}
        resendBtn={disable ? `${count}s resend code` : `resend code`}
        btnText="Send"
        singleSubLink={true}
        disable={disable}
        link="/signUp"
        formStyle="flex lg:h-screen h-svh w-full relative"
        imageHldStyle="lg:h-screen h-svh lg:w-2/5 w-full overflow-hidden"
        subImgHoldStyle="lg:h-screen h-svh w-full"
        headingStyle="font-semibold xl:text-4xl lg:text-3xl text-2xl lg:text-auth text-white"
        formHoldStyle="lg:w-3/5 w-full py-6 lg:px-8 md:px-6 px-4 flex flex-col gap-9 lg:relative absolute bg-ab-bg-color lg:bg-transparent h-full"
        innerFormStyle="lg:w-4/5 flex flex-col gap-5 w-full bg-white lg:bg-transparent p-3 rounded-lg"
        authMsgStyle="text-center font-semibold xl:text-3xl text-xl text-auth capitalize"
      />
      {toggleModal && (
        <Model
          modal={true}
          modalDisplay={toggleModal}
          icon={modalMsg.icon}
          message={modalMsg.message}
          direction={modalMsg.direction}
          buttonText={
            request == "Verify Account" ? "Login" : "Set new password"
          }
          button={button}
        />
      )}
    </>
  );
};
