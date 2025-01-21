import React from "react";
import { FormCard } from "../component/form";
import login from '../assets/login.jpg'

export const Login = () => {

    const form = [
        {for: 'email', label: 'email', input: 'email', type: 'email', name: 'email'},
        {for: 'password', label: 'password', input: 'password', type: 'password', name: 'password'}
    ]

    return (
        <section>
            <div>
                <FormCard
                    authImg={login}
                    heading='ViksGallery'
                    authMessage='Welcome back'
                    formInHolder={form}
                    fgTxt='forgot password?'
                    btnText='Login'
                    singleSubLink={true}
                    link='/signUp'
                    subLink='Create an account'


                    headingStyle="font-semibold xl:text-4xl lg:text-3xl text-2xl lg:text-auth text-white"
                    formHoldStyle="lg:w-3/5 w-full py-6 lg:px-8 md:px-6 px-4 flex flex-col gap-9 lg:relative absolute bg-ab-bg-color lg:bg-transparent h-full"
                    innerFormStyle="lg:w-4/5 flex flex-col gap-5 w-full bg-white lg:bg-transparent p-3 rounded-lg"
                    authMsgStyle="text-center font-semibold xl:text-3xl text-xl text-auth capitalize"
                />
            </div>
        </section>
    )
}