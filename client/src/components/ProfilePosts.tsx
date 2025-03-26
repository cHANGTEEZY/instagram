import { profileImages } from "@/constants/profilePosts";

const ProfilePosts = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid gap-1 max-w-[80%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {profileImages.map((post, index) => (
          <img
            key={index}
            src={post.image}
            alt={`Post ${index + 1}`}
            className="w-full h-auto aspect-square object-cover "
          />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
