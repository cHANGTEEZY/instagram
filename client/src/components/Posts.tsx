import { useEffect, useState, useRef } from "react";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { Bookmark, Heart, MapPin, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";

import ConvertDate from "@/utils/convertDate.ts";

interface Post {
  post_id: string;
  username: string;
  content_url: string;
  description: string;
  location: string;
  created_at: string;
}

const Posts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  console.log(allPosts);
  const [loading, setLoading] = useState(false);
  const observer = useRef<HTMLDivElement | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/get-all-post`
      );
      setAllPosts((prev) => [...prev, ...response?.data?.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    const currentObserver = observer.current;
    if (currentObserver) {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      };

      const callback = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && !loading) {
          loadPosts();
        }
      };

      const observerInstance = new IntersectionObserver(callback, options);
      observerInstance.observe(currentObserver);

      return () => observerInstance.disconnect();
    }
  }, [loading]);

  return (
    <section className="space-y-10 max-w-md mx-auto">
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => (
          <div
            key={post.post_id + index}
            ref={index === allPosts.length - 1 ? lastPostRef : null}
            className="w-full"
          >
            <Card className="border-none rounded-none bg-background">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {post.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="font-medium">{post.username}</h1>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {ConvertDate(post.created_at)}
                  </p>
                </div>
                {post.location && (
                  <div>
                    <span className="flex gap-1 items-center mb-3">
                      <MapPin size={15} />
                      <p>{post.location}</p>
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardDescription className="p-0">
                <div>
                  <div className="aspect-square w-full relative">
                    <img
                      src={post.content_url || "/placeholder.svg"}
                      alt={`Post by ${post?.username}`}
                      className="object-cover absolute inset-0 w-full h-full"
                    />
                  </div>

                  <div className="flex justify-between py-4">
                    <div className="flex gap-4">
                      <Button
                        variant={"ghost"}
                        className="hover:text-accent-foreground transition-colors"
                      >
                        <Heart className="h-6 w-6" />
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="hover:text-accent-foreground transition-colors"
                      >
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="hover:text-accent-foreground transition-colors"
                      >
                        <Send className="h-6 w-6" />
                      </Button>
                    </div>
                    <div>
                      <Button
                        variant={"ghost"}
                        className="hover:text-accent-foreground transition-colors"
                      >
                        <Bookmark className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-primary px-3">
                    <p className="font-medium">10000 likes</p>
                    <p>
                      <span className="font-medium">{post.username}</span>{" "}
                      {post.description || ""}
                    </p>
                  </div>
                </div>
              </CardDescription>
            </Card>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
      {loading && <p>Loading more posts...</p>}
    </section>
  );
};

export default Posts;
