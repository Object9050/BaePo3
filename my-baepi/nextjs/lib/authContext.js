import { useEffect, useState, createContext, useContext } from "react";
import { getUserFromLocalCookie } from "./auth";

const UserContext = createContext();

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

// Custom hook to make user from userContext available outside of this component
export const useUser = () => useContext(UserContext);

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
