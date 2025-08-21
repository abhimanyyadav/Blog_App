import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menus } from '../data/menus';
import logo from '/logo.png.png'; // ✅ New logo from /public/logo.png

export default function Navber() {
    const [darkMode, setDarkMode] = useState(false);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.isLogin);

    const showMenu = () => {
        const menu = document.querySelector('.mobile-menu');
        menu.classList.toggle('hidden');
    };

    const logoutHandler = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.isLogin);
        if (user) {
            user.isLogin = false;
            localStorage.setItem('users', JSON.stringify(users));
            window.location.reload();
        }
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                        {/* <img
                            src={logo}
                            alt="logo"
                            className="w-[55px] h-[55px] object-contain"
                        /> */}
                        <span className="hidden sm:inline">MyBlogSpace</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {menus.map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium ${
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                                    }`
                                }
                            >
                                {menu.title}
                            </NavLink>
                        ))}

                        {user ? (
                            <button
                                onClick={logoutHandler}
                                className="px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500"
                                >
                                    Log In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="px-3 py-2 rounded-md text-sm font-medium bg-green-500 text-white hover:bg-green-600"
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}

                        {/* Dark/Light Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="ml-4 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md"
                        >
                            {darkMode ? '🌙 Dark' : '☀️ Light'}
                        </button>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={showMenu}
                            className="text-gray-900 dark:text-gray-100 focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu hidden md:hidden px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium ${
                                isActive
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-500'
                            }`
                        }
                    >
                        {menu.title}
                    </NavLink>
                ))}
                {user ? (
                    <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 dark:text-red-400"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500"
                        >
                            Log In
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="block px-3 py-2 rounded-md text-base font-medium bg-green-500 text-white hover:bg-green-600"
                        >
                            Sign Up
                        </NavLink>
                    </>
                )}

                {/* Dark/Light Toggle Mobile */}
                <button
                    onClick={toggleTheme}
                    className="mt-2 w-full px-3 py-2 rounded-md text-base font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md"
                >
                    {darkMode ? '🌙 Dark' : '☀️ Light'}
                </button>
            </div>
        </nav>
    );
}
