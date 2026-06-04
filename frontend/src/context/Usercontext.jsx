import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'

export const UserContext = createContext(); //creating userdatacontext
const Usercontext = ({children}) => {
    const [user,setUser] = useState({
        email: "",
        fullName: {
            firstname: "",
            lastname: ""
        }
    });
  return (
    <div>
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    </div>
  )
}

export default Usercontext