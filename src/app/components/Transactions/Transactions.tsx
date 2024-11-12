import Link from 'next/link';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';

const sampleTransactions = [
  { transactionId: 'TXN001', transactionName: 'Purchase', amount: 100.00, dateTime: '2023-01-01 12:00:00' },
  { transactionId: 'TXN002', transactionName: 'Refund', amount: -50.00, dateTime: '2023-01-02 14:30:00' },
  { transactionId: 'TXN003', transactionName: 'Transfer', amount: 200.00, dateTime: '2023-01-03 09:15:00' },
  { transactionId: 'TXN004', transactionName: 'Withdrawal', amount: -100.00, dateTime: '2023-01-04 16:45:00' },
  { transactionId: 'TXN005', transactionName: 'Deposit', amount: 150.00, dateTime: '2023-01-05 11:20:00' },
];

export default function Transactions() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen">
    < Navbar  isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
      <section className="container mx-auto px-6 py-16 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Transactions</h1>
        <p className="text-lg text-gray-600 mb-8">Review all your recent transactions below.</p>
        
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Transaction Name</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Transaction Id</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Amount</th>
                <th className="px-4 py-2 text-left text-gray-600 font-semibold">Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {sampleTransactions.map((transaction) => (
                <tr
                  key={transaction.transactionId}
                  className={`border-b hover:bg-gray-50 ${
                    transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  <td className="px-4 py-2">{transaction.transactionName}</td>
                  <td className="px-4 py-2">{transaction.transactionId}</td>
                  <td className="px-4 py-2">${transaction.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{transaction.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
