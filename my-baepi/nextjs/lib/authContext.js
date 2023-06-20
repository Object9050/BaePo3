import { useEffect, useState, createContext, useContext } from "react";
import { getUserFromLocalCookie } from "./auth";

// Creates a context (react-function) with initial value of undefined
const UserContext = createContext();

// the UserProvider component initializes the user state and fetches the user 
// data using the getUserFromLocalCookie function. It then provides the user 
// value to its descendant components using the UserContext.Provider component.
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedUser = getUserFromLocalCookie();
    setUser(fetchedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

// Custom 'Consumer'-hook of/for the created context to make user from 
// userContext available in other components
export const useUser = () => useContext(UserContext);

// Custom hook that fetches user data and manages the state of the user. 
// It returns the userState object, which contains the user data.
export const useFetchUser = () => {
  const [userState, setUserState] = useState({
    user: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = getUserFromLocalCookie();
      setUserState({ user });
    };

    fetchUser();
  }, []);

  return userState;
};
