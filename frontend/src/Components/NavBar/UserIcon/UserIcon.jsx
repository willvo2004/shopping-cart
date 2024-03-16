import { FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const UserIcon = () => {
  return (
    <IconContext.Provider value={{ className: "text-2xl", color: "black" }}>
      <div className="mr-8 hover:bg-slate-400 rounded-full flex justify-center items-center cursor-pointer">
        {/* Shopping bag icon */}
        <Link to="/user/signin">
            <FaUser />       
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default UserIcon;