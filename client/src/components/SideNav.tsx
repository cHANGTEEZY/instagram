// SideNav.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { sideBar } from "@/constants/sideBar";
import { Cog, Instagram, Menu } from "lucide-react";
import HiddenNav from "./HiddenNav";
import { SettingsDropDownMenu } from "./SettingsDropDown";
import AuthenticateContext from "@/context/AuthorizedContext";
import { Link, useNavigate } from "react-router-dom";

const SideNav = () => {
  const AuthContext = useContext(AuthenticateContext);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (AuthContext && !AuthContext?.isAuthenticated) {
      navigate("/");
    }
  }, [AuthContext, navigate]);

  if (!AuthContext) return null;

  return (
    <>
      <div className="h-screen ">
        <button
          type="button"
          className="inline-flex items-center cursor-pointer justify-center rounded-md mt-2 p-2 dark:text-white dark:hover:bg-slate-600 text-gray-700 md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      <HiddenNav open={open} setOpen={setOpen} />

      <div className="hidden md:flex md:w-[80px] lg:w-[240px] h-screen flex-col border-r bg-background">
        <div className="p-4 flex items-center justify-center lg:justify-start gap-2">
          <Instagram size={24} />
          <h1 className="text-xl font-medium hidden lg:block">Instagram</h1>
        </div>

        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2 flex flex-col items-center lg:items-stretch">
            {sideBar?.map((link) => (
              <li key={link.id} className="w-full">
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
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t p-4">
          <span className="flex w-full items-center  justify-center lg:justify-start rounded-md px-3 py-3 text-gray-700 dark:hover:bg-slate-600 ">
            <SettingsDropDownMenu showText={false} />
          </span>
        </div>
      </div>
    </>
  );
};

export default SideNav;
