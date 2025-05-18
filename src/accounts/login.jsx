import { useEffect, useState } from "react";
import { FormCard } from "../component/form";
import login from "../assets/login.jpg";
import { postToApi } from "../service/baseAPI";
import { Model } from "../component/modal/Modal";

export const LoginAccount = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    modal: true,
    message: "",
    icon: "",
    display: true,
    direction: "",
  });

  const form = [
    { for: "email", label: "email", type: "email", name: "email" },
    { for: "password", label: "password", type: "password", name: "password" },
  ];

  useEffect(() => {
    
    setModalMsg({
      modal: false,
      message: "login successfully",
      direction: "/",
      display: false,
      icon: "success",
    });
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const symbols = /[!#$%^&*()]/;
    const newErr = {};

    if (!formData.email) {
      newErr.email = "email required";
    } else if (symbols.test(formData.email)) {
      newErr.email =
        "email must not contain or starts with any of this symbols";
    } else if (!formData.password) {
      newErr.password = "password required";
    } else {
      const url = "login";
      setLoader(true);
      try {
        const response = await postToApi(url, formData);
        if (response) {
          sessionStorage.setItem("MVtoken", response.access_token);
          localStorage.setItem(
            "userData",
            JSON.stringify({
              name: `${response.user_name}`,
              pic: `${response.profile_pic}`,
            })
          );
        }
      } catch (err) {
        console.log("err", err);
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
        authImg={login}
        heading="ViksGallery"
        authMessage="Welcome back"
        formInHolder={form.map((f) => ({
          ...f,
          value: formData[f.name],
        }))}
        error={error}
        handleChange={(e) => handleInput(e)}
        handleSubmit={(e) => handleFormSubmit(e)}
        loading={loader}
        fgTxt="forgot password?"
        btnText="Login"
        singleSubLink={true}
        link="/signUp"
        subLink="Sign up now"
        formStyle="flex lg:h-screen h-svh w-full relative"
        imageHldStyle="lg:h-screen h-svh lg:w-2/5 w-full overflow-hidden"
        subImgHoldStyle="lg:h-screen h-svh w-full"
        headingStyle="font-semibold xl:text-4xl lg:text-3xl text-2xl lg:text-auth text-white"
        formHoldStyle="lg:w-3/5 w-full py-6 lg:px-8 md:px-6 px-4 flex flex-col gap-9 lg:relative absolute bg-ab-bg-color lg:bg-transparent h-full"
        innerFormStyle="lg:w-4/5 flex flex-col gap-5 w-full bg-white lg:bg-transparent p-3 rounded-lg"
        authMsgStyle="text-center font-semibold xl:text-3xl text-xl text-auth capitalize"
      />
      <Model
        modal={modalMsg.modal}
        modalDisplay={modalMsg.display}
        icon={modalMsg.icon}
        message={modalMsg.message}
        direction={modalMsg.direction}
      />
    </>
  );
};
