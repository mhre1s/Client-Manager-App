import { FaSignOutAlt } from "react-icons/fa";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import { Menu } from "lucide-react"
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { X } from 'lucide-react';

const Navbar = ({ searchQuery, handleSearch}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const changeTheme = (e) => {
    e.preventDefault()
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false)
  const handleLogoff = () => {
    navigate("/");
  };

  const handleSidebar = () => {
    sideBar ? setSideBar(false) : setSideBar(true)
  }

  return (
    <nav className="w-full bg-slate-50 mb-6 dark:bg-slate-950 flex 
    sm:justify-around gap-3 sm:gap-4 items-center p-4 border-b-1 border-b-slate-300 
    dark:border-b-slate-800">
        <aside className={`sm:w-72 min-h-screen absolute z-50 top-0 left-0 dark:bg-gray-900 
            bg-gray-200 w-full border-1 border-gray-300 dark:border-gray-700 shadow-black 
            shadow-lg
             ${sideBar ? 'block' : 'hidden'}`}>
            <div className="w-full flex justify-end text-red-500">
                <button onClick={handleSidebar} className="cursor-pointer p-2"><X/></button>
            </div>
            <div className="flex justify-center items-center h-56">
                <ol className="flex flex-col gap-5 text-xl text-center">
                    <li><Link className="border-b-1 p-1 border-black dark:border-amber-50" to={'/client-list'}>Clientes</Link></li>
                    <li><Link className="border-b-1 p-1 border-black dark:border-amber-50" to={'/scheduling'}>Agendamentos</Link></li>
                </ol>
            </div>
        
        </aside>
        <button onClick={handleSidebar} className="rounded-md hover:bg-gray-200 duration-500 p-1 
        cursor-pointer dark:hover:bg-gray-800">
            <Menu/>
        </button>
        <div className="flex items-center max-w-4xl sm:justify-between justify-center w-full">
            <h1 className="text-slate-950 text-2xl hidden sm:block font-bold dark:text-gray-200">
            Cadastro de clientes
            </h1>
            <div className="flex items-center sm:gap-10 gap-4">
            
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
