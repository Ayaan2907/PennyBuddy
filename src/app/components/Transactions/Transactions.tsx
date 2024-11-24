"use client";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect, useCallback } from "react";

const sampleTransactions = [
	{
		account_id: "nGkKy41bepIEz8v7X3Axho6QnbV5pDHAl7ggK",
		account_owner: null,
		amount: 25,
		authorized_date: "2024-11-19",
		authorized_datetime: null,
		category: ["Payment", "Credit Card"],
		category_id: "16001000",
		check_number: null,
		counterparties: [],
		date: "2024-11-20",
		datetime: null,
		iso_currency_code: "USD",
		location: {
			address: null,
			city: null,
			country: null,
			lat: null,
			lon: null,
			postal_code: null,
			region: null,
			store_number: null,
		},
		logo_url: null,
		merchant_entity_id: null,
		merchant_name: null,
		name: "CREDIT CARD 3333 PAYMENT *//",
		payment_channel: "other",
		payment_meta: {
			by_order_of: null,
			payee: null,
			payer: null,
			payment_method: null,
			payment_processor: null,
			ppd_id: null,
			reason: null,
			reference_number: null,
		},
		pending: false,
		pending_transaction_id: null,
		personal_finance_category: {
			confidence_level: "LOW",
			detailed: "LOAN_PAYMENTS_CREDIT_CARD_PAYMENT",
			primary: "LOAN_PAYMENTS",
		},
		personal_finance_category_icon_url:
			"https://plaid-category-icons.plaid.com/PFC_LOAN_PAYMENTS.png",
		transaction_code: null,
		transaction_id: "PxaqKrXj6eCAM3ympNVJIxpZar5Z5VFoVjdq9",
		transaction_type: "special",
		unofficial_currency_code: null,
		website: null,
	},
	{
		account_id: "GglpWwBRA3CwQMdpzoVNswAkp79Erqh6MNRRG",
		account_owner: null,
		amount: 5.4,
		authorized_date: "2024-11-19",
		authorized_datetime: null,
		category: ["Travel", "Taxi"],
		category_id: "22016000",
		check_number: null,
		counterparties: [
			{
				confidence_level: "VERY_HIGH",
				entity_id: "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
				logo_url:
					"https://plaid-merchant-logos.plaid.com/uber_1060.png",
				name: "Uber",
				phone_number: null,
				type: "merchant",
				website: "uber.com",
			},
		],
		date: "2024-11-20",
		datetime: null,
		iso_currency_code: "USD",
		location: {
			address: null,
			city: null,
			country: null,
			lat: null,
			lon: null,
			postal_code: null,
			region: null,
			store_number: null,
		},
		logo_url: "https://plaid-merchant-logos.plaid.com/uber_1060.png",
		merchant_entity_id: "eyg8o776k0QmNgVpAmaQj4WgzW9Qzo6O51gdd",
		merchant_name: "Uber",
		name: "Uber 063015 SF**POOL**",
		payment_channel: "online",
		payment_meta: {
			by_order_of: null,
			payee: null,
			payer: null,
			payment_method: null,
			payment_processor: null,
			ppd_id: null,
			reason: null,
			reference_number: null,
		},
		pending: false,
		pending_transaction_id: null,
		personal_finance_category: {
			confidence_level: "VERY_HIGH",
			detailed: "TRANSPORTATION_TAXIS_AND_RIDE_SHARES",
			primary: "TRANSPORTATION",
		},
		personal_finance_category_icon_url:
			"https://plaid-category-icons.plaid.com/PFC_TRANSPORTATION.png",
		transaction_code: null,
		transaction_id: "BMnQpwdvAlTRyjDbdlwKUjEPqWLPLwt4VayD9",
		transaction_type: "special",
		unofficial_currency_code: null,
		website: "uber.com",
	},
	{
		account_id: "yXQj4dzDy3C53BwA7xqgsx7jLZN4KWu461ppo",
		account_owner: null,
		amount: 5850,
		authorized_date: null,
		authorized_datetime: null,
		category: ["Transfer", "Debit"],
		category_id: "21006000",
		check_number: null,
		counterparties: [],
		date: "2024-11-19",
		datetime: null,
		iso_currency_code: "USD",
		location: {
			address: null,
			city: null,
			country: null,
			lat: null,
			lon: null,
			postal_code: null,
			region: null,
			store_number: null,
		},
		logo_url: null,
		merchant_entity_id: null,
		merchant_name: null,
		name: "ACH Electronic CreditGUSTO PAY 123456",
		payment_channel: "online",
		payment_meta: {
			by_order_of: null,
			payee: null,
			payer: null,
			payment_method: "ACH",
			payment_processor: null,
			ppd_id: null,
			reason: null,
			reference_number: null,
		},
		pending: false,
		pending_transaction_id: null,
		personal_finance_category: {
			confidence_level: "LOW",
			detailed: "GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING",
			primary: "GENERAL_SERVICES",
		},
		personal_finance_category_icon_url:
			"https://plaid-category-icons.plaid.com/PFC_GENERAL_SERVICES.png",
		transaction_code: null,
		transaction_id: "oG3rlbNWQXIaBk879V1ohy65XVZ5ZJHoGA96e",
		transaction_type: "special",
		unofficial_currency_code: null,
		website: null,
	},
	{
		account_id: "bGA1LpQwr3IzBQVJZxbaS45Mw7EazVumb9rr3",
		account_owner: null,
		amount: 1000,
		authorized_date: null,
		authorized_datetime: null,
		category: ["Transfer", "Deposit"],
		category_id: "21007000",
		check_number: null,
		counterparties: [],
		date: "2024-11-19",
		datetime: null,
		iso_currency_code: "USD",
		location: {
			address: null,
			city: null,
			country: null,
			lat: null,
			lon: null,
			postal_code: null,
			region: null,
			store_number: null,
		},
		logo_url: null,
		merchant_entity_id: null,
		merchant_name: null,
		name: "CD DEPOSIT .INITIAL.",
		payment_channel: "other",
		payment_meta: {
			by_order_of: null,
			payee: null,
			payer: null,
			payment_method: null,
			payment_processor: null,
			ppd_id: null,
			reason: null,
			reference_number: null,
		},
		pending: false,
		pending_transaction_id: null,
		personal_finance_category: {
			confidence_level: "LOW",
			detailed: "GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE",
			primary: "GENERAL_MERCHANDISE",
		},
		personal_finance_category_icon_url:
			"https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png",
		transaction_code: null,
		transaction_id: "eGkog6Qy3aIXdPVDl1ayCo5mb6qmqjfrePDA5",
		transaction_type: "special",
		unofficial_currency_code: null,
		website: null,
	}
];

const CONSTANT_CHIP_COLOR_PALLET = [
	"bg-blue-100 text-blue-800",
	"bg-green-100 text-green-800",
	"bg-yellow-100 text-yellow-800",
	"bg-red-100 text-red-800",
	"bg-indigo-100 text-indigo-800",
	"bg-purple-100 text-purple-800",
	"bg-pink-100 text-pink-800",
	"bg-teal-100 text-teal-800",
	"bg-orange-100 text-orange-800",
	"bg-cyan-100 text-cyan-800",
	"bg-lime-100 text-lime-800",
	"bg-amber-100 text-amber-800",
	"bg-emerald-100 text-emerald-800",
	"bg-fuchsia-100 text-fuchsia-800",
	"bg-rose-100 text-rose-800",
	"bg-sky-100 text-sky-800",
];


// Modal Component (need to implement independently for now it is in the same file)
const TransactionDetailsModal = ({ transaction, onClose }: any) => {
	if (!transaction) return null;
	const formatValue = (value: any) => (value ? value : "Unknown");
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl p-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[80vh] overflow-auto space-y-8 mb-4">

				{/* Modal Header */}
				<div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
					<div className="flex items-center space-x-4">

						<img
							src={transaction.logo_url || transaction.personal_finance_category_icon_url}
							alt="Merchant Logo"
							className="w-12 h-12 rounded-full"
						/>
						<h2 className="text-2xl font-semibold text-blue-600">Transaction Details</h2>
					</div>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Close
					</button>
				</div>

				<div className="space-y-8 text-black">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

						<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
							<h3 className="text-xl font-semibold text-blue-600">Overview</h3>
							<div className="space-y-3">
								<p><strong>Name:</strong> {formatValue(transaction.name)}</p>
								<p>
									<strong>Amount:</strong>{" "}
									<span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
										${transaction.amount.toFixed(2)}
									</span>
								</p>
								<p><strong>Date:</strong> {formatValue(transaction.date)}</p>
								<p><strong>Transaction Type:</strong> {formatValue(transaction.transaction_type)}</p>
							</div>
						</div>

						<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
							<h3 className="text-xl font-semibold text-blue-600">Details</h3>
							<div className="space-y-3">
								<p><strong>Categories:</strong> {transaction.category.join(', ').match(/.{1,20}/g).join('\n')}</p>
								<p><strong>Personal Finance Category:</strong> {formatValue(transaction.personal_finance_category.detailed).match(/.{1,20}/g).join('\n')}</p>
								<p><strong>Authorized Date:</strong> {formatValue(transaction.authorized_date)}</p>
								<p><strong>Payment Channel:</strong> {formatValue(transaction.payment_channel)}</p>
								<p><strong>Pending:</strong> {transaction.pending ? "Yes" : "No"}</p>
							</div>
						</div>
					</div>

					<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
						<h3 className="text-xl font-semibold text-blue-600">Additional Information</h3>
						<div className="space-y-3">
							<p><strong>Account ID:</strong> {formatValue(transaction.account_id)}</p>
							<p><strong>Category ID:</strong> {formatValue(transaction.category_id)}</p>
							<div>
								<strong>Location:</strong>
								<div className="ml-4 space-y-2">
									<p>Address: {formatValue(transaction.location.address)}</p>
									<p>City: {formatValue(transaction.location.city)}</p>
									<p>Region: {formatValue(transaction.location.region)}</p>
									<p>Country: {formatValue(transaction.location.country)}</p>
									<p>Postal Code: {formatValue(transaction.location.postal_code)}</p>
								</div>
							</div>
							<p><strong>Transaction ID:</strong> {formatValue(transaction.transaction_id)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// Helper function to get category-color mapping
const getCategoryColorMap = (transactions: any[]) => {
	const categories: string[] = [
		...new Set(transactions.flatMap((t: any) => t.category)),
	];

	return categories.reduce(
		(map: Record<string, string>, category: string, index: number) => {
			map[category] =
				CONSTANT_CHIP_COLOR_PALLET[
				index % CONSTANT_CHIP_COLOR_PALLET.length
				];
			return map;
		},
		{} as Record<string, string>
	);
};

export default function Transactions() {
	const [isOpen, setIsOpen] = useState(false);
	const [filteredTransactions, setFilteredTransactions] = useState(sampleTransactions);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [categoryColorMap, setCategoryColorMap] = useState<Record<string, string>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

	const [filter, setFilter] = useState({
		type: "all",
		sortByDate: "asc",
	});
	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		const categoryMap = getCategoryColorMap(sampleTransactions);
		setCategoryColorMap(categoryMap);
	}, []);

	// Apply pagination on the filtered transactions
	const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

	const currentTransactions = filteredTransactions.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	);

	const handlePageChange = (page: number) => setCurrentPage(page);

	const handleNextPage = () =>
		currentPage < totalPages && setCurrentPage(currentPage + 1);

	const handlePrevPage = () =>
		currentPage > 1 && setCurrentPage(currentPage - 1);

	// Handle filter change (for transaction type or date sort)
	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
	};

	// Handle category selection for filtering
	const handleCategorySelection = (category: string) => {
		setSelectedCategories((prevCategories) =>
			prevCategories.includes(category)
				? prevCategories.filter((cat) => cat !== category)
				: [...prevCategories, category]
		);
	};

	const applyFiltersAndSort = useCallback(() => {
		let filteredData = [...sampleTransactions];

		if (filter.type !== "all") {
			filteredData = filteredData.filter((t) =>
				filter.type === "credit" ? t.amount > 0 : t.amount < 0
			);
		}

		if (selectedCategories.length > 0) {
			filteredData = filteredData.filter((t) =>
				t.category.some((cat) => selectedCategories.includes(cat))
			);
		}

		filteredData.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return filter.sortByDate === "asc" ? dateA - dateB : dateB - dateA;
		});

		setFilteredTransactions(filteredData);
		setCurrentPage(1);
	}, [filter, selectedCategories]);

	useEffect(() => {
		applyFiltersAndSort();
	}, [applyFiltersAndSort]);

	const handleRowClick = (transaction: any) => {
		setSelectedTransaction(transaction);
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTransaction(null);
	};

	useEffect(() => {
		applyFiltersAndSort();

	}, [filter, selectedCategories]);

	return (
		<div className="bg-gray-50 min-h-screen">
			<Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

			<div className="pt-10">
				<section className="container mx-auto px-6 py-16 flex flex-col items-center">
					<h1 className="text-5xl font-extrabold text-gray-900 mb-6">
						Transactions
					</h1>

					{/* Filters Section */}
					<div className="mb-6 flex flex-col sm:flex-row sm:justify-between w-full gap-4">
						<div className="flex items-center space-x-4">
							<span className="font-medium text-sm text-gray-800">
								Transaction Type
							</span>
							<div className="flex space-x-2">
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="type"
										value="all"
										checked={filter.type === "all"}
										onChange={handleFilterChange}
										className="peer hidden"
									/>
									<span className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 peer-checked:bg-blue-500 peer-checked:text-white cursor-pointer">
										All
									</span>
								</label>
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="type"
										value="credit"
										checked={filter.type === "credit"}
										onChange={handleFilterChange}
										className="peer hidden"
									/>
									<span className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 peer-checked:bg-green-500 peer-checked:text-white cursor-pointer">
										Credit
									</span>
								</label>
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="type"
										value="debit"
										checked={filter.type === "debit"}
										onChange={handleFilterChange}
										className="peer hidden"
									/>
									<span className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 peer-checked:bg-red-500 peer-checked:text-white cursor-pointer">
										Debit
									</span>
								</label>
							</div>
						</div>

						{/* Date Sorting */}
						<div className="flex items-center space-x-4">
							<span className="font-medium text-sm text-gray-800">
								Sort By Date
							</span>
							<div className="flex space-x-2">
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="sortByDate"
										value="asc"
										checked={filter.sortByDate === "asc"}
										onChange={handleFilterChange}
										className="peer hidden"
									/>
									<span className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 peer-checked:bg-blue-500 peer-checked:text-white cursor-pointer">
										Ascending
									</span>
								</label>
								<label className="flex items-center space-x-2">
									<input
										type="radio"
										name="sortByDate"
										value="desc"
										checked={filter.sortByDate === "desc"}
										onChange={handleFilterChange}
										className="peer hidden"
									/>
									<span className="px-3 py-1 rounded-full bg-gray-200 text-sm text-gray-800 peer-checked:bg-indigo-500 peer-checked:text-white cursor-pointer">
										Descending
									</span>
								</label>
							</div>
						</div>
					</div>

					{/* Category Filter Chips */}
					<div className="flex flex-wrap gap-2 mb-4">
						{Object.keys(categoryColorMap).map((category) => (
							<button
								key={category}
								onClick={() =>
									handleCategorySelection(category)
								}
								className={`px-3 py-1 text-sm rounded-full border-2 ${selectedCategories.includes(category)
									? "bg-gray-200 text-gray-800 border-gray-800 font-bold"
									: `${categoryColorMap[category]} border-transparent`
									}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Transactions Table */}
					<div className="w-full overflow-x-auto">
						<table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg">
							<thead>
								<tr className="bg-gray-100 text-left text-gray-700">
									<th className="px-6 py-3">{" "}</th>
									<th className="px-6 py-3">
										Transaction Name
									</th>
									<th className="px-6 py-3">Amount</th>
									<th className="px-6 py-3">Type</th>
									<th className="px-6 py-3">Date</th>
									<th className="px-6 py-3">Categories</th>
								</tr>
							</thead>
							<tbody>
								{currentTransactions.map((transaction) => (
									<tr
										key={transaction.transaction_id}
										onClick={() => handleRowClick(transaction)}
										className={`cursor-pointer border-b hover:bg-gray-50 ${transaction.amount < 0
											? "text-red-600"
											: "text-green-600"
											}`}
									>
										<td className="px-6 py-4">
											<img
												src={
													transaction.logo_url ||
													transaction.personal_finance_category_icon_url ||
													"/default-logo.png"
												}
												alt="Logo"
												className="w-8 h-8 rounded-full object-contain"
											/>
										</td>
										<td className="px-6 py-4">
											{transaction.name}
										</td>
										<td className="px-6 py-4">
											${transaction.amount.toFixed(2)}
										</td>
										<td className="px-6 py-4">
											{transaction.transaction_type}
										</td>
										<td className="px-6 py-4">
											{transaction.date}
										</td>
										<td className="px-6 py-4">
											{transaction.category.map(
												(cat, index) => (
													<span
														key={index}
														className={`inline-flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-full ${categoryColorMap[cat]}`}
													>
														{cat}
													</span>
												)
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Pagination Controls */}
					<div className="flex items-center justify-center mt-4 flex-wrap gap-2">
						{/* Previous Page Button */}
						<button
							onClick={handlePrevPage}
							disabled={currentPage === 1}
							className="py-1 px-3 bg-blue-500 text-white text-sm rounded-md disabled:bg-gray-300"
						>
							Previous
						</button>

						{/* Page Number Buttons */}
						{[...Array(totalPages)].map((_, index) => (
							<button
								key={index}
								onClick={() => handlePageChange(index + 1)}
								className={`py-1 px-3 text-sm rounded-md ${currentPage === index + 1
									? "bg-blue-500 text-white"
									: "bg-gray-200 text-gray-700"
									}`}
							>
								{index + 1}
							</button>
						))}

						{/* Next Page Button */}
						<button
							onClick={handleNextPage}
							disabled={currentPage === totalPages}
							className="py-1 px-3 bg-blue-500 text-white text-sm rounded-md disabled:bg-gray-300"
						>
							Next
						</button>
					</div>
				</section>
			</div>
			{isModalOpen && <TransactionDetailsModal transaction={selectedTransaction} onClose={closeModal} />}

		</div>
	);
}
