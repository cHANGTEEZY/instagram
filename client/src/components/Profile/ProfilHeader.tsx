import { astronaunt } from "@/Assets";
import { Button } from "../ui/button";
import { Cog, Link } from "lucide-react";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailsContext";

const ProfilHeader = () => {
  const { userDetails, error } = useContext(UserDetailContext);
  return (
    <header className="flex justify-center items-center py-10 ">
      <div className="px-20 hidden md:block ">
        <img
          src={astronaunt}
          alt="user-profile-image"
          className=" h-40 aspect-auto object-contain  rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-col items-baseline space-y-5 ">
        <div className="flex gap-2 items-center">
          <span className="mr-5">
            {userDetails?.userDetails.username || error}
          </span>
          <Button className="bg-accent-background" variant={"outline"}>
            Edit Profile
          </Button>
          <Button className="bg-accent-background" variant={"outline"}>
            View Archive
          </Button>
          <Cog />
        </div>
        <div className="flex gap-4">
          <p>
            33 <span className="dark:text-gray-400">posts</span>
          </p>
          <p>
            149 <span className="dark:text-gray-400">followers</span>
          </p>
          <p>
            390 <span className="dark:text-gray-400">following</span>
          </p>
        </div>
        <div className="grid">
          <span>ʘ‿ʘ</span>
          <span>Co-founder of VBee Tech. Software Engineer. Freelancer</span>
          <span className="flex gap-2">
            <Link />
            <a href="#" className="dark:text-blue-200 text-gray-500">
              vbee.vercel.app
            </a>
          </span>
        </div>
      </div>
    </header>
  );
};

export default ProfilHeader;
