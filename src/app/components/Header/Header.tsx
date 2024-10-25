"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface AuthPageProps {
  isLogin: boolean;
}

const Header = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleLogin = () => {
    router.push("/route/login");
  };

  const handleRegister = () => {
    router.push("/route/register");
  };

  const handleLogout = () => {
    logout();
    router.push("/")
  }

  return (
    <header className="bg-gray-900 text-white py-4 px-8">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          PennyBuddy
        </div>
        <ul className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={handleLogin}
                  className="hover:underline cursor-pointer"
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={handleRegister}
                  className="hover:underline cursor-pointer"
                >
                  Register
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
