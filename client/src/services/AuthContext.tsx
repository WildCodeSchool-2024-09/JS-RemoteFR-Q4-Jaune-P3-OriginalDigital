import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
  subscription: boolean;
  setSubscription: (subscription: boolean) => void;
}

const authContext = createContext<AuthProps>({
  role: "anonymous",
  setRole: () => {},
  subscription: false,
  setSubscription: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");
  const [subscription, setSubscription] = useState(
    localStorage.getItem("subscription") === "true",
  );

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem("subscription", String(subscription));
  }, [subscription]);

  return (
    <authContext.Provider
      value={{ role, setRole, subscription, setSubscription }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
