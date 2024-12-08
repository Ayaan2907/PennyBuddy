"use client";

import Link from 'next/link';
import { usePlaidLinkHandler } from '../../hooks/usePlaidLinkHandler';
import { useEffect, useState } from 'react';
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const { open, ready } = usePlaidLinkHandler(linkToken);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const link_token = localStorage.getItem('plaidAccessToken')
        setLinkToken(link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    if (typeof window !== 'undefined') {
      fetchLinkToken();
    }
  }, []);

  const handleAddAccount = () => {
    if (ready) {
      open();
    } else {
      console.error('Plaid Link is not ready');
    }
  };

  const handleLogout = () => {
    logout(); 
  }

  return (
    <nav className="bg-black shadow-lg text-white fixed w-full z-10 top-0 left-0">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">PennyBuddy</Link>
        </h1>

        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggle}
        >
          {isOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
        </button>

        <ul
          className={`md:flex items-center space-x-6 text-lg ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <button
              onClick={handleAddAccount}
              className="text-white-500 hover:text-gray-400"
            >
              Add Account
            </button>
          </li>
          <li>
            <Link href="/route/dashboard" className="hover:text-gray-400">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/route/transactions" className="hover:text-gray-400">
              Transactions
            </Link>
          </li>
          <li>
            <Link href="/route/payment" className="hover:text-gray-400">
            Payment
            </Link>
          </li>
          <li>
            <Link href="/">
              <button
                onClick={handleLogout}
                className="text-white-500 hover:text-gray-400">
                  Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
