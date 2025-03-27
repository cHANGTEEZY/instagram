"use client";

import { useContext } from "react";
import { Card, CardHeader, CardDescription } from "./ui/card";
import { fakePostsData } from "../constants/fakePosts";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { UserDetailContext } from "@/context/UserDetailsContext";

const Posts = () => {
  const { userDetails } = useContext(UserDetailContext);

  return (
    <section className="space-y-10 max-w-md mx-auto">
      {fakePostsData.map((post) => (
        <div key={post.id} className="w-full">
          <Card className="border-none rounded-none bg-background">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage />
                  <AvatarFallback>
                    {userDetails?.userDetails.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h1 className="font-medium">
                  {userDetails?.userDetails.username}
                </h1>
              </div>
            </CardHeader>
            <CardDescription className="p-0">
              <div>
                <Carousel className="w-full">
                  <CarouselContent>
                    {post.postImages?.map((image, index) => (
                      <CarouselItem key={index} className="flex justify-center">
                        <div className="aspect-square w-full relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Post by ${post.userName} ${index + 1}`}
                            className="object-cover absolute inset-0 w-full h-full"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>

                <div className="flex justify-between py-4">
                  <div className="flex gap-4">
                    <Button
                      variant={"ghost"}
                      className="hover:text-accent-foreground transition-colors "
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
                  <p className="font-medium">
                    {post.postLikes.toLocaleString()} likes
                  </p>
                  <p>
                    <span className="font-medium">{post.userName}</span>{" "}
                    {post.postDescription}
                  </p>
                </div>
              </div>
            </CardDescription>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default Posts;
