"use client";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect, useCallback, useMemo } from "react";
import { TransactionDetailsModel } from "../UiModel/TransactionDetailsModel";
import { fetchAccountTransactionsFromDB } from "@/app/services/plaidUtils";
import { TransactionObject, getCategoryColorMap } from "@/app/models/transactionUtils";
import CustomeTable from "@/app/components/Table/CustomeTable";

export default function Transactions() {
	const [transactions, setTransactions] = useState<TransactionObject[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [categoryColorMap, setCategoryColorMap] = useState<Record<string, string>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeTransactionRow, setActiveTransactionRow] = useState<TransactionObject | null>(null);
	const [filter, setFilter] = useState({
		type: "all",
		sortByDate: "asc",
	});

	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		(async () => {
			const userId = localStorage.getItem("userId");
			if (!userId) return;

			try {
				const data = await fetchAccountTransactionsFromDB(userId);
				const transformedData = data.map((transaction: TransactionObject) => ({
					...transaction,
					amount: Number(transaction.amount),
					category: transaction.category.split(/,\s*|\s*,\s*|\s*,/),
				}));
				setTransactions(transformedData);
				console.log("Fetched transactions:", transformedData);

				const categoryMap = getCategoryColorMap(data);
				setCategoryColorMap(categoryMap);
			} catch (error) {
				console.error("Failed to fetch transactions:", error);
			}
		})();

	}, []);

	// Memoize filtered transactions based on filter and selected categories
	const filteredTransactions = useMemo(() => {
		let filteredData = [...transactions];

		if (filter.type !== "all") {
			filteredData = filteredData.filter((t) =>
				filter.type === "credit" ? t.amount > 0 : t.amount < 0
			);
		}

		if (selectedCategories.length > 0) {
			filteredData = filteredData.filter((t) =>
				Array.isArray(t.category) && t.category.some((cat) => selectedCategories.includes(cat))
			);
		}

		filteredData.sort((a, b) => {
			const dateA = new Date(a.date).getTime();
			const dateB = new Date(b.date).getTime();
			return filter.sortByDate === "asc" ? dateA - dateB : dateB - dateA;
		});

		return filteredData;
	}, [transactions, filter, selectedCategories]);


	// Handle filter change
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

	const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
	const currentPageTransactions = useMemo(
		() => filteredTransactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
		[filteredTransactions, currentPage]
	);

	// Pagination handlers
	const handlePageChange = (page: number) => setCurrentPage(page);
	const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
	const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

	const handleRowClick = (transaction: TransactionObject) => {
		setActiveTransactionRow(transaction);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setActiveTransactionRow(null);
	};


	return (
		<div className="bg-gray-50 min-h-screen">
			<Navbar isOpen={true} toggle={() => false} />

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

					<CustomeTable transactions={currentPageTransactions} handleRowClick={handleRowClick} categoryColorMap={categoryColorMap} />

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
			{isModalOpen && < TransactionDetailsModel transaction={activeTransactionRow} onClose={closeModal} />}

		</div>
	);
}
