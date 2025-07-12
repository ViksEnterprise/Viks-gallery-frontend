import React, { useState } from "react";
import { FormCard } from "../component/FormModal";
import axios from "../service/axios";
import { Model } from "../component/Model/Modal";

export const ForgotAccountDetails = () => {
  const [formD, setFormD] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
    direction: "",
  });
  const [toggleModal, setToggleModal] = useState(false);

  const form = [{ for: "email", label: "email", type: "email", name: "email" }];

  const link = [
    { link: "/login", subLink: "back to login" },
    { link: "/signUp", subLink: "sign up" },
  ];

  const formatErrorMessage = (rawMessage) => {
    if (typeof rawMessage !== "string") return "An error occurred";

    const match = rawMessage.match(/string='([^']+)'/);
    const extracted = match ? match[1] : rawMessage;

    return match ? `Unable to send mail: ${extracted}` : "";
  };

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormD({ ...formD, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErr = {};
    const symbols = /[!#$%^&*()]/;

    if (!formD.email) {
      newErr.email = "email required";
    } else if (symbols.test(formD.email)) {
      newErr.email = "symbols except @ is not required";
    } else {
      const url = "forget-password";
      setLoading(true);
      try {
        const res = await axios.post(url, formD);
        setModalMsg({
          message: `${res.data.message}`,
          direction: "/verification",
          icon: "success",
        });
        setToggleModal(true);
        localStorage.setItem("user_reset_email", formD.email);
        localStorage.setItem("request_type", "Reset Password");
      } catch (err) {
        if (err) {
          const lErr = formatErrorMessage(
            err.response.data.non_field_errors[0]
          );
          if (lErr) {
            error.email = lErr;
          } else {
            setModalMsg({
              message: "Unable to send mail",
              icon: "error",
            });
            setToggleModal(true);
          }
        }
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (Object.keys(newErr).length > 0) {
      setError(newErr);
      return;
    }
  };

  return (
    <>
      <FormCard
        heading="Vkis gallery"
        authMessage="Forgot password?"
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleSubmit(e)}
        error={error}
        loading={loading}
        subAuthMessage="Reset your password by entering the email associated with your account and we’ll send you instructions to reset your password to your email."
        formInHolder={form.map((f) => ({
          ...f,
          value: formD[f.name],
        }))}
        singleSubLink={false}
        SubLink={link}
        btnText="Send reset link"
        formStyle="flex flex-col gap-4 bg-ec lg:h-screen h-svh overflow-hidden"
        formHoldStyle="flex flex-col gap-5"
        innerFormStyle="flex flex-col gap-4 lg:w-3/6 md:w-4/5 w-full lg:p-0 px-4"
        headingStyle="bg-white p-5 shadow text-auth font-semibold xl:text-4xl lg:text-3xl text-2xl"
        authStyle="flex flex-col gap-4 md:text-lg text-base"
        authMsgStyle="text-center font-semibold xl:text-3xl md:text-2xl text-xl capitalize"
      />
      {toggleModal && (
        <Model
          modal={true}
          modalDisplay={toggleModal}
          icon={modalMsg.icon}
          direction={modalMsg.direction}
          message={modalMsg.message}
          buttonText="Ok"
          button={button}
        />
      )}
    </>
  );
};
