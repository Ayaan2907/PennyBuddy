"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { fetchAccountBalancesFromDB, fetchAccountTransactionsFromDB } from '@/app/services/plaidUtils';
import { TransactionObject, getCategoryColorMap, AccountBalance } from "@/app/models/transactionUtils";
import CustomeTable from '@/app/components/Table/CustomeTable';
import { UIModel } from '@/app/components/UIModel/UIModel';

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
      setTransactions(transformedData.slice(0, 3));
      console.log("Fetched transactions on dashboard");
      const categoryMap = getCategoryColorMap(data);
      setCategoryColorMap(categoryMap);
    })();

  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-sans text-gray-800">
      <Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <div className="pt-20">
        <section className="container mx-auto px-6 py-16 text-center md:text-left">
          <h1 className="text-5xl font-bold text-blue-800 animate-fadeIn">Welcome to PennyBuddy!</h1>
          <p className="mt-4 text-xl text-gray-600">Your comprehensive financial management platform.</p>
        </section>

        <section className="py-16 bg-gray-50 shadow-inner rounded-lg">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-12 text-center">Accounts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accounts.map((account) => (
                <div
                  key={account.user_id + account.subtype + account.b_current_balance + account.b_available_balance}
                  // FIXME: need accound_id to be unique from BE. for now doing it this way

                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between transform hover:shadow-2xl"
                  onClick={() => openAccountModal(account)}
                >
                  {/* Account Header */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-700 truncate">
                      {account.institution} - {account.subtype.charAt(0).toUpperCase() + account.subtype.slice(1)}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">{account.type}</p>
                  </div>

                  {/* Balance and Currency */}
                  <div className="mt-6 space-y-4">
                    {/* Available Balance */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Available Balance</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${account.b_available_balance || 'N/A'}
                      </p>
                    </div>
                    {/* Current Balance */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="text-2xl font-bold text-blue-900">
                        ${account.b_current_balance}
                      </p>
                    </div>
                    {/* Currency */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Currency</p>
                      <p className="text-lg font-medium text-gray-700">{account.b_currency}</p>
                    </div>
                  </div>

                  {/* View Details Button */}
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

        <section className="py-16 bg-gray-50 shadow-inner rounded-lg">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Recent Transactions</h2>
            <div className="overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-lg">
              <Link href="/route/transactions" className="text-blue-600 hover:text-blue-700 mt-4 block text-center">
                <CustomeTable transactions={transactions} handleRowClick={() => { }} categoryColorMap={categoryColorMap} />
                <div className="mt-4">
                  View All Transactions
                </div>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white shadow-inner rounded-lg">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Financial Overview</h2>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-green-100 to-white rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-semibold text-green-700 mb-4">Account Balance Distribution</h3>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Pie Chart Placeholder]</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-pink-100 to-white rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-semibold text-pink-700 mb-4">Monthly Spending</h3>
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">[Line Chart Placeholder]</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

