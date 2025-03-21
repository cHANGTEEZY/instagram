"use client";

import { AvatarFallback } from "@/components/ui/avatar";

import { Avatar } from "@/components/ui/avatar";

import type React from "react";

import SideNav from "@/components/SideNav";
import { Instagram } from "lucide-react";
import { useContext, useEffect } from "react";
import AuthenticateContext from "@/context/AuthorizedContext";
import { useNavigate } from "react-router-dom";
import Posts from "@/components/Posts";

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
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>U{item}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">User{item}</p>
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
