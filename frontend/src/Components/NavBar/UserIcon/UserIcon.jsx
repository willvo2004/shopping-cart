import { FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const UserIcon = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          console.error("Error fetching user data:", response.statusText);
          console.log('nah, I ran!');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <IconContext.Provider value={{ className: "text-2xl", color: "black" }}>
      <div className="mr-8 hover:bg-slate-400 rounded-full flex justify-center items-center cursor-pointer">
        {/* Shopping bag icon */}
        <Link to={authenticated ? "user/profile" : "/user/signin"}>
          <FaUser />
        </Link>
      </div>
    </IconContext.Provider>
  );
};

export default UserIcon;
