"use client";

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const accounts = [
    { id: 1, name: 'Savings', number: '1234', type: 'Savings', balance: '5,000' },
    { id: 2, name: 'Credit Card', number: '5678', type: 'Credit', balance: '-1,200' },
  ];

  const transactions = [
    { id: 1, name: 'Groceries', date: '2024-11-01', amount: '-50.00' },
    { id: 2, name: 'Salary', date: '2024-11-02', amount: '2,000.00' },
    { id: 3, name: 'Utilities', date: '2024-11-03', amount: '-100.00' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen font-sans text-gray-800">
      <Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <div className="pt-20">
        <section className="container mx-auto px-6 py-16 text-center md:text-left">
          <h1 className="text-5xl font-bold text-blue-800 animate-fadeIn">Welcome to PennyBuddy!</h1>
          <p className="mt-4 text-xl text-gray-600">Your comprehensive financial management platform.</p>
        </section>

        <section className="py-16 bg-white shadow-inner rounded-lg">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accounts.map(account => (
                <div
                  key={account.id}
                  className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-700">
                    {account.name} - ****{account.number.slice(-4)}
                  </h3>
                  <p className="text-gray-600">{account.type}</p>
                  <p className="text-2xl font-bold text-blue-900 mt-2">${account.balance}</p>
                  <Link href={`/accounts/${account.id}`} className="text-blue-600 hover:text-blue-700 mt-4 block">View Details</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 shadow-inner rounded-lg">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">Recent Transactions</h2>
            <div className="overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-lg">
              <table className="min-w-full text-left text-gray-700">
                <thead className="border-b bg-gray-200">
                  <tr>
                    <th className="px-4 py-3">Transaction</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map(transaction => (
                    <tr key={transaction.id} className="border-b hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-4 py-3">{transaction.name}</td>
                      <td className="px-4 py-3">{transaction.date}</td>
                      <td className={`px-4 py-3 text-right ${transaction.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'}`}>
                        ${transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/transactions" className="text-blue-600 hover:text-blue-700 mt-4 block text-center">View All Transactions</Link>
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

