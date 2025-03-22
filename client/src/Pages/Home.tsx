"use client";

import type React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Instagram } from "lucide-react";
import SideNav from "@/components/SideNav";
import AuthenticateContext from "@/context/AuthorizedContext";
import Posts from "@/components/Posts";
import { fakePostsData } from "@/constants/fakePosts";

const Home: React.FC = () => {
  const authContext = useContext(AuthenticateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext?.isAuthenticated) {
      navigate("/login");
    }
  }, [authContext, navigate]);

  if (!authContext?.isAuthenticated) return null;

  return (
    <div className="flex h-screen">
      <SideNav />

      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center border-b px-4 md:hidden">
          <div className="mx-auto">
            <Instagram className="h-7 w-7" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 ">
          <div className="flex max-w-6xl mx-auto gap-8 ">
            <section className="w-[100%] md:w[70%]">
              <Posts />
            </section>
            <section className="w-[30%] sticky top-4 h-fit hidden md:block ">
              <div className="bg-muted/20 rounded-lg p-4">
                <h2 className="font-semibold text-lg mb-4">
                  Suggestions For You
                </h2>
                <div className="space-y-4">
                  {fakePostsData.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>U{index}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">User{index + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            Suggested for you
                          </p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-primary">
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
