import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";


const Captainlogin = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captaindata,setcaptaindata]=useState({});
    const sumbithandler = (e) => {
      e.preventDefault();
      
      setcaptaindata({
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
            className="w-20 mb-8"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
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
            join a fleet ?{" "} 
            <Link to="/captain-signup" className="text-blue-600">
              register as a captain
            </Link>
          </p>
        </div>
        <div>
          <Link to="/login" className=" text-white font-semibold flex items-center justify-center bg-[#d5622d] p-2 w-full rounded-md mb-4 text-md placeholder:text-sm">
            Sign in as User
          </Link>
        </div>
      </div>
  )
}

export default Captainlogin