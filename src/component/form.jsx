import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const FormCard = ({
  authImg,
  formStyle,
  imageHldStyle,
  subImgHoldStyle,
  formHoldStyle,
  headingStyle,
  heading,
  innerFormStyle,
  authMessage,
  subAuthMessage,
  authStyle,
  authMsgStyle,
  formInHolder,
  error,
  fgTxt,
  btnText,
  link,
  subLink,
  singleSubLink,
  SubLink,
  handleChange,
  handleSubmit,
  loading,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (btnText === "Send reset link") {
      navigate("/update-password");
    }
  };
  return (
    <div className="w-full flex items-start">
      <div className="w-full relative">
        <div className={`${formStyle}`}>
          {authImg && (
            <div className={`${imageHldStyle}`}>
              <div className={`${subImgHoldStyle}`}>
                <img className="h-full w-full" src={authImg} alt="" />
              </div>
            </div>
          )}
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
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-5 items-start w-full">
                        {formInHolder.map((fih, i) => (
                          <div
                            className="flex flex-col items-start gap-0 w-full capitalize"
                            key={i}
                          >
                            <label
                              className="text-label font-normal xl:text-lg text-base"
                              htmlFor={fih.for}
                            >
                              {fih.label}
                            </label>
                            <div className="w-full flex flex-col gap-1">
                              <input
                                className="border-b border-bdr w-full h-10 outline-none py-1 px-2 bg-transparent"
                                type={fih.type}
                                name={fih.name}
                                value={fih.value}
                                onChange={handleChange}
                              />
                              <p className="text-sm text-danger capitalize font-normal">
                                {error[fih.name]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {fgTxt && (
                        <div className="md:text-base text-sm font-normal capitalize">
                          <Link to="/reset-pass">{fgTxt}</Link>
                        </div>
                      )}
                      {btnText && (
                        <div className="w-full text-center capitalize text-lg text-white">
                          <button
                            className="bg-auth h-fit w-full rounded-md flex item-center justify-center py-3"
                            type="submit"
                          >
                            {loading ? (
                              <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
                            ) : (
                              <span>{btnText}</span>
                            )}
                          </button>
                        </div>
                      )}
                      {singleSubLink ? (
                        <div className="md:text-base text-sm font-[600] text-center text-blue-900">
                          <Link
                            to={link}
                            className="flex gap-1 items-center w-full justify-center"
                          >
                            <span className="text-gray-800 text-sm">
                              {subLink === "Sign up now" &&
                                'Don"t have an account'}
                              {subLink === "Login" &&
                                "Already have and account"}
                            </span>
                            {subLink}
                          </Link>
                        </div>
                      ) : (
                        <div className="md:text-base text-sm font-normal capitalize text-center flex justify-between">
                          {SubLink.map((lnk, i) => (
                            <Link to={lnk.link} key={i}>
                              {lnk.subLink}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
