import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSub,
} from "@/components/ui/dropdown-menu";
import { Cog } from "lucide-react";
import { ModeToggle } from "./ToggleTheme";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type SettingsDropDownMenuProps = {
  showText: boolean;
};

export function SettingsDropDownMenu({ showText }: SettingsDropDownMenuProps) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userAuthToken");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-3 dark:text-white cursor-pointer">
          <Cog />
          <p className={` ${showText ? null : "hidden lg:flex"}`}>Settings</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Switch Appearance</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <ModeToggle />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Button variant={"ghost"} onClick={handleLogOut}>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
