import { createContext, ReactNode, useContext, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface IPropsUser {
  email: string;
  id: number;
  name: string;
  uuid: string;
}

type UserContextData = {
  handleUser(data: IPropsUser): void;
  user: IPropsUser;
};

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IPropsUser>({} as IPropsUser);

  const handleUser = (data: IPropsUser) => setUser(data);

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export const userContext = () => useContext(UserContext);
