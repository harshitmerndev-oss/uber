import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userdata,setuserdata]=useState({});
  const sumbithandler = (e) => {
    e.preventDefault();
    
    setuserdata({
      email:email,
      password:password
    })
    console.log(userdata);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        ></img>
        <form onSubmit={(e) => sumbithandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="border border-gray-400 bg-[#eeeeee] p-2 w-full rounded-md mb-4 text-md placeholder:text-sm"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter your password</h3>
          <input
            className="border border-gray-400 bg-[#eeeeee] p-2 w-full rounded-md mb-5 text-md placeholder:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className=" text-white font-semibold bg-[#111] p-2 w-full rounded-md mb-2 text-md placeholder:text-sm">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className=" text-white font-semibold flex items-center justify-center bg-[#10b461] p-2 w-full rounded-md mb-4 text-md placeholder:text-sm">
          Sign in as captain
        </Link>
      </div>
    </div>
  );
};

export default userlogin;
