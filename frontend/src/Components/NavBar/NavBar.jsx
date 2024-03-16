import { Link, NavLink } from "react-router-dom";
import ShoppingBagIcon from "./ShoppingBagIcon";
import logo from "./Fashionlogo.png";  
import UserIcon from "./UserIcon/UserIcon";

const NavBar = () => {
  // Array of objects representing each link
  const links = [
    { text: "WOMEN", to: "/shop/women" },
    { text: "MEN", to: "/shop/men" },
    { text: "BAGS & ACCESSORIES", to: "/shop/bags-accessories" },
    { text: "LUMIÈRE DE COUTURE", to: "/shop/lumiere-de-couture" },
  ];

  return (
    <nav
      className="flex justify-between items-center h-16 bg-white shadow-sm font-mono w-screen absolute top-0"
      role="navigation"
    >
      <div className="nav-container flex items-center">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" className="size-12 ml-20 mr-8" />{" "}
        </Link>
        {links.map((link, index) => (
          <NavLink
            key={link.text}
            to={link.to}
            className={index === links.length - 1 ? "m-8" : "m-8"}
          >
            {link.text}
          </NavLink>
        ))}
        <div className="flex absolute right-8">
          <UserIcon />
          <ShoppingBagIcon />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
