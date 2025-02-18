import { Globe } from "@phosphor-icons/react";
import Categories from "./Categories";
import { Link } from "react-router";

const Navigation = () => {
  return (
    <nav className="flex flex-col pb-3 border-b-6">
      <div className="flex h-20  border-b-1 justify-between items-center bg-black">
        <div className="bg-news-bg w-20 h-full flex items-center justify-center rounded-br-2xl">
          <Globe size={28} />
        </div>
        <div className="w-80  h-full flex items-center justify-center bg-news-bg  border-black  border-x-1 rounded-b-2xl">
          <Link
            to={"/"}
            className="  font-Cormorant text-4xl font-bold italic "
          >
            The Day Before
          </Link>
        </div>
        <div className="bg-news-bg w-20 h-full flex items-center justify-center rounded-bl-2xl">
          <Globe size={28} />
        </div>
      </div>
      <Categories />
    </nav>
  );
};

export default Navigation;
