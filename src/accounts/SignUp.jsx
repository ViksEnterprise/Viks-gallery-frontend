import { useState } from "react";
import signUpImg from "../assets/home/VIKS 26.jpg";
import { FormCard } from "../component/FormModal";
import { Model } from "../component/Model/Modal";
import axios from "../service/axios";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    user_name: "",
    email: "",
    auth_provider: "email",
    password: "",
    password2: "",
  });

  const form = [
    { for: "full_name", label: "full name", type: "text", name: "full_name" },
    { for: "username", label: "username", type: "text", name: "user_name" },
    { for: "email", label: "email", type: "email", name: "email" },
    { for: "password", label: "password", type: "password", name: "password" },
    {
      for: "password2",
      label: "confirm password",
      type: "password",
      name: "password2",
    },
  ];
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
    direction: "",
  });
  const [toggleModal, setToggleModal] = useState(false);

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const symbols = /[!#$%^&*()]/;
    const symbol = /[!#$%^&*(){_'"\+-<>/}@?;=]/;
    const number = /[0-9]/;
    const newErr = {};

    if (!formData.full_name) {
      newErr.full_name = "full name required";
    } else if (symbol.test(formData.full_name)) {
      newErr.full_name = "name must not contain any symbols";
    } else if (number.test(formData.full_name)) {
      newErr.full_name = "name must not contain any digits";
    } else if (!formData.user_name) {
      newErr.user_name = "user name required";
    } else if (!formData.email) {
      newErr.email = "email required";
    } else if (symbols.test(formData.email)) {
      newErr.email =
        "email must not contain or starts with any of this symbols";
    } else if (!formData.password) {
      newErr.password = "password required";
    } else if (!formData.password2) {
      newErr.password2 = "confirm password required";
    } else if (formData.password2 != formData.password) {
      newErr.password2 = "password doesn't match";
    } else {
      const url = "create-user-account";
      setLoader(true);
      try {
        const response = await axios.post(url, formData);
        if (response) {
          setModalMsg({
            message: "Sign up successfully. Check your email for a code",
            direction: "/verification",
            icon: "success",
          });
          setToggleModal(true);
          localStorage.setItem("user_reset_email", formData.email);
          localStorage.setItem("request_type", "Verify Account");
        }
      } catch (err) {
        console.log(err);
        if (err) {
          if (
            err.status == 400 &&
            err.response.data.email &&
            err.response.data.user_name
          ) {
            error.email = err.response.data.email[0];
            error.user_name = err.response.data.user_name[0];
          }

          if (err.status == 400 && err.response.data.user_name) {
            error.user_name = err.response.data.user_name[0];
          }

          if (err.status == 400 && err.response.data.email) {
            error.email = err.response.data.email[0];
          }

          if (err.status == 403) {
            setModalMsg({
              message: `${err.response.data?.detail}`,
              icon: "error",
            });
            setToggleModal(true);
          }

          if (err.status == 404) {
            setModalMsg({
              message: `${err.response.data}`,
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

          if (err.message == "Network Error") {
            setModalMsg({
              message: `${err.message}`,
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

  return (
    <>
      <FormCard
        authImg={signUpImg}
        heading="VkisGallery"
        authMessage="Create an account"
        formInHolder={form.map((f) => ({
          ...f,
          value: formData[f.name],
        }))}
        error={error}
        handleChange={(e) => handleInput(e)}
        handleSubmit={(e) => handleFormSubmit(e)}
        btnText="Create an account"
        singleSubLink={true}
        loading={loader}
        link="/login"
        subLink="Login"
        formStyle="flex flex-row-reverse h-full w-full relative"
        imageHldStyle="lg:relative absolute h-full lg:w-2/5 w-full bottom-0 flex-1"
        subImgHoldStyle="h-full w-full"
        headingStyle="font-semibold xl:text-4xl lg:text-3xl text-2xl lg:text-auth text-white"
        formHoldStyle="lg:w-2/5 flex-1 w-full py-6 lg:px-8 md:px-6 px-4 flex flex-col gap-9 relative bg-ab-bg-color lg:bg-transparent h-fit z-10"
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
          buttonText="Verify account"
          button={button}
        />
      )}
    </>
  );
};
