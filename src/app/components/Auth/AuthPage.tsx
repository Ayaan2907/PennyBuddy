"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, loginUser } from '../../services/authService';
import { initialFormData, AuthPageProps } from '../../models/authFormModel';
import { useAuth } from "@/app/context/AuthContext";

export default function AuthPage({ isLogin: initialIsLogin }: AuthPageProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoggedIn, setIsLogin] = useState(initialIsLogin);

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (!isLoggedIn && (!formData.firstName || !formData.lastName))) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      if (isLoggedIn) {
        const response = await loginUser({ email: formData.email, password: formData.password });
        if (response.accessToken) {
            if (typeof window !== "undefined") {
            localStorage.setItem("plaidAccessToken", response.plaidAccessToken);
            localStorage.setItem("userId", response.id);
            login();
            router.push("/route/dashboard");
            }
        } else {
          setError("Invalid credentials.");
        }
      } else {
        const response = await registerUser(formData);
        if (response.firstName) {
          router.push("/route/login");
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const renderInputField = (label: string, name: string, type: string = "text", isRequired: boolean = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="mt-1 p-3 block w-full border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
      />
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col overflow-hidden">
      <div className="flex flex-grow overflow-hidden">
        <div className="w-full md:w-1/2 flex justify-center items-center p-8">
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="stylish-text cursor-pointer" onClick={() => router.push("/")}>
                PennyBuddy
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {isLoggedIn ? "Sign In" : "Sign Up"}
            </h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              {!isLoggedIn && (
                <>
                  <div className="flex space-x-4 mb-4">
                    {renderInputField("First Name", "firstName", "text", true)}
                    {renderInputField("Last Name", "lastName", "text", true)}
                  </div>
                  {renderInputField("Address", "address")}
                  <div className="flex space-x-4">
                    {renderInputField("City", "city")}
                    {renderInputField("State", "state", "text", false)}
                  </div>
                  <div className="flex space-x-4">
                    {renderInputField("Postal Code", "postalCode", "text", false)}
                    {renderInputField("SSN", "ssn", "text", false)}
                  </div>
                </>
              )}
              {renderInputField("Email Address", "email", "email", true)}
              {renderInputField("Password", "password", "password", true)}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                {isLoggedIn ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              {isLoggedIn ? (
                <>
                  Don’t have an account?{" "}
                  <a href="/route/register" className="text-indigo-600 hover:underline">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="/route/login" className="text-indigo-600 hover:underline">
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
