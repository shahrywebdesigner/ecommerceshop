import React, {useEffect, useState } from 'react'
import {AuthContext} from './AuthContext'
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
      const savedUser = localStorage.getItem("User");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }, []);

    const login = (userData)=>{
      setUser(userData);
      localStorage.setItem("User", JSON.stringify(userData))  
    }
    const logOut = ()=>{
        setUser(null);
        localStorage.removeItem("User");
    }
  return (
    <AuthContext.Provider value={{user,login,logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
