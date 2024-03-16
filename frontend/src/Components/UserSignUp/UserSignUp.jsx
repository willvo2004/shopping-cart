import { useState } from "react";
import NavBar from "../NavBar";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthdate, setBirthday] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, postalCode, birthdate }),
      });

      if (response.ok) {
        window.location.href = "/user/signin";
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <h1 className="font-semibold font-mono m-6">CREATE AN ACCOUNT</h1>
      </div>
      <form
        className="flex flex-col p-6 m-6 bg-slate-500 bg-opacity-35 w-fit"
        onSubmit={handleRegister}
      >
        <div className="flex items-center gap-12 my-4">
          <label className="inline-block w-36">E-MAIL ADDRESS</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={80}
            placeholder="Enter a valid email"
            required
          />
        </div>
        <div className="flex items-center gap-12 my-4">
          <label className="inline-block w-36">PASSWORD</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size={80}
            required
          />
        </div>
        <div className="flex items-center gap-12 my-4">
          <label className="inline-block w-36">POSTAL CODE</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            size={80}
            placeholder="Enter a valid postal code"
            required
          />
        </div>
        <div className="flex items-center gap-12 my-4">
          <label className="inline-block w-36">BIRTHDAY</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthday(e.target.value)}
            size={80}
            placeholder="Enter a valid email"
            required
          />
        </div>
        <button type="submit" className="my-4">
          REGISTER
        </button>
      </form>
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#96d7e0,transparent)]"></div>
      </div>
    </>
  );
};

export default UserSignUp;
