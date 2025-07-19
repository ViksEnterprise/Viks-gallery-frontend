import {
  BiArrowBack,
  BiChevronDown,
  BiChevronUp,
  BiPound,
} from "react-icons/bi";
import { CartNav } from "../component/CartNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CardComp } from "../component/CardModal";
import axios, { axiosPrivate } from "../service/axios";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Model } from "../component/Model/Modal";

export const Checkout = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
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
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [address, setAddress] = useState([]);
  const [modalMsg, setModalMsg] = useState({
    message: "",
    icon: "",
  });
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    phone_number: "",
    alternative_phone_number: "",
  });
  const [conDisable, setConDisable] = useState(true);
  const [type, setType] = useState({
    card_details: false,
    paypal: false,
    payment_address_id: "",
  });
  const [payment_url, setPayment_URL] = useState("");
  const [typeDisable, setTypeDisable] = useState(true);

  const paymentType = [
    {
      type: "payment",
      name: "Debit or credit card",
      name_type: "card_details",
    },
    {
      type: "payment",
      name: "PayPal",
      name_type: "paypal",
    },
  ];

  const button = () => {
    setToggleModal(false);
    document.body.style.overflow = "auto";
  };

  const handleTypeChange = (selectedKey) => {
    const newType = {
      card_details: selectedKey === "card_details",
      paypal: selectedKey === "paypal",
      payment_address_id: address?.[0]?.payment_address_ID || "",
    };
    setType(newType);
    payment_Type(newType);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "country") {
      const select = countries.find((c) => c.name === value);
      setSelectedCountry(select?.isoCode);
      getState(select?.isoCode);
    }

    if (name == "state") {
      const select = states.find((s) => s.name === value);
      getCity(select?.isoCode);
    }

    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: undefined });
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone_number: value,
    }));
    setError((prev) => ({
      ...prev,
      phone_number: undefined,
    }));
  };

  const handleAlternatePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      alternative_phone_number: value,
    }));
    setError((prev) => ({
      ...prev,
      alternative_phone_number: undefined,
    }));
  };

  const checkFieldState = () => {
    const filled = Object.values(formData).filter((val) => val == "").length;
    setDisable(filled == 1);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    const alpha = /[a-z, A-Z]/g;
    const symbol = /[!@#$%-+=_^&*()'><]/;
    const number = /[0-9]/;

    if (!formData.first_name) {
      err.first_name = "Name field required";
    } else if (
      symbol.test(formData.first_name) ||
      number.test(formData.first_name)
    ) {
      err.first_name = "No digit and symbols allowed";
    } else if (!formData.last_name) {
      err.last_name = "Name field required";
    } else if (
      symbol.test(formData.last_name) ||
      number.test(formData.last_name)
    ) {
      err.last_name = "No digit and symbols allowed";
    } else if (!formData.address) {
      err.address = "Address field required";
    } else if (symbol.test(formData.address)) {
      err.address = "No symbols allowed";
    } else if (!formData.country) {
      err.country = "Field required";
    } else if (symbol.test(formData.state)) {
      err.state = "Field required";
    } else if (!formData.city) {
      err.city = "Field required";
    } else if (!formData.zip_code) {
      err.zip_code = "Field required";
    } else if (symbol.test(formData.zip_code)) {
      err.zip_code = "No symbols allowed";
    } else if (!formData.phone_number) {
      err.phone_number = "Field required";
    } else if (
      formData.phone_number &&
      !isValidPhoneNumber(formData.phone_number)
    ) {
      err.phone_number = "Invalid phone number";
    } else if (
      formData.alternative_phone_number &&
      !isValidPhoneNumber(formData.alternative_phone_number)
    ) {
      err.alternative_phone_number = "Invalid phone number";
    } else {
      const url = "payments/payment-address";

      const payload = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== "")
      );

      setLoader(true);

      try {
        const response = axiosPrivate.post(url, payload);
        if (response) {
          getAddress();
          setModalMsg({
            message: "Address saved successfully",
            icon: "success",
          });
          setToggleModal(true);
        }
      } catch (err) {
        return;
      } finally {
        setLoader(false);
      }
      return;
    }

    if (Object.keys(err).length > 0) {
      setError(err);
      return;
    }
  };

  const payment_Type = async (typeData) => {
    if (!typeData.card_details && !typeData.paypal) {
      setModalMsg({
        message: "Opps try again",
        icon: "error",
      });
      setToggleModal(true);
    } else if (address.length == 0) {
      setModalMsg({ message: "Fill in your address", icon: "error" });
      setToggleModal(true);
    } else if (typeData.paypal) {
      setModalMsg({
        message: "Payment type is not available at the moment",
        icon: "error",
      });
      setToggleModal(true);
    } else {
      const url = `payments/payment-type`;
      const payload = {
        ...typeData,
      };

      try {
        const res = await axiosPrivate.patch(url, payload);
        if (res) {
          getPaymentLink();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getCartItems = async () => {
    const url = `cart/`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setCart(response.data);
      }
    } catch (err) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const getAddress = async () => {
    const url = `payments/get-payment-address`;
    try {
      const response = await axiosPrivate.get(url);
      if (response) {
        setAddress(response.data);
        setOrderDisable(false);
      }
    } catch (err) {
      return;
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
      return;
    }
  };

  const getCountry = async () => {
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`;
    try {
      const response = await axios.get(url, {
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VKIS_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setCountries(response.data);
      }
    } catch (err) {
      return;
    }
  };

  const getState = async (id) => {
    const payload = { countrycode: id };
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode`;
    try {
      const response = await axios.get(url, {
        params: payload,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VKIS_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setStates(response.data);
      }
    } catch (err) {
      return;
    }
  };

  const getCity = async (id) => {
    const payload = { countrycode: selectedCountry, statecode: id };
    const url = `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode`;
    try {
      const response = await axios.get(url, {
        params: payload,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VKIS_RAPID_API_KEY,
          "X-RapidAPI-Host":
            "country-state-city-search-rest-api.p.rapidapi.com",
        },
      });
      if (response) {
        setCities(response.data);

        console.log(formData.country);
      }
    } catch (err) {
      return;
    }
  };

  const getPaymentLink = async () => {
    const url = `payments/pay-by-stripe`;
    const payload = {
      cart_id: cart?.[0].cart_id,
    };
    setConDisable(true);
    setTypeDisable(true);
    try {
      const response = await axiosPrivate.post(url, payload);
      if (response) {
        setPayment_URL(response.data.checkout_url);
        setConDisable(false);
        setTypeDisable(true);
      }
    } catch (err) {
      return;
    }
  };

  const placeOrder = () => {
    window.location = `${payment_url}`;
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

    if (address.length == 0) {
      getCountry();
    }

    getCurrentYear();
    getCartItems();
    getCartSummary();
    getAddress();
  }, []);

  useEffect(() => {
    if (!loading) {
      const token = sessionStorage.getItem("MVtoken");
      if (token && cart.length === 0) {
        navigate("/art-gallery");
      }
    }

    checkFieldState();
  }, [formData]);

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
                    {cart.map((item, i) => (
                      <span className="font-[500] text-xs" key={i}>
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
                  : "h-10 overflow-hidden w-full grid gap-1 p-2 rounded-[7px] shadow-md border-[1px] border-slate-200"
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
                {address.length > 0 ? (
                  <div className="flex flex-col lg:gap-2 gap-3 items-start w-full">
                    <div className="flex gap-2 flex-col w-full">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex flex-row justify-between items-center gap-1">
                          <span className="font-[500] text-xs">
                            {address?.[0].address}, {address?.[0].city},{" "}
                            {address?.[0].state} state, {address?.[0].country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form
                    className="w-full"
                    onSubmit={(e) => handleAddressSubmit(e)}
                  >
                    <div className="w-full grid gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1">
                            <input
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-[black!important]"
                              placeholder="First name"
                              type="text"
                              name="first_name"
                              onChange={(e) => handleChange(e)}
                              value={formData.first_name}
                            />
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.first_name}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <input
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                              placeholder="Last name"
                              type="text"
                              name="last_name"
                              onChange={(e) => handleChange(e)}
                              value={formData.last_name}
                            />
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.last_name}
                            </p>
                          </div>
                        </div>
                        <div className="w-full">
                          <input
                            className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                            placeholder="Address"
                            type="text"
                            name="address"
                            onChange={(e) => handleChange(e)}
                            value={formData.address}
                          />
                          <p className="text-xs font-semibold text-red-500 m-0">
                            {error.address}
                          </p>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1 w-full">
                            <select
                              className=" h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2"
                              name="country"
                              value={formData.country}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="select" className="text-slate-400">
                                Select your country
                              </option>
                              {countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.country}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <select
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2"
                              name="state"
                              value={formData.state}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="select" className="text-slate-400">
                                Select your state
                              </option>
                              {states.map((state, index) => (
                                <option key={index} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.state}
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1 w-full">
                            <select
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2"
                              name="city"
                              value={formData.city}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="select" className="text-slate-400">
                                Select your city
                              </option>
                              {cities.map((city, index) => (
                                <option key={index} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.city}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <input
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm text-black placeholder:text-slate-400 rounded-[7px] p-2"
                              placeholder="Zip code"
                              name="zip_code"
                              type="number"
                              value={formData.zip_code}
                              onChange={(e) => handleChange(e)}
                            />
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.zip_code}
                            </p>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                          <div className="flex flex-col gap-1">
                            <PhoneInput
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                              placeholder="Phone number"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handlePhoneChange}
                              defaultCountry={`${selectedCountry}`}
                            />
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.phone_number}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <PhoneInput
                              className="h-11 w-full outline-slate-300 outline-[1px] border-[1px] border-slate-300 text-sm rounded-[7px] p-2 text-black"
                              placeholder="Alternative phone number"
                              name="alternative_phone_number"
                              value={formData.alternative_phone_number}
                              onChange={handleAlternatePhoneChange}
                              defaultCountry={`${selectedCountry}`}
                            />
                            <p className="text-xs font-semibold text-red-500 m-0">
                              {error.alternative_phone_number}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        className={
                          disable
                            ? "h-11 rounded-[7px] p-2 bg-blue-800 md:w-3/6 w-full text-white font-semibold text-base"
                            : "h-11 rounded-[7px] p-2 bg-blue-100 md:w-3/6 w-full text-white font-semibold text-base flex items-center justify-center"
                        }
                        type="submit"
                        disabled={!disable}
                      >
                        {loader ? (
                          <span className="border-white border-t-transparent border-b-solid border-[3px] rounded-full h-7 w-7 animate-spin flex"></span>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </form>
                )}
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
                {paymentType.map((name, i) => (
                  <div className="flex items-center gap-1" key={i}>
                    <input
                      type="radio"
                      className="h-3 w-3 cursor-pointer"
                      name={name.type}
                      value={name.name_type}
                      checked={type[name.name_type]}
                      onChange={() => handleTypeChange(name.name_type)}
                      disabled={address.length == 0 || !typeDisable}
                      id={name.name_type}
                    />
                    <label
                      className="font-semibold text-sm cursor-pointer"
                      htmlFor={name.name_type}
                    >
                      {name.name}
                    </label>
                  </div>
                ))}
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
                            <BiPound /> {totalPrice}
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
                            <BiPound /> {totalPrice}
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
              className={
                conDisable
                  ? "h-11 rounded-[7px] p-2 bg-blue-100 md:w-3/6 w-full text-white font-semibold text-base"
                  : "h-11 rounded-[7px] p-2 bg-blue-800 md:w-3/6 w-full text-white font-semibold text-base"
              }
              type="button"
              disabled={conDisable}
              onClick={() => placeOrder()}
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
