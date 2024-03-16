import { MdShoppingBag } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const ShoppingBagIcon = () => {
  return (
    <IconContext.Provider value={{ className: "text-2xl", color: "black" }}>
      <div className="mr-8 hover:bg-slate-400 rounded-full flex justify-center items-center cursor-pointer">
        {/* Shopping bag icon */}
        <Link to="/cart">
          <MdShoppingBag />        
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default ShoppingBagIcon;
