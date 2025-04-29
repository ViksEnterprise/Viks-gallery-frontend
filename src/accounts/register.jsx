import React from "react";
import signUpImg from "../assets/register.jpg";
import { FormCard } from "../component/form";

export const SignUp = () => {
  const form = [
    { for: "name", label: "name", type: "text", name: "name" },
    { for: "username", label: "username", type: "text", name: "username" },
    { for: "email", label: "email", type: "email", name: "email" },
    { for: "password", label: "password", type: "password", name: "password" },
    {
      for: "confirm password",
      label: "confirm password",
      type: "password",
      name: "password",
    },
  ];
  return (
    <FormCard
      authImg={signUpImg}
      heading="VkisGallery"
      authMessage="Create an account"
      formInHolder={form}
      btnText="Create an account"
      singleSubLink={true}
      link="/login"
      subLink="Login"
      formStyle="flex h-full w-full relative"
      imageHldStyle="lg:relative absolute h-full lg:w-2/5 w-full bottom-0"
      subImgHoldStyle="h-full w-full"
      headingStyle="font-semibold xl:text-4xl lg:text-3xl text-2xl lg:text-auth text-white"
      formHoldStyle="lg:w-3/5 w-full py-6 lg:px-8 md:px-6 px-4 flex flex-col gap-9 relative bg-ab-bg-color lg:bg-transparent h-fit z-10"
      innerFormStyle="lg:w-4/5 flex flex-col gap-5 w-full bg-white lg:bg-transparent p-3 rounded-lg"
      authMsgStyle="text-center font-semibold xl:text-3xl text-xl text-auth capitalize"
    />
  );
};
