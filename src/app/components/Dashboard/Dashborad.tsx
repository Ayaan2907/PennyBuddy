"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { fetchAccountBalancesFromDB, fetchAccountTransactionsFromDB } from '@/app/services/plaidUtils';
import { TransactionObject, getCategoryColorMap, AccountBalance } from "@/app/models/transactionUtils";
import CustomeTable from '@/app/components/Table/CustomeTable';
import { UIModel } from '@/app/components/UIModel/UIModel';
import PieChart from '@/app/components/Charts/PieChart';
import BarChart from '@/app/components/Charts/BarChart';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryColorMap, setCategoryColorMap] = useState<Record<string, string>>({});
  const [accounts, setAccounts] = useState<AccountBalance[]>([]);
  const [transactions, setTransactions] = useState<TransactionObject[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountBalance | null>(null);


  const openAccountModal = (account: AccountBalance) => setSelectedAccount(account);
  const closeAccountModal = () => setSelectedAccount(null);


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    (async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const balances = await fetchAccountBalancesFromDB(userId);
        setAccounts(balances);
        console.log("Fetched balances on dashboard", balances);

        const data = await fetchAccountTransactionsFromDB(userId);
        const transformedData = data.map((transaction: TransactionObject) => ({
          ...transaction,
          amount: Number(transaction.amount),
          category: typeof transaction.category === 'string' ? transaction.category.split(/,\s*|\s*,\s*|\s*,/) : transaction.category,
        }));
        setTransactions(transformedData);
        console.log("Fetched transactions on dashboard");

        const categoryMap = getCategoryColorMap(transformedData);
        setCategoryColorMap(categoryMap);
      } catch (error) {
        console.error("Error fetching data for dashboard:", error);
      }
    })();

  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-sans text-gray-800">
      <Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <div className="pt-20">

        {/* Welcome Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-xl rounded-xl">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 animate-fadeIn">Welcome to PennyBuddy!</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600">Your comprehensive financial management platform.</p>

            {/* Financial Overview */}
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8 text-center tracking-wider mt-12">
              Financial Overview
            </h2>

            {/* Charts Section */}
            <div className="space-y-8 overflow-y-auto max-h-[40rem] mx-4 sm:mx-8 lg:mx-16 bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="h-72 sm:h-80 lg:h-96">
                <BarChart accounts={accounts} />
              </div>
              <div className="h-72 sm:h-80 lg:h-96">
                <PieChart transactions={transactions} />
              </div>
            </div>

            {/* Recent Transactions Section */}
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

        {/* Accounts Section */}
        <section className="py-16 bg-gray-50 shadow-inner rounded-lg mt-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center tracking-wider">
              Connected Accounts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {accounts.map((account) => (
                <div
                  key={account.user_id + account.subtype + account.b_current_balance + account.b_available_balance}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between transform hover:shadow-2xl"
                  onClick={() => openAccountModal(account)}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-700 truncate">
                      {account.institution} - {account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>

                  {/* Balance Section */}
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

          {/* Modal for Account Details */}
          {selectedAccount && (
            <UIModel
              account={selectedAccount}
              onClose={closeAccountModal}
            />
          )}
        </section>
      </div>
    </div>
  );
}

