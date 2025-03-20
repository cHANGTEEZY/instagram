import { createContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AuthenticateContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthenticateProviderProps {
  children: ReactNode;
}

export const AuthenticateProvider: React.FC<AuthenticateProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("userAuthToken"));
  });

  useEffect(() => {
    const token = localStorage.getItem("userAuthToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthenticateContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateContext;
