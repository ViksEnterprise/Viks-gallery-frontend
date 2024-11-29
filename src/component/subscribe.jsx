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
        <section className="w-full p-9">
            <div className="flex gap-10 items-center">
                <div className="flex-initial w-1/3 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold uppercase text-black">Viks gallery news</h2>
                    <span className="text-base font-normal">Discover new arts and collections added by our curators.</span>
                </div>
                <div className="flex-1 w-4/5 p-3">
                    <form className="flex flex-row gap-2 items-center" action="" onSubmit={subscribeSubmit}>
                        <div>
                            <input className="outline-none border-slate-400 border p-3 w-96 rounded-lg" type="email" name="email" id="email" placeholder="Email" value={email} onChange={(e) => handleChange(e)} />
                        </div>
                        <div>
                            <button type="submit">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}