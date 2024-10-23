"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

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
                <a href="#" onClick={handleLogin} className="hover:underline">
                  Login
                </a>
              </li>
              <li>
                <a href="#" onClick={handleRegister} className="hover:underline">
                  Register
                </a>
              </li>
            </>
          ) : (
            <li>
              <a href="#" onClick={handleLogout} className="hover:underline">
                Sign Out
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

