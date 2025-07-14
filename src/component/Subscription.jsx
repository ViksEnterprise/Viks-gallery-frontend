import { useState } from "react";
import axios from "../service/axios";
import { Model } from "../component/Model/Modal";

export const Subscribe = () => {
  const [user_name, setUser_Name] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
  });
  const [toggleModal, setToggleModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setError({ ...error, [name]: undefined });
    setUser_Name(name === "name" ? value : user_name);
    setEmail(name === "email" ? value : email);
  };

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const subscribeSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const symbols = /[!@#$%^&*()?><:|~\`/,.]/;
    const symbol = /[!#$%^&*()]/;
    const number = /[0-9]/;

    if (!user_name) {
      err.user_name = "Field required";
    } else if (symbols.test(user_name) || number.test(user_name)) {
      err.user_name = "Invalid user name";
    } else if (!email) {
      err.email = "Field required";
    } else {
      const payload = {
        subscriber_full_name: user_name,
        subscriber_email: email,
      };

      const url = "subscription/subscribe";
      setLoader(true);

      try {
        const res = await axios.post(url, payload);
        if (res) {
          setModalMsg({
            message: `${res.data?.message}`,
            icon: "success",
          });
          setToggleModal(true);
        }
      } catch (err) {
        if (err) {
          if (err.response?.data?.[0]) {
            setModalMsg({
              message: `${err.response?.data[0]}`,
              icon: "error",
            });
            setToggleModal(true);
          } else if (err.response.data.non_field_errors?.[0]) {
            setModalMsg({
              message: `${err.response.data.non_field_errors?.[0]}`,
              icon: "error",
            });
            setToggleModal(true);
          } else {
            setModalMsg({
              message: `${err.message}`,
              icon: "error",
            });
            setToggleModal(true);
          }
        }
      } finally {
        setLoader(false);
      }
    }

    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
  };

  return (
    <>
      <section
        className="w-full py-5 px-3 lg:p-9"
      >
        <div className="flex gap-3 items-start flex-col">
          <div className="flex-initial w-full lg:w-1/3 flex flex-col gap-3">
            <h2 className="text-lg lg:text-xl font-semibold uppercase text-black">
              Join our mailing list
            </h2>
          </div>
          <div className="flex-1 w-full lg:w-4/5 lg:py-2 p-0">
            <form
              className="flex flex-row gap-2 items-start lg:items-center flex-col lg:flex-row"
              onSubmit={(e) => subscribeSubmit(e)}
            >
              <div className="w-full">
                <input
                  className="outline-none border-slate-400 border p-3 w-full lg:w-72 xl:w-96 rounded-lg"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  value={user_name}
                  onChange={(e) => handleChange(e)}
                />
                {error.user_name}
              </div>
              <div className="w-full">
                <input
                  className="outline-none border-slate-400 border p-3 w-full lg:w-72 xl:w-96 rounded-lg"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
                {error.email}
              </div>
              <div className="w-full">
                <button
                  className="bg-blue-800 text-white w-full lg:w-80 p-3 rounded-lg text-lg lg:text-xl font-normal flex items-center justify-center"
                  type="submit"
                >
                  {loader ? (
                    <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {toggleModal && (
        <Model
          modal={true}
          modalDisplay={toggleModal}
          icon={modalMsg.icon}
          message={modalMsg.message}
          buttonText="Ok"
          button={button}
        />
      )}
    </>
  );
};
