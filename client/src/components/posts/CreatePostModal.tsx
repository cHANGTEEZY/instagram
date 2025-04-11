"use client";

import type React from "react";

import { useContext, useState } from "react";
import { MapPin, Send, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UserDetailContext } from "@/context/UserDetailsContext";
import axios from "axios";
import { toast } from "sonner";
import AuthenticateContext from "@/context/AuthorizedContext";
import {
  CustomModal,
  CustomModalHeader,
  CustomModalTitle,
  CustomModalFooter,
  CustomModalClose,
} from "./CustomModal";

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
  const authContext = useContext(AuthenticateContext);
  const isAuthenticated = authContext?.isAuthenticated || false;

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [postUploading, setIsPostUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const fileType = selectedFile.type.split("/")[0];
    if (fileType !== "image" && fileType !== "video") {
      alert("Only video or image is supported");
      return;
    }
    setMediaType(fileType);

    const objectUrl = URL.createObjectURL(selectedFile);
    setMediaPreview(objectUrl);
  };

  const handleSubmit = async () => {
    if (!isAuthenticated || !file) return;

    const token = localStorage.getItem("userAuthToken");
    if (!token) return;

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("file", file);
    formData.append("foldername", token);
    setIsPostUploading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/post/create-post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data) {
        toast.error("Failed creating post");
      } else {
        toast.success("Post created");
      }
    } catch (err: any) {
      toast.error(err.response?.data.message || "Something went wrong");
    } finally {
      if (mediaPreview) {
        URL.revokeObjectURL(mediaPreview);
      }
      setCaption("");
      setLocation("");
      setMediaPreview(null);
      setMediaType(null);
      setFile(null);
      setIsOpen(false);
      setIsPostUploading(false);
    }
  };

  const handleReset = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview);
    }
    setMediaPreview(null);
    setMediaType(null);
    setFile(null);
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={() => setIsOpen(false)}
      className="p-0 overflow-hidden"
    >
      <CustomModalHeader>
        <CustomModalTitle>Create New Post</CustomModalTitle>
      </CustomModalHeader>

      <div className="flex flex-col md:flex-row md:h-[500px] h-auto max-h-[80vh] overflow-auto">
        <div className="flex-1 bg-muted/20 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
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
                  className="max-w-full max-h-full object-contain"
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

        <div className="w-full md:w-[350px] border-l flex flex-col">
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
              className={`w-full ${
                !mediaPreview || postUploading ? "cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={!mediaPreview || postUploading}
            >
              <Send className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <CustomModalFooter>
        <CustomModalClose onClick={() => setIsOpen(false)}>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </CustomModalClose>
      </CustomModalFooter>
    </CustomModal>
  );
}
