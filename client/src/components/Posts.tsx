import { Card, CardHeader, CardFooter, CardDescription } from "./ui/card";
import { fakePostsData } from "../constants/fakePosts";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const Posts = () => {
  return (
    <section className="space-y-10">
      {fakePostsData.map((post) => (
        <div key={post.id} className="w-full">
          <Card className="border-none rounded-none bg-background">
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={post.avatarImage} alt={post.userName} />
                  <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="font-medium">{post.userName}</h1>
              </div>
            </CardHeader>
            <CardDescription className="px-0">
              <div>
                <Carousel className="w-full" opts={{}}>
                  <CarouselContent>
                    {post.postImages?.map((image, index) => (
                      <CarouselItem key={index} className="h-4/12">
                        <div className="p-1">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Post by ${post.userName} ${index + 1}`}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-between p-4">
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
              </div>
            </CardDescription>
            <CardFooter className="px-4 pb-4">
              <div>
                <p className="font-medium">
                  {post.postLikes.toLocaleString()} likes
                </p>
                <p>
                  <span className="font-medium">{post.userName}</span>{" "}
                  {post.postDescription}
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </section>
  );
};

export default Posts;
