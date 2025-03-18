import SideNav from "@/components/SideNav";
import { Instagram } from "lucide-react";

const Home = () => {
  return (
    <div className="flex h-screen">
      <SideNav />

      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center border-b px-4 md:hidden">
          <div className="mx-auto">
            <Instagram className="h-7 w-7" />
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4"></main>
      </div>
    </div>
  );
};

export default Home;
