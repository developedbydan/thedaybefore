import { NavLink } from "react-router";

function Categories() {
  const categories = ["business", "sports", "health", "technology"];

  return (
    <section className="border-b-1 ">
      <ul className="flex justify-between  items-center px-4 py-5 font-Inter text-sm font-medium ">
        {categories.map((category) => (
          <li key={category}>
            <NavLink
              to={`/category/${category}`}
              className={({ isActive }) =>
                `px-3 py-2 cursor-pointer ${
                  isActive
                    ? "text-orange-400 font-bold border-b border-orange-500"
                    : ""
                }`
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Categories;
