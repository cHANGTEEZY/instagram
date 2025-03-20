import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

import { Instagram, FacebookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Inputs = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        data
      );
      if (!response.data) {
        toast.error("Failed creating account");
        throw new Error("No response Data");
      }
      reset();
      toast.success("User created succesfully");
    } catch (err: any) {
      reset();
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center md:flex-row ">
      <div className="w-full max-w-md md:flex-1">
        <Card className="shadow-md shadow-muted  transition-all delay-50 ease-in">
          <CardHeader className="space-y-1 items-center">
            <Instagram className="h-12 w-12 mb-2" />
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register("fullName", {
                    required: "Enter your full name",
                    maxLength: {
                      value: 30,
                      message: "Full name must be max of 30 character long",
                    },
                  })}
                  type="text"
                  id="fullname"
                  placeholder="Full Name"
                />
                {errors.fullName && (
                  <span className="text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register("username", {
                    required: "Enter a username",
                    pattern: {
                      value: /^[a-zA-Z0-9]{1,10}$/,
                      message: "Username must be maximum of 10 character long",
                    },
                  })}
                  type="text"
                  id="username"
                  placeholder="Username"
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register("password", {
                    required: "Enter a password",
                    pattern: {
                      value: /^.{5,}$/,
                      message: "Password must be 10+ chars",
                    },
                  })}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card rounded-3xl p-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full text-blue-500"
                type="button"
              >
                <FacebookIcon />
                Sign up with Facebook
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
