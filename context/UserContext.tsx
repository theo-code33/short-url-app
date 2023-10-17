import { User, UserCtx } from "@/types";
import { ReactNode, createContext, useState } from "react";

const UserContext = createContext({} as UserCtx);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({} as User);
  const [token, setToken] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
