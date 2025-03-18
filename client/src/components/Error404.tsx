import { astronaunt } from "@/Assets";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const PageNotFound = () => {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-black space-x-11">
      <div className="flex text-white">
        <div className="text-center space-y-2 md:space-y-4">
          <h1 className="text-4xl md:text-8xl font-extrabold">404 - error</h1>
          <h3 className="md:text-4xl font-bold">PAGE NOT FOUND</h3>
          <p>Your search has ventured beyond the known universe</p>
          <Button variant="ghost" className="py-4 md:p-6 border rounded-4xl">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
        <div className="ml-20">
          <img
            src={astronaunt}
            alt="astronaut floating around"
            className="hidden md:block md:h-[250px] object-contain animate-floating"
          />
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
