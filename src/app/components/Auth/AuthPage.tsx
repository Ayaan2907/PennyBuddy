"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


interface AuthPageProps {
  isLogin: boolean; 
}

export default function AuthPage({ isLogin: initialIsLogin }: AuthPageProps) {
  const router = useRouter(); 
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow overflow-hidden">        
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div
                className="stylish-text cursor-pointer"
                onClick={() => router.push("/")}
              >
                PennyBuddy
              </div>
            </div>


            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <form>
              {!isLogin && (
                <>
                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your last name"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your specific address"
                      className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div className="flex space-x-4 mb-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your city"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <input
                        type="text"
                        placeholder="Example: NY"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    
                  </div>

                  <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="Example: 11101"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700">
                        SSN
                      </label>
                      <input
                        type="text"
                        placeholder="Example: 1234"
                        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <a href="/auth/register" className="text-indigo-600 hover:underline">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="/auth/login" className="text-indigo-600 hover:underline">
                    Sign In
                  </a>
                </>
              )}
            </p>
          </div>
        </div>

        <div
          className="hidden md:block w-1/2 bg-center"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/8062358/pexels-photo-8062358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
            backgroundSize: "170%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
}
