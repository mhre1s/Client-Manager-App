import { FaSignOutAlt } from "react-icons/fa";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Menu } from "lucide-react"
import { useState } from "react";

const Navbar = ({ searchQuery, handleSearch, theme, changeTheme }) => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState('false')
  const handleLogoff = () => {
    navigate("/");
  };

  return (
    <nav className="w-full bg-slate-50 mb-6 dark:bg-slate-950 flex justify-around gap-60 items-center p-4 border-b-1 border-b-slate-300 dark:border-b-slate-800">
        <button className="rounded-md hover:bg-gray-200 duration-500 p-1 cursor-pointer dark:hover:bg-gray-800">
            <Menu/>
        </button>
        <div className="flex items-center max-w-4xl sm:justify-between justify-center w-full">
            <h1 className="text-slate-950 text-2xl hidden sm:block font-bold dark:text-gray-200">
            Cadastro de clientes
            </h1>
            <div className="flex items-center gap-10">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Pesquisar cliente"
                className="w-full max-w-xs border dark:border-slate-700 p-2 rounded-lg focus:outline-hidden"
            />
            <div className="flex rounded-2xl bg-slate-300 dark:bg-slate-700 p-1 gap-1">
                <button
                onClick={changeTheme}
                className={`p-1 ${theme === "light" ? "rounded-3xl bg-white dark:bg-slate-400" : ""}`}
                >
                <RiSunFill />
                </button>
                <button
                onClick={changeTheme}
                className={`p-1 ${theme === "dark" ? "rounded-3xl bg-white dark:bg-slate-400" : ""}`}
                >
                <RiMoonClearFill />
                </button>
            </div>
            <button
                onClick={handleLogoff}
                className="text-black hover:text-gray-700 cursor-pointer"
            >
                <FaSignOutAlt className="dark:text-slate-700 hover:dark:text-slate-500" size={24} />
            </button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
