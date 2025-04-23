import { User } from "@/types/types";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { userService } from "@/services/userService";

interface ProfileContexType {
  profile: User | null;
  userLogin: (user: User) => void;
  userLogout: () => void;
  isAuthenticate: boolean;
  isCurrentUser: (id: string | undefined) => boolean;
  updateProfile: (data: any) => Promise<void>;
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
  const [isAuthenticate, setIsAuthenticate] = useState(false);

  useEffect(() => {
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      setProfile(JSON.parse(storageUser));
      setIsAuthenticate(true);
    }
  }, []);

  const userLogin = (user: User) => {
    setProfile(user);
    setIsAuthenticate(true);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = localStorage.getItem("redirectAfterLogin") || "/";
  };

  const userLogout = () => {
    setProfile(null);
    setIsAuthenticate(false);
    localStorage.removeItem("user");
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = "/";
  };

  const isCurrentUser = (id: string | undefined): boolean => profile?.id === id;

  const updateProfile = async (): Promise<void> => {
    if (!profile) return;

    try {
      const updatedProfile = await userService.getUsersById(profile.id);

      setProfile(updatedProfile);
      localStorage.setItem("user", JSON.stringify(updatedProfile));
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        userLogin,
        userLogout,
        isCurrentUser,
        isAuthenticate,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
