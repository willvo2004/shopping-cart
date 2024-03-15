import { NavLink } from "react-router-dom";
import ShoppingBagIcon from "../ShoppingBagIcon";

const NavBar = () => {
    // Array of objects representing each link
    const links = [
        { text: "WOMEN", to: "/shop/women" },
        { text: "MEN", to: "/shop/men" },
        { text: "BAGS & ACCESSORIES", to: "/shop/bags-accessories" },
        { text: "LUMIÈRE DE COUTURE", to: "/shop/lumiere-de-couture" }
    ];

    return (
        <nav className="flex justify-between items-center h-16 bg-white shadow-sm font-mono w-screen absolute top-0" role="navigation">
            <div className="nav-container">
                {links.map((link, index) => (
                    <NavLink key={link.text} to={link.to} className={index === links.length - 1 ? "m-8" : "m-8"}>
                        {link.text}
                    </NavLink>
                ))}
            </div>
            <ShoppingBagIcon />
        </nav>
    );
};

export default NavBar;
