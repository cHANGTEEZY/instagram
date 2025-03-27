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
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { UserDetailContext } from "@/context/UserDetailsContext";
import { useContext } from "react";

type SettingsDropDownMenuProps = {
  showText: boolean;
};

export function SettingsDropDownMenu({ showText }: SettingsDropDownMenuProps) {
  const { userDetails } = useContext(UserDetailContext);
  const username =
    userDetails?.userDetails.username || userDetails?.userDetails.fullname;
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
        <DropdownMenuLabel className="capitalize">{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/profile"}>Profile</Link>
        </DropdownMenuItem>

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
        <DropdownMenuItem onClick={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
