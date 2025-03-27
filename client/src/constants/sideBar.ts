import { Home, Search, Heart, PlusSquareIcon, User } from "lucide-react";

export const sideBar = [
  {
    id: "1",
    title: "Home",
    icon: Home,
    size: 8,
    link: "/",
  },
  {
    id: "2",
    title: "Search",
    icon: Search,
    size: 8,
    link: "/",
  },
  {
    id: "3",
    title: "Notificaions",
    icon: Heart,
    size: 8,
    link: "/modal",
    openModal: true,
  },
  {
    id: "4",
    title: "Create",
    icon: PlusSquareIcon,
    size: 8,
    link: "/",
  },
  {
    id: "5",
    title: "Profile",
    icon: User,
    size: 8,
    link: "/profile",
  },
];
