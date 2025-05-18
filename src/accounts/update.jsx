import React from "react";
import { FormCard } from "../component/form";
import login from "../assets/login.jpg";

export const UpdatePassword = () => {
  const form = [
    { for: "password", label: "new password", type: "password", name: "password" },
    { for: "password", label: "confirm password", type: "confirm password", name: "confirm password" },
  ];

  return (
    <FormCard
      authImg={login}
      heading="ViksGallery"
      authMessage="Set New Password"
      formInHolder={form}
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
  );
};
