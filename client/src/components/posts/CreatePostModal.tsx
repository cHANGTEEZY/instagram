"use client";

import type React from "react";

import { useContext, useState } from "react";
import { MapPin, Send, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UserDetailContext } from "@/context/UserDetailsContext";
import axios from "axios";
import { toast } from "sonner";

interface CreatePostProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  userAvatar?: string;
  username?: string;
}

export function CreatePost({
  open,
  setIsOpen,
  userAvatar = "/placeholder.svg?height=40&width=40",
  username = "username",
}: CreatePostProps) {
  const { userDetails } = useContext(UserDetailContext);

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const file = event.target.files?.[0];

    if (file) {
      const fileType = file.type.split("/")[0];

      if (fileType === "image" || fileType === "video") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setMediaPreview(e.target?.result as string);
          setMediaType(fileType as "image" | "video");
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/create-post`,
        {
          caption,
          location,
          mediaPreview,
        }
      );

      if (!response.data) {
        toast.error("Failed creating post");
      }
      toast.success("Post created");
    } catch (err: any) {
      throw new Error(err.response?.data.message);
    } finally {
      setCaption("");
      setLocation("");
      setMediaPreview(null);
      setMediaType(null);
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    setMediaPreview(null);
    setMediaType(null);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[900px] p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-center text-xl font-semibold">
            Create New Post
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row h-[500px]">
          <div className="flex-1 bg-muted/20 flex items-center justify-center relative">
            {!mediaPreview ? (
              <div className="text-center p-6">
                <div className="mb-4 text-muted-foreground">
                  Upload photos or videos here
                </div>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex">
                    Select from computer
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                {mediaType === "image" && (
                  <img
                    src={mediaPreview || "/placeholder.svg"}
                    alt="Preview"
                    className=" max-w-full max-h-full object-contain"
                  />
                )}
                {mediaType === "video" && (
                  <video controls className="max-w-full max-h-full">
                    <source src={mediaPreview} />
                    Your browser does not support the video tag.
                  </video>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  onClick={handleReset}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Caption and Details Section */}
          <div className="w-full md:w-[350px] border-l flex flex-col">
            {/* User Info */}
            <div className="p-4 flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={username} />
                <AvatarFallback>
                  {userDetails?.userDetails.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">
                {userDetails?.userDetails.username}
              </span>
            </div>

            <Separator />

            {/* Caption */}
            <div className="flex-1 p-4">
              <Textarea
                placeholder="Write a caption..."
                className="min-h-[150px] resize-none border-0 focus-visible:ring-0 p-0 shadow-none"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <Separator />

            {/* Location */}
            <div className="p-4 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Add location"
                className="border-0 focus-visible:ring-0 p-0 shadow-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <Separator />

            {/* Actions */}
            <div className="p-4">
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!mediaPreview}
              >
                <Send className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="p-4 sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
