import ProfileStoryCarousel from "./ProfileStoryCarouse";
import ProfilePosts from "./ProfilePosts";
import ProfileHeader from "./ProfilHeader";

const Profile = () => {
  return (
    <div className=" overflow-auto h-full">
      <ProfileHeader />
      <ProfileStoryCarousel />
      <ProfilePosts />
    </div>
  );
};

export default Profile;
