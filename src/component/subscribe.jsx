import React from "react";
import { useState } from "react";

export const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;

        setError({ ...error, [name] : undefined})
        setEmail( name === 'email' ? value: email )
    }

    const subscribeSubmit = (e) => {
        e.preventDefault();
        return
    }

    return (
        <section className="w-full py-5 px-3 lg:p-9">
            <div className="flex gap-5 lg:gap-10 items-center flex-col lg:flex-row">
                <div className="flex-initial w-full lg:w-1/3 flex flex-col gap-3">
                    <h2 className="text-lg lg:text-xl font-semibold uppercase text-black">Viks gallery news</h2>
                    <span className="text-sm lg:text-base font-normal">Discover new arts and collections added by our curators.</span>
                </div>
                <div className="flex-1 w-full lg:w-4/5 lg:p-3 p-0">
                    <form className="flex flex-row gap-2 items-start lg:items-center flex-col lg:flex-row" action="" onSubmit={subscribeSubmit}>
                        <div className="w-full">
                            <input className="outline-none border-slate-400 border p-3 w-full lg:w-72 xl:w-96 rounded-lg" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="w-full">
                            <button className="bg-blue-800 text-white w-full lg:w-80 p-3 rounded-lg text-lg lg:text-xl font-normal" type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}