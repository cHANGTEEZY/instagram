import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

type Inputs = {
  usernameOrEmail: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data
      );
      if (!response.data) {
        toast.error("Failed logging in");
        throw new Error("No response data");
      }
      localStorage.setItem("userAuthToken", response.data.token);
      toast.success(response.data?.message);
      reset();
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "something went wrong";
      console.error(errorMessage);
      toast.error(errorMessage);
      reset();
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center md:flex-row ">
      <div className="w-full max-w-md md:flex-1 ">
        <Card className="border-muted/30">
          <CardHeader className="space-y-1 items-center">
            <Instagram className="h-12 w-12 mb-2" />
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Input
                  {...register("usernameOrEmail", {
                    required: "Enter username or email",
                    validate: (usernameOrEmail) => {
                      const isEmail =
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                          usernameOrEmail
                        );
                      const isUsername = /^[a-zA-Z0-9]{1,10}$/.test(
                        usernameOrEmail
                      );

                      return (
                        isEmail ||
                        isUsername ||
                        "Enter a valid username or email"
                      );
                    },
                  })}
                  type="text"
                  id="username"
                  placeholder="Username, or email"
                />
                {errors.usernameOrEmail && (
                  <span className="text-red-500">
                    {errors.usernameOrEmail.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register("password", {
                    required: "Enter password",
                  })}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in" : "Sign in"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full text-blue-500">
                <Facebook />
                Sign in with GitHub
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              <Link
                to="#"
                className="text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className=" underline-offset-4 hover:underline text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
