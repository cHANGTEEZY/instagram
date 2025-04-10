// HiddenNav.jsx
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { sideBar } from "@/constants/sideBar";
import { X, Instagram } from "lucide-react";
import { SettingsDropDownMenu } from "./SettingsDropDown";
import { Link } from "react-router-dom";
import { CreatePost } from "./posts/CreatePostModal";
import { useState } from "react";

interface HiddenNavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HiddenNav: React.FC<HiddenNavProps> = ({ open, setOpen }) => {
  const [createPostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="p-0 w-[280px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Instagram size={24} />
              <h1 className="text-xl font-bold">Instagram</h1>
            </div>
            <button
              type="button"
              className="rounded-md p-2 inline-flex items-center cursor-pointer justify-center hover:bg-gray-100 dark:hover:bg-black"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav className="flex-1 overflow-auto py-4">
            <ul className="space-y-1 px-2 flex flex-col items-center lg:items-stretch">
              {sideBar?.map((link) => (
                <li key={link.id} className="w-full">
                  {link.id === "4" ? (
                    <button
                      type="button"
                      onClick={() => setIsCreatePostOpen(true)}
                      className="flex w-full items-center justify-center cursor-pointer lg:justify-start rounded-md px-3 py-3 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700"
                    >
                      <span className="inline-flex lg:mr-3">
                        <link.icon size={24} />
                      </span>
                      <span className="text-base font-medium hidden lg:block">
                        {link.title}
                      </span>
                    </button>
                  ) : (
                    <Link to={link.link}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-center cursor-pointer lg:justify-start rounded-md px-3 py-3 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-slate-700"
                      >
                        <span className="inline-flex lg:mr-3">
                          <link.icon size={24} />
                        </span>
                        <span className="text-base font-medium hidden lg:block">
                          {link.title}
                        </span>
                      </button>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <CreatePost open={createPostOpen} setIsOpen={setIsCreatePostOpen} />

          <div className="border-t p-4">
            <span className="flex w-full items-center cursor-pointer justify-self-start lg:justify-start rounded-md px-3 py-3 text-gray-700 dark:hover:bg-slate-600 ">
              <SettingsDropDownMenu showText={true} />
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HiddenNav;
