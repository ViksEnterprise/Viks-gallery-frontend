import React from "react";
import { Link } from "react-router-dom";


export const FormCard = ({ authImg, formHoldStyle, headingStyle, heading, innerFormStyle, authMessage, subAuthMessage, authStyle, authMsgStyle, formInHolder, error, fgTxt, btnText, link, subLink, singleSubLink, SubLInk}) => {
    return (
        <div className="w-full flex items-start">
            <div className="w-full">
                <div className="flex h-screen w-full relative">
                    {authImg &&
                        <div className="h-screen lg:w-2/5 w-full">
                            <div className="h-screen w-full">
                                <img className="h-full w-full" src={authImg} alt="" />
                            </div>
                        </div>
                    }
                    <div className={`${formHoldStyle}`}>
                        <div className={`${headingStyle}`}>
                            <h2>{heading}</h2>
                        </div>
                        <div className="w-full flex flex-col items-center justify-start">
                            <div className={`${innerFormStyle}`}>
                                <div className={`${authStyle}`}>
                                    <h5 className={`${authMsgStyle}`}>{authMessage}</h5>
                                    {subAuthMessage && <p>{subAuthMessage}</p>}
                                </div>
                                <div>
                                    <form action="">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-col gap-6 items-start w-full">
                                                {formInHolder.map((fih, i) => (
                                                    <div className="flex flex-col items-start gap-1 w-full capitalize" key={i}>
                                                        <label className="text-label font-normal xl:text-lg text-base" htmlFor={fih.for}>{fih.label}</label>
                                                        <div className="w-full flex flex-col gap-1">
                                                            <input className="border-b border-bdr w-full h-10 outline-none py-1 px-2 bg-transparent" type={fih.type} name={fih.name} />
                                                            <p className="text-sm text-danger capitalize font-normal">{error}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {fgTxt && 
                                                <div className="md:text-base text-sm font-normal capitalize">
                                                    <Link to='/reset-pass'>{fgTxt}</Link>
                                                </div>
                                            }
                                            <div className="w-full text-center capitalize text-lg text-white">
                                                <button className="bg-auth h-12 w-full rounded-md" type="submit">{btnText}</button>
                                            </div>
                                            {singleSubLink ? 
                                                (<div className="md:text-base text-sm font-normal capitalize text-center">
                                                    <Link to={link}>{subLink}</Link>
                                                </div>) : 
                                                (<div className="md:text-base text-sm font-normal capitalize text-center flex">
                                                    {SubLInk.map((lnk, i) => (
                                                        <Link to={lnk.link} key={i}>{lnk.subLink}</Link>
                                                    ))}
                                                </div>)
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}