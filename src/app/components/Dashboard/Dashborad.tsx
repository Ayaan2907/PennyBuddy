import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const router = useRouter();

  return (
      <div className="bg-gray-50 min-h-screen">
        <section className="container mx-auto px-6 py-16 flex flex-col justify-center items-center md:flex-row md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Welcome to PennyBuddy! Your comprehensive financial management platform.
            </p>
            
            <div className="mt-8 flex space-x-4">
              <Link href="/router/register">
                <span className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-500 transition">
                  Get Started
                </span>
              </Link>
              <Link href="/route/transactions">
                <span className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-500 transition">
                  View Transactions
                </span>
              </Link>
              <Link href="/accounts/add">
                <span className="bg-yellow-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-yellow-400 transition">
                  Add Account
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-900">
              Overview
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Total Balance</h3>
                <p className="text-2xl text-gray-900 mt-2">$5,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Recent Transactions</h3>
                <p className="text-2xl text-gray-900 mt-2">3 Transactions</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700">Pending Payments</h3>
                <p className="text-2xl text-gray-900 mt-2">$150</p>
              </div>
            </div>
          </div>
        </section>
        </div>
  );
} 