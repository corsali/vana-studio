import { useEffect, useState, createContext, useContext } from "react";
import { parseJWT } from "./auth.service";

const getToken = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("authToken");
  }
};

const updateToken = (token) =>
  window.localStorage.setItem("authToken", token ?? "");

const AuthContext = createContext({
  token: getToken,
  setToken: updateToken,
  user: undefined,
});

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useAuth();
  const [token, setToken] = useState(auth.token);
  const [user, setUser] = useState();

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);

    const parsedToken = parseJWT(storedToken);
    if (parsedToken) {
      setUser({
        email: parsedToken.email,
      });
    }
  }, []);

  const value = {
    user,
    token,
    setToken: (newToken) => {
      setToken(newToken);
      updateToken(newToken);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}