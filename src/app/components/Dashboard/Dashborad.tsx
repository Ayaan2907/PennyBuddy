"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import CustomeTable from '@/app/components/Table/CustomeTable';
import { UIModel } from '@/app/components/UIModel/UIModel';
import PieChart from '@/app/components/Charts/PieChart';
import BarChart from '@/app/components/Charts/BarChart';
import { DashboardContext } from './DashboardContext';
import { NavbarOpenState } from './DashboardState';
import { AccountBalance } from '@/app/models/transactionUtils';

export default function Dashboard() {
  const dashboardContextRef = useRef(new DashboardContext());
  const [contextState, setContextState] = useState({});
  const [selectedAccount, setSelectedAccount] = useState<AccountBalance | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await dashboardContextRef.current.fetchData();
      setContextState({});
    };
    fetchData();
  }, []);

  const dashboardContext = dashboardContextRef.current;

  useEffect(() => {
    setSelectedAccount(dashboardContext.getSelectedAccount());
  }, [contextState]);

  const accounts = dashboardContext.getAccounts();
  const transactions = dashboardContext.getTransactions();
  const categoryColorMap = dashboardContext.getCategoryColorMap();
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-sans text-gray-800">
      <Navbar isOpen={dashboardContext instanceof NavbarOpenState} toggle={() => dashboardContext.toggleNavbar()} />

      <div className="pt-20">

        <section className="py-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-xl rounded-xl">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 animate-fadeIn">Welcome to PennyBuddy!</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">Your comprehensive financial management platform.</p>

            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8 text-center tracking-wider mt-12">
              Financial Overview
            </h2>

            <div className="space-y-8 overflow-y-auto max-h-[40rem] mx-4 sm:mx-8 lg:mx-16 bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="h-72 sm:h-80 lg:h-96">
                <BarChart accounts={accounts} />
              </div>
              <div className="h-72 sm:h-80 lg:h-96">
                <PieChart transactions={transactions} />
              </div>
            </div>

            <div className="mt-12 mx-4 sm:mx-8 lg:mx-16">
              <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center tracking-wider">
                Recent Transactions
              </h2>
              <div className="overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-lg">
                <Link href="/route/transactions" className="text-blue-600 hover:text-blue-700 block text-center mt-4">
                  <div className="max-h-96 overflow-y-auto">
                    <CustomeTable transactions={transactions.slice(0, 7)} handleRowClick={() => { }} categoryColorMap={categoryColorMap} />
                  </div>
                  <div className="text-sm mt-4 text-gray-600 hover:text-blue-700">
                    View all transactions
                  </div>
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="py-16 bg-gray-50 shadow-inner rounded-lg mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center tracking-wider">
              Connected Accounts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {accounts.map((account, index) => (
                <div
                  key={account.account_id || index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between transform hover:shadow-2xl"
                  onClick={() => {
                    dashboardContext.openModal(account);
                    setContextState({});
                  }}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-700 truncate">
                      {account.institution} - {account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Available balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${account.b_available_balance || 'N/A'}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Current balance</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ${account.b_current_balance}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="text-lg font-medium text-gray-700">{account.b_currency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedAccount && (
            <UIModel
              account={selectedAccount}
              onClose={() => {
                dashboardContext.closeModal();
                setContextState({});
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}

