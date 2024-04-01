import { NavLink } from "@remix-run/react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navItem = [
    { title: "Create", url: "/create" },
    { title: "Join", url: "/join" },
  ];
  const active = "decoration-sky-500 underline";
  return (
    <div className="sticky top-0 z-20 p-3 bg-slate-800 flex justify-between items-center">
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
            to={nav.url}
          >
            {nav.title}
          </NavLink>
        ))}
      </nav>
      <div className="text-2xl font-bold flex-1 text-right">
        <button className="i-mi-moon w-8 h-8 dark:i-mi-sun p-2 mr-2"></button>
        <button
          className={`p-2 h-8 w-8 ${isMenuOpen ? "i-mi-close" : "i-mi-menu"}`}
          onClick={() => setMenuOpen(!isMenuOpen)}
        ></button>
      </div>
    </div>
  );
}
