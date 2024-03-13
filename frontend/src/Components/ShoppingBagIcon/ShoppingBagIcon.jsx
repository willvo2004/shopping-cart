import { MdShoppingBag } from "react-icons/md";
import { IconContext } from "react-icons";

const ShoppingBagIcon = () => {
  return (
    <IconContext.Provider value={{ className: "text-2xl", color: "black" }}>
      <div className="mr-8 hover:bg-slate-400 rounded-full flex justify-center items-center cursor-pointer">
        {/* Shopping bag icon */}
        <MdShoppingBag />
      </div>
    </IconContext.Provider>
  );
};
export default ShoppingBagIcon;
