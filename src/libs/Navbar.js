import { BiBox } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineCollections } from "react-icons/md";

const NAVLINKS = [
  { link: "home", to: "/" },
  { link: "about", to: "/about" },
  { link: "news", to: "/blog" },
  { link: "gallery", to: "/art-gallery" },
  { link: "career", to: "/career" },
  { link: "contact", to: "/contact" },
];

const SIDENAVLINKS = [
  {
    link: "collections",
    to: "/dashboard/collections",
    icon: MdOutlineCollections,
  },
  { link: "orders", to: "/dashboard/orders", icon: BiBox },
  { link: "shipments", to: "/dashboard/shipments", icon: BsTruck },
  { link: "Users", to: "/dashboard/users", icon: FaUsers },
];

const BUTTON = "login";

export { NAVLINKS, BUTTON, SIDENAVLINKS };
