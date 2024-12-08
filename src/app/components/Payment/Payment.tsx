"use client";

import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { fetchAccountsFromDB } from "@/app/services/accountService";
import { Account } from "@/app/models/accountFormModel";
import Select from "react-select";
import { paymentService } from "@/app/services/paymentService";

export default function Payment() {
    const [isOpen, setIsOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<{ value: string, label: string }[]>([]);
    const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
    const [recipientDetails, setRecipientDetails] = useState<string>("");
    const [amount, setAmount] = useState<number | null>(null);
    const [comment, setComment] = useState<string | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const categoryOptions = [
        { value: "Payment", label: "Payment" },
        { value: "Travel", label: "Travel" },
        { value: "Restaurants", label: "Restaurants" },
        { value: "Credit Card Payment", label: "Credit Card Payment" },
        { value: "Savings", label: "Savings" }
    ];

    const handleCategoryChange = (selectedOptions: any) => {
        setSelectedCategories(selectedOptions || []);
    };

    const handlePayment = async () => {
        if (!selectedAccountId || !recipientDetails || !amount || !selectedCategories) {
            alert("Please fill in all fields.");
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error("User ID not found.");
            return;
        }

        const selectedAccount = accounts.find(x => x.account_id == selectedAccountId);

        const payload = {
            from_account: {
                accountId: selectedAccountId,
                type: selectedAccount ? selectedAccount.type : undefined,
                subtype: selectedAccount ? selectedAccount.subtype : undefined
            },
            to_account_id: recipientDetails,
            amount: amount,
            user_id: Number(userId),
            category: selectedCategories.map(cat => cat.label).join(","),
            name: comment
        };

        try {
            const response = await paymentService(payload);
            if (response.data.status == 200) {
                console.log("Payment sent successfully:", response);
                setShowSuccessModal(true);
            }
        } catch (error) {
            console.error("Error sending payment:", error);
            alert("An error occurred while sending the payment.");
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const response = await fetchAccountsFromDB(userId);
                console.log(response);
                setAccounts(response);
            } catch (error) {
                console.error("Error fetching accounts:", error);
            }
        }

        fetchAccounts();
    }, [selectedOption]);

    const filteredAccounts = accounts.filter((account) => {
        if (selectedOption === "Savings" && account.subtype === "savings") {
            return true;
        }
        if (selectedOption === "Checking" && account.subtype === "checking") {
            return true;
        }
        if (selectedOption == "Credit Card" && account.subtype === "credit card") {
            return true;
        }
        return false;
    });

    const handleModalClose = () => {
        setShowSuccessModal(false);
        window.location.reload();
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

            <div className="pt-10">
                <section className="container mx-auto px-6 py-16 flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment</h1>
                    <hr className="my-6 border-t border-gray-300 w-2/5" />

                    <div className="mb-6">
                        <label htmlFor="account" className="block text-lg font-medium text-gray-900 mb-2">
                            Select Account
                        </label>
                        <select
                            id="account"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="block text-gray-900 w-64 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Account</option>
                            <option value="Savings">Savings Account</option>
                            <option value="Checking">Checking Account</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>

                    {(selectedOption === "Savings" || selectedOption === "Checking" || selectedOption === "Credit Card") && (
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-lg font-medium text-gray-900 mb-2">
                                Select Category
                            </label>
                            <Select
                                id="category"
                                isMulti
                                options={categoryOptions}
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                className="w-64 text-gray-900"
                                getOptionLabel={(option) => option.label}
                                getOptionValue={(option) => option.value}
                            />

                            <div>
                                <label htmlFor="comment" className="block text-lg font-medium text-gray-900 mb-2">
                                    Comment
                                </label>
                                <input
                                    id="comment"
                                    type="comment"
                                    placeholder="Enter Comment"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                    value={comment || ''}
                                    onChange={(e) => setComment(String(e.target.value))}
                                />
                            </div>
                        </div>
                    )}

                    {(selectedOption === "Savings" || selectedOption === "Checking") && (
                        <form className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-96">
                            <div>
                                <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                                    From
                                </label>
                                <select
                                    id="from"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                    onChange={(e) => setSelectedAccountId(e.target.value)}>
                                    <option value="">
                                        Select an account
                                    </option>
                                    {filteredAccounts.map((account) => (
                                        <option key={account.account_id} value={account.account_id}>
                                            {account.institution_name} - {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedAccountId && (
                                filteredAccounts
                                    .filter((account) => account.account_id == selectedAccountId)
                                    .map((account) => (
                                        <div key={account.id} className="text-gray-900">
                                            {"Account Balance: "} {account.available_balance}
                                        </div>
                                    ))
                            )}

                            <div>
                                <label htmlFor="to" className="block text-sm font-medium text-gray-900">
                                    To
                                </label>
                                <input
                                    id="to"
                                    type="text"
                                    placeholder="Enter recipient details"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                    value={recipientDetails}
                                    onChange={(e) => setRecipientDetails(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                                    Amount
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                    value={amount || ''}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                onClick={handlePayment}
                            >
                                Send Payment
                            </button>
                        </form>
                    )}

                    {selectedOption === "Credit Card" && (
                        <form className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-96">
                            <div>
                                <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                                    From
                                </label>
                                <select
                                    id="from"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                    onChange={(e) => setSelectedAccountId(e.target.value)}>
                                    <option value="">
                                        Select an account
                                    </option>
                                    {accounts.filter(x => x.subtype != "credit card").map((account) => (
                                        <option key={account.account_id} value={account.account_id}>
                                            {account.institution_name} - {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedAccountId && (
                                accounts
                                    .filter((account) => account.account_id == selectedAccountId)
                                    .map((account) => (
                                        <div key={account.id} className="text-gray-900">
                                            {"Account Balance: "} {account.available_balance}
                                        </div>
                                    ))
                            )}
                            <div>
                                <label htmlFor="card" className="block text-sm font-medium text-gray-700">
                                    Select Card
                                </label>
                                <select
                                    id="card"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                                    onChange={(e) => setSelectedAccountId(e.target.value)}
                                >
                                    <option value="">
                                        Select an account
                                    </option>
                                    {filteredAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.institution_name} - {account.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                    Amount
                                </label>
                                <input
                                    id="amount"
                                    type="number"
                                    placeholder="Enter amount"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    value={amount || ''}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                onClick={handlePayment}
                            >
                                Pay
                            </button>
                        </form>
                    )}
                    {showSuccessModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful</h2>
                                <p className="text-gray-600 mb-4">Your payment was sent successfully.</p>
                                <button
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                    onClick={handleModalClose}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}  
                </section>
            </div>
        </div>
    );
}
