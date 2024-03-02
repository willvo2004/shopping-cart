import { Link } from "react-router-dom";

const NavBar = () => {
    // Array of objects representing each link
    const links = [
        { text: "WOMEN", to: "/shop/women" },
        { text: "MEN", to: "/shop/men" },
        { text: "BAGS & ACCESSORIES", to: "/shop/bags-accessories" },
        { text: "LUMIÈRE DE COUTURE", to: "/shop/lumiere-de-couture" }
    ];

    return (
        <nav className="flex justify-between items-center h-16 bg-white relative shadow-sm font-mono" role="navigation">
            <div className="nav-container">
                {links.map((link, index) => (
                    <Link key={link.text} to={link.to} className={index === links.length - 1 ? "pr-8" : "p-8"}>
                        {link.text}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
