import React from 'react';
import { FaUser } from "react-icons/fa";
import { IconContext } from "react-icons";
import * as HoverCard from '@radix-ui/react-hover-card';

const RadixHoverCard = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/";
        console.log(response.status);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className="inline-block cursor-pointer rounded-full shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] outline-none focus:shadow-[0_0_0_2px_white]"
        href="user/profile"
        rel="noreferrer noopener"
      >
        <IconContext.Provider value={{ className: "text-2xl", color: "black" }}>
        <FaUser />
        </IconContext.Provider>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        sideOffset={5}
      >
        <div className="flex flex-col gap-[7px]">
            <a href="user/profile" className="text-black hover:text-slate-800">
                Profile
            </a>
            <a href="user/profile" className="text-black hover:text-slate-800">
                Orders
            </a>
            <a href="user/profile" className="text-black hover:text-slate-800">
                Settings
            </a>
            <a onClick={handleLogout} href="/" className="text-black hover:text-slate-800">
                Sign out
            </a>
        </div>

        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
  );
  };

export default RadixHoverCard;