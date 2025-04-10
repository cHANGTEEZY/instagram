import axios from "axios";
import { useEffect, useState, useRef } from "react";

// Define types for posts
interface Post {
  post_id: string;
  content_url: string;
  created_at: string;
  username: string;
}

const ProfilePosts = () => {
  const [allUserPosts, setAllUserPosts] = useState<Post[]>([]);
  const lastPostRef = useRef<HTMLDivElement | null>(null); // Fix ref typing

  useEffect(() => {
    const token = localStorage.getItem("userAuthToken");
    if (!token) {
      return;
    }

    const getAllUserPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/post/get-user-posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          throw new Error("Error getting user posts");
        }

        setAllUserPosts(response.data?.data || []);
      } catch (error: any) {
        const statusCode = error?.response.status || 500;
        const message = error?.response.message;
        console.error(statusCode, message || error.message);
      }
    };

    getAllUserPosts();
  }, []);

  return (
    <div className="flex items-center justify-center ">
      <div className="grid gap-1 max-w-[80%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t-2 py-10">
        {allUserPosts.length > 0 ? (
          allUserPosts.map((post, index) => (
            <div
              key={`${post.created_at}_${Math.random()}`} // Unique key
              ref={index === allUserPosts.length - 1 ? lastPostRef : null}
              className="w-full"
            >
              <img
                src={post.content_url}
                alt={`Post ${post.post_id}`}
                className="w-full h-auto aspect-square object-cover"
              />
            </div>
          ))
        ) : (
          <div className="relative top-0 left-[50%] translate-x-[50%]">
            <h1 className="text-5xl text-center">
              Your uploaded posts <br /> will be shown here
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePosts;
