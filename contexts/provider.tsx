"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type Link = {
  id: string;
  platform: string;
  url: string;
  [key: string]: string;
};

type User = {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
};

const defaultState = {
  user: null,
  setUser: (user: any) => {},
  userLinks: [],
  setUserLinks: () => {},
  userInfo: {
    userId: "",
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  },
  setUserInfo: (info: {}) => {},
};

const UserContext = createContext<{
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  userLinks: Link[];
  setUserLinks: Dispatch<SetStateAction<Link[]>>;
  userInfo: {
    userId: string;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  };
  setUserInfo: Dispatch<SetStateAction<User>>;
}>(defaultState);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<any>(null);
  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const [userInfo, setUserInfo] = useState<User>({
    userId: "",
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  return (
    <UserContext.Provider
      value={{ user, setUser, userLinks, setUserLinks, userInfo, setUserInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};
