import React from "react";
import { FormCard } from "../component/form";

export const ForgotAccountDetails = () => {
  const form = [{ for: "email", label: "email", type: "email", name: "email" }];

  const link = [
    { link: "/login", subLink: "back to login" },
    { link: "/signUp", subLink: "sign up" },
  ];

  return (
    <FormCard
      heading="Vkis gallery"
      authMessage="Forgot password?"
      subAuthMessage="Reset your password by entering the email associated with your account and we’ll send you instructions to reset your password to your email."
      formInHolder={form}
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
  );
};
