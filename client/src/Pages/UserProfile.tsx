import Profile from "@/components/Profile";
import SideNav from "@/components/SideNav";

const UserProfile = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="border flex-1">
        <Profile />
      </div>
    </div>
  );
};

export default UserProfile;
