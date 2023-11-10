import React, { useState, createContext, useContext } from 'react';
// import { useNavigate } from "react-router-dom";
import { setCommonAuthorizationToken } from '../utils/axiosUtility';
import { authServiceObj } from '../services/authServices';

const AuthContext = createContext(null);
const localStorageKey = 'userData';

export const setSessionUserData = (userData) => {
  localStorage.setItem(localStorageKey, JSON.stringify(userData));
};

const getSessionUserData = () => {
  return JSON.parse(localStorage.getItem(localStorageKey));
};

export const logout = () => {
  localStorage.removeItem(localStorageKey);
  window.location.href="/login"
};

export const AuthProvider = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [userData, setUserData] = useState(null);
  // const navigate = useNavigate();


  React.useEffect(() => {
    const sessionUserData = getSessionUserData();

    if (sessionUserData) {
      setUserData(() => sessionUserData);
      setAuthed(() => true);
     
    } else {
      setAuthed(() => false);
      setUserData(() => null);
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async ( username, password ) => {
    const response = await authServiceObj.login({username,password})
    const loginResponse = {
      success: false,
      error: false,
    };


    if (response.ok) {
      const userData = response.data;
      setSessionUserData(userData);
      setUserData(() => userData);
      setAuthed(() => true);
      setCommonAuthorizationToken(userData?.token);
      loginResponse.success = true;
    } else {
      loginResponse.error = true;
    }
    return loginResponse;
  };



  const logout = () => {
    setAuthed(false);
    localStorage.removeItem(localStorageKey);
    setUserData(null);
    // navigate("'/login'")
  };

 
  return (
    <AuthContext.Provider
      value={{
        authed,
        setAuthed,
        login,
        logout,
        userData,
        setUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext);
