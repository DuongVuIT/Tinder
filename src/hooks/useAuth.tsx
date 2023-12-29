import { auth } from "@config/firebase";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
type AuthProviderProps = {
  children: React.ReactNode;
};
const AuthContext = createContext({});
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);
  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };
  const memoValue = useMemo(() => {
    return { user, setUser, logout };
  }, [user]);
  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  );
};
export default function useAuth() {
  return useContext(AuthContext);
}
