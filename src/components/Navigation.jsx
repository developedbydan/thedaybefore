import { Globe } from "@phosphor-icons/react";
import Categories from "./Categories";

const Navigation = () => {
  return (
    <nav className="flex flex-col pb-3">
      <div className="flex h-20  border-b-1 justify-between items-center bg-black">
        <div className="bg-news-bg w-20 h-full flex items-center justify-center rounded-br-2xl">
          <Globe size={28} />
        </div>
        <div className="w-80  h-full flex items-center justify-center bg-news-bg  border-black  border-x-1 rounded-b-2xl">
          <h1 className="  font-Playfair-Display text-3xl font-bold ">
            The Day Before
          </h1>
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
