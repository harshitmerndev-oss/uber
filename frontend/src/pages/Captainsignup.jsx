import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";

const Captainsignup = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [userdata, setuserdata] = useState({});
    const sumbithandler = (e) => {
      e.preventDefault();
      setuserdata({
        fullName: {
          firstname: firstname,
          lastname: lastname,
        },
        email: email,
        password: password,
      });
      setEmail("");
      setFirstname("");
      setLastname("");
      setPassword("");
    };

  return (
   <div className="p-7 h-screen flex flex-col justify-between ">
        <div>
          <img
            className="w-16 mb-10"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          ></img>
          <form onSubmit={(e) => sumbithandler(e)}>
            <h3 className="text-lg font-medium mb-2">What's our captain's name</h3>
            <div className="flex gap-3.5 ">
              <input
                className="border border-gray-400 bg-[#eeeeee] p-2 w-1/2 rounded-md mb-5 text-md placeholder:text-sm"
                required
                placeholder="Firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                className="border border-gray-400 bg-[#eeeeee] p-2 w-1/2 rounded-md mb-5 text-md placeholder:text-sm"
                required
                placeholder="Last name"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <h3 className="text-lg font-medium mb-2">What's our captain's email</h3>
            <input
              className="border border-gray-400 bg-[#eeeeee] p-2 w-full rounded-md mb-5  text-md placeholder:text-sm"
              required
              placeholder="email@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3 className="text-lg font-medium mb-2">Enter your password</h3>
            <input
              className="border border-gray-400 bg-[#eeeeee] p-2 w-full rounded-md mb-5 text-md placeholder:text-sm"
              required
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className=" text-white font-semibold bg-[#111] p-2 w-full rounded-md mb-2 text-md placeholder:text-sm">
              Login
            </button>
          </form>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>
        <div>
          <p className="text-[12px] leading-tight">
            This site is protected by reCAPTCHA and the Google{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service</span>
          </p>
        </div>
      </div>
  )
}

export default Captainsignup