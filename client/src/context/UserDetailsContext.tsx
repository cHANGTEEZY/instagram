import { createContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "@/constants/url";

// Define the shape of the user details
type UserDetails = {
  bio: string;
  profilePicLink: string;
  birthDate: Date;
  gender: string;
  location: string;
};

const UserContext = createContext<{
  userDetails: UserDetails | null;
  error: string | null;
}>({
  userDetails: null,
  error: null,
});

export const UserDetailsProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("userAuthToken");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/user-detail`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data) {
          throw new Error("Error getting user details");
        }
        setUserDetails(response.data);
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        console.error("Error fetching user details:", errorMessage);
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      setError("No authentication token found");
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ userDetails, error }}>
      {children}
    </UserContext.Provider>
  );
};
