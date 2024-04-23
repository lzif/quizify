import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { Theme, useTheme } from "remix-themes";

export default function Navbar() {
  const [theme, setTheme] = useTheme();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navItem = [
    { title: "Create", url: "/create" },
    { title: "Join", url: "/join" },
  ];
  const burgerMenuItems = [
    { title: "Create", url: "/create" },
    { title: "Join", url: "/join" },
    { title: "Settings", url: "/settings" },
    { title: "About", url: "/about" },
  ];

  const active = "decoration-sky-500 underline";
  return (
    <div className="sticky top-0 z-20 p-3 bg-slate-100 dark:bg-slate-800 flex justify-between items-center">
      <header className="text-3xl font-bold flex-1">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "text-gray-700" : isActive ? active : ""
          }
        >
          Quizify
        </NavLink>
      </header>
      <nav className="text-xl flex gap-2">
        {navItem.map((nav) => (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "text-gray-700" : isActive ? active : ""
            }
            key={nav.title}
            to={nav.url}
          >
            {nav.title}
          </NavLink>
        ))}
      </nav>
      <div className="text-2xl font-bold flex-1 text-right">
        <button
          className="icon-[mi--moon] dark:icon-[mi--sun] w-8 h-8 dark:w-8 dark:h-8 p-2 mr-2"
          onClick={() => setTheme(theme === "light" ? Theme.DARK : Theme.LIGHT)}
        ></button>
        <button
          className={`p-2 h-8 w-8 ${
            isMenuOpen ? "icon-[mi--close]" : "icon-[mi--menu]"
          }`}
          onClick={() => setMenuOpen(!isMenuOpen)}
        ></button>
        {/* Burger menu items */}
        <div className={isMenuOpen ? "block absolute flex flex-col right-0 bg-slate-200 dark:bg-slate-700 z-10 rounded-md mt-2 text-center text-xl font-bold" : "hidden"}>
          {burgerMenuItems.map((nav) => (
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "text-gray-700" : isActive ? active : ""
              }
              key={nav.title}
              to={nav.url}
            >
              {nav.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
