import React, { useContext, useEffect, useState } from "react";
import { HiOutlineSun, HiMoon } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Authcontextobj } from "./context/Authcontext";
import { Cartcontextobj } from "./context/Cartcontext";

export default function Navbar() {
  const { numItems } = useContext(Cartcontextobj);
  const navigate = useNavigate();
  const { token, setToken } = useContext(Authcontextobj);

  function logout() {
    setToken(null);
    localStorage.removeItem('tkn');
    navigate('/signin');
  }

  const [darkmode, setDarkmode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "#fff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#F9f9f9"; 
      document.body.style.color = "#121212";
    }
    localStorage.setItem("darkMode", darkmode);
  }, [darkmode]);

  // State for menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-white fixed w-full top-0 z-50 border-gray-200 dark:bg-orange-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <i className="fa-solid fa-cart-shopping fa-xl text-orange-600 dark:text-white" />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              Fresh Cart
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-600 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white"
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
            onClick={toggleMenu} // Add onClick handler
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${menuOpen ? "block" : "hidden"}`} // Toggle visibility
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 lg:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-orange-600">
              {token && (
                <>
                  <li>
                    <NavLink
                      to="/home"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Wish list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 text-orange-600 rounded md:p-0 dark:text-white text-sm relative"
                    >
                      <i className="fa-solid fa-cart-shopping fa-2xl dark:text-white cursor-pointer" />
                      <span className="absolute -right-1/2 -top-1/2 px-1 bg-red-700 rounded-sm font-bold text-white">
                        {numItems}
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white text-sm"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!token && (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/signin"
                      className="block py-2 px-3 rounded hover:text-orange-600 dark:hover:text-black md:p-0 dark:text-white"
                    >
                      Sign In
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <button onClick={() => setDarkmode(!darkmode)}>
                  {darkmode ? (
                    <HiOutlineSun className="text-white w-6 h-6" />
                  ) : (
                    <HiMoon className="w-6 h-6 text-orange-600" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
