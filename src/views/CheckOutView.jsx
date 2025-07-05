import { BiArrowBack, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { CartNav } from "../component/CartNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardComp } from "../component/card";
import axios, { axiosPrivate } from "../service/axios";
import { TbCurrencyNaira } from "react-icons/tb";

export const Checkout = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    cart: false,
    address: true,
    payment: false,
  });
  const [cart, setCart] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [year, setYear] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState({})
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    phone_number: "",
    alternative_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value})
    setError({...error, [name]: undefined})
  };

  const getCartItems = async () => {
    const url = `cart/`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setCart(response.data);
        console.log(cart);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCartSummary = async () => {
    const url = "cart/cart-summary";

    try {
      const res = await axiosPrivate.get(url);
      if (res) {
        setTotalPrice(res.data?.total_price);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCountry = async () => {
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`;
    try {
      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setCountries(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getState = async () => {
    const payload = { countrycode: "NG" };
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode`;
    try {
      const response = await axios.get(url, {
        params: payload,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setStates(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCity = async () => {
    const payload = { countrycode: "NG", statecode: "fl" };
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode`;
    try {
      const response = await axios.get(url, {
        params: payload,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setCities(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showContent = (key) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: !prevDetails[key],
    }));
  };

  const back = () => {
    navigate("/myCart");
  };

  useEffect(() => {
    const getCurrentYear = () => {
      let year;
      const date = new Date();
      const getYear = date.getFullYear();
      year = getYear;
      setYear(year);
    };

    getCurrentYear();

    getCartItems();
    // getCountry();
    // getState();
    // getCity();
    getCartSummary();
  }, []);

  return (
    <>
      <CartNav />
      <hr />
      <div className="w-full md:px-11 py-6 p-5 flex items-center">
        <div className="flex flex-col gap-4 items-start w-full">
          <div className="flex items-center justify-between w-full">
            <h5 className="text-[#09067C] font-[500] text-xl">Checkout</h5>
            <button
              className="flex items-center gap-1 text-sm font-[500]"
              type="button"
              onClick={back}
            >
              <BiArrowBack /> Back to cart
            </button>
          </div>
          <div className="w-full grid gap-3">
            <div
              className={
                details.cart
                  ? "h-fit w-full grid gap-3 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
                  : "h-16 overflow-hidden w-full grid gap-1 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
              }
            >
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-base m-0">Cart Item</h6>
                {details.cart ? (
                  <BiChevronUp
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("cart")}
                  />
                ) : (
                  <BiChevronDown
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("cart")}
                  />
                )}
              </div>
              <div className="w-full h-fit gap-2">
                {details.cart ? (
                  <CardComp
                    normalDiv={false}
                    swipe={false}
                    items={cart}
                    renderItem={(item) => (
                      <div className="flex flex-col lg:gap-2 gap-3 items-start w-full">
                        <div className="flex gap-2 flex-col w-full">
                          <div className="w-full rounded-[5px] h-28 overflow-hidden">
                            <img
                              src={item.product?.full_artwork_image}
                              className="w-full h-[inherit]"
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex flex-row justify-between items-center gap-1">
                              <span className="font-[500] text-xs">
                                {item.product.artwork_title}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    secStyle="p-0"
                    subSecStyle="md:w-[65%] w-full h-fit"
                    style="grid md:grid-cols-4 grid-cols-2 gap-2 items-start"
                    subStyle="w-full"
                  />
                ) : (
                  <div className="flex items-center gap-1 flex-wrap">
                    {cart.map((item) => (
                      <span className="font-[500] text-xs">
                        {item.product.artwork_title},
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className={
                details.address
                  ? "h-fit w-full grid gap-3 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
                  : "h-16 overflow-hidden w-full grid gap-1 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
              }
            >
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-base m-0">
                  Shipping Address
                </h6>
                {details.address ? (
                  <BiChevronUp
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("address")}
                  />
                ) : (
                  <BiChevronDown
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("address")}
                  />
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <form className="w-full">
                  <div className="w-full grid gap-3">
                    <div className="flex flex-col gap-2">
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="flex flex-col gap-1">
                          <input
                            className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                            placeholder="First name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={formData.first_name}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <input
                            className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                            placeholder="Last name"
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={formData.last_name}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <input
                          className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                          placeholder="Address"
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={formData.address}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="flex flex-col gap-1 w-full h-11">
                          <select
                            className="h-[inherit] w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm text-slate-400 rounded-[7px] p-2"
                            name="countries"
                            id="select"
                            
                          >
                            <option value="select">Select your country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country.isoCode}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 w-full h-11">
                          <select
                            className="h-[inherit] w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm text-slate-400 rounded-[7px] p-2"
                            name=""
                            id=""
                          >
                            <option value="select">Select your state</option>
                            {states.map((state, index) => (
                              <option key={index} value={state.name}>
                                {state.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="flex flex-col gap-1 w-full h-11">
                          <select
                            className="h-[inherit] w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm text-slate-400 rounded-[7px] p-2"
                            name="cities"
                            id="select"
                          >
                            <option value="select">Select your city</option>
                            {cities.map((city, index) => (
                              <option key={index} value={city.name}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 w-full h-11">
                          <input
                            className="h-[inherit] w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm text-slate-400 rounded-[7px] p-2"
                            placeholder="Zip code"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                        <div className="flex flex-col gap-1">
                          <input
                            className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                            placeholder="Phone number"
                            type="tel"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <input
                            className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                            placeholder="Alternative phone number"
                            type="tel"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="h-11 rounded-[7px] p-2 bg-blue-800 md:w-3/6 w-full text-white font-semibold text-base"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className={
                details.payment
                  ? "h-fit w-full grid gap-3 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
                  : "h-10 w-full grid gap-3 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200 overflow-hidden"
              }
            >
              <div className="flex justify-between items-center w-full">
                <h6 className="font-semibold text-base m-0">Payment Type</h6>
                {details.payment ? (
                  <BiChevronUp
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("payment")}
                  />
                ) : (
                  <BiChevronDown
                    className="size-6 cursor-pointer"
                    onClick={() => showContent("payment")}
                  />
                )}
              </div>
              <div className="w-full flex md:items-center md:flex-row flex-col items-start md:justify-center md:gap-4 gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    className="h-3 w-3 cursor-pointer"
                    name="Debit or credit card"
                  />
                  <label
                    className="font-semibold text-sm"
                    htmlFor="Debit or credit card"
                  >
                    Debit or credit card
                  </label>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    className="h-3 w-3 cursor-pointer"
                    name="paypal"
                  />
                  <label className="font-semibold text-sm" htmlFor="paypal">
                    Paypal
                  </label>
                </div>
              </div>
            </div>
            <div>
              <CardComp
                title="Order summary"
                normalDiv={true}
                titleStyle="text-base font-semibold capitalize"
                renderItem={
                  <div className="flex flex-col gap-1 items-start w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col gap-2 items-start">
                        <div className="flex items-center justify-between w-full text-sm">
                          <span className="text-sm">Subtotal</span>
                          <span className="flex items-center gap-[2px]">
                            <TbCurrencyNaira /> {totalPrice}
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-full capitalize">
                          <span className="text-sm text-[#6B6B6B]">
                            Shipping
                          </span>
                          <span className="text-sm text-[#6B6B6B]">
                            included
                          </span>
                        </div>
                        <div className="flex items-center justify-between w-full text-sm">
                          <span className="text-sm">Total</span>
                          <span className="flex items-center gap-[2px]">
                            <TbCurrencyNaira /> {totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                secStyle="p-0"
                subSecStyle="w-full shadow-md shadow-slate-400 h-fit flex items-start w-full p-3 rounded-[5px] border-slate-300 border-solid border-[1px] flex-col gap-2"
                style="w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              className="h-11 rounded-[7px] p-2 bg-blue-800 md:w-3/6 w-full text-white font-semibold text-base"
              type="button"
            >
              Place order
            </button>
          </div>
          <div className="flex w-full md:p-9 p-0 items-center">
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="text-lg uppercase w-full text-center font-[500]">
                <h4>Need more help?</h4>
              </div>
              <div className="w-full flex md:flex-row flex-col md:gap-5 gap-3 items-center justify-center">
                <button
                  type="button"
                  className="h-12 text-white rounded-[6px] flex items-center bg-blue-800 lg:w-1/4 md:w-[38%] w-full justify-center test-base font-[500]"
                >
                  Chat with an art advisory
                </button>
                <a
                  href="/contact"
                  className="h-12 text-decoration-none rounded-[6px] flex items-center border-blue-800 border lg:w-1/4 md:w-[38%] w-full justify-center test-base font-[500]"
                >
                  Contact customer support
                </a>
              </div>
            </div>
          </div>
          <footer className="flex md:flex-row flex-col-reverse w-full md:justify-between gap-2">
            <div className="lg:text-base text-sm">
              <p>{year} Viks Gallery - All Rights Reserved</p>
            </div>
            <div className="flex flex-col gap-3 items-start">
              <ul className="md:p-auto p-0 font-normal flex gap-2 uppercase">
                <li>
                  <a className="no-underline md:text-sm text-xs" href="#">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a className="no-underline md:text-sm text-xs" href="#">
                    Cookie policy
                  </a>
                </li>
                <li>
                  <a className="no-underline md:text-sm text-xs" href="#">
                    Term of use
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
