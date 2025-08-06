import { useState } from "react";
import { FormCard } from "../component/FormModal";
import update from "../assets/home/Viks 22.jpg";
import { Model } from "../component/Model/Modal";
import axios from "../service/axios";

export const UpdatePassword = () => {
  const [formD, setFormD] = useState({
    password: "",
    password2: "",
    email: "",
  });
  const form = [
    {
      for: "password",
      label: "new password",
      type: "password",
      name: "password",
    },
    {
      for: "password",
      label: "confirm password",
      type: "password",
      name: "password2",
    },
  ];
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
    direction: "",
  });
  const [toggleModal, setToggleModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormD({ ...formD, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErr = {};

    if (!formD.password) {
      newErr.password = "password required";
    } else if (!formD.password2) {
      newErr.password2 = "confirm password required";
    } else if (formD.password2 != formD.password) {
      newErr.password2 = "password doesn't match";
    } else {
      formD.email = localStorage.getItem("user_reset_email");
      const url = "set-new-password";
      setLoader(true);
      try {
        const response = await axios.patch(url, formD);
        if (response) {
          setModalMsg({
            message: `${response.data.message}`,
            direction: "/update",
            icon: "success",
          });
          setToggleModal(true);
        }
      } catch (err) {
        if (err) {
          if (err.status == 403) {
            setModalMsg({
              message: `${err.response.data?.detail}`,
              icon: "error",
            });
            setToggleModal(true);
          }

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

  return (
    <>
      <FormCard
        authImg={update}
        heading="ViksGallery"
        authMessage="Set New Password"
        formInHolder={form.map((f) => ({
          ...f,
          value: formD[f.name],
        }))}
        error={error}
        handleChange={(e) => handleChange(e)}
        handleSubmit={(e) => handleFormSubmit(e)}
        loading={loader}
        btnText="Update Password"
        singleSubLink={true}
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
          buttonText="update"
          button={button}
        />
      )}
    </>
  );
};
