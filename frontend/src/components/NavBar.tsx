import { NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const getLinkClass = (path: string) =>
    `m-3 p-4 text-m rounded-md font-medium ${
      location.pathname === path ? "text-blue-500" : "dark:text-gray-300 text-gray-500"
    }`;

  return (
    <nav className="flex justify-center">
      <NavLink className={getLinkClass("/")} to={"/"}>
        All Entries
      </NavLink>
      <NavLink className={getLinkClass("/create")} to={"/create"}>
        New Entry
      </NavLink>
    </nav>
  );
}
