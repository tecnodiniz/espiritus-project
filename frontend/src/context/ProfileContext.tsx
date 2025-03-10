import { User } from "@/types/types";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ProfileContexType {
  profile: User | null;
  userLogin: (user: User) => void;
  userLogout: () => void;
}

const ProfileContext = createContext<ProfileContexType | undefined>(undefined);

export const useProfile = (): ProfileContexType => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) setProfile(JSON.parse(storageUser));
  }, []);

  const userLogin = (user: User) => {
    setProfile(user);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = localStorage.getItem("redirectAfterLogin") || "/";
  };

  const userLogout = () => {
    setProfile(null);
    localStorage.removeItem("user");
    localStorage.removeItem("redirectAfterLogin");
  };

  return (
    <ProfileContext.Provider value={{ profile, userLogin, userLogout }}>
      {children}
    </ProfileContext.Provider>
  );
};
