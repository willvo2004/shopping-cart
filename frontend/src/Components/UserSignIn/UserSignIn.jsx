import { useState } from "react";
import { Link } from "react-router-dom";

const UserSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      
      if (response.ok) {
        // const data = await response.json();
        window.location.href = "/";
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-6 m-6 bg-slate-500 bg-opacity-35 w-1/2"
      >
        <h1 className="font-bold my-4">LOGIN</h1>
        <p className="text-white">
          Log in with your email address and password
        </p>
        <div className="flex flex-col my-4">
          <label>EMAIL ADDRESS</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size={70}
            placeholder="Enter a valid email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>PASSWORD</label>
          <input
            className="p-2 text-sm bg-white text-black border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="my-4">
          LOG IN
        </button>
      </form>
      <div className="flex flex-col p-6 m-6 bg-slate-500 bg-opacity-35 w-1/2">
        <h1 className="font-bold mb-8">CREATE AN ACCOUNT</h1>
        <div>
          <p className="text-white ml-1">
            If you create an account, it takes less time to go through checkout
            and complete your orders. Register today for free!
          </p>
        </div>
        <Link
          to="/user/register"
          className="bg-black px-4 py-4 mt-4 w-fit text-white hover:text-white hover:bg-slate-800"
        >
          CREATE ACCOUNT
        </Link>
      </div>
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-300 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="fixed bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#96d7e0,transparent)]"></div>
      </div>
    </div>
  );
};

export default UserSignIn;
