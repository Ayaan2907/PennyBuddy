"use client";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect, useMemo } from "react";
import { UIModel } from "../UIModel/UIModel";
import { fetchAccountTransactionsFromDB } from "@/app/services/plaidUtils";
import { TransactionObject, getCategoryColorMap } from "@/app/models/transactionUtils";
import CustomeTable from "@/app/components/Table/CustomeTable";
import TransactionFilters from "@/app/components/Filters/TransactionFilter";
import Pagination from "@/app/components/Filters/Pagination";

export default function Transactions() {
	const [isOpen, setIsOpen] = useState(false);
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
	const [searchTerm, setSearchTerm] = useState("");

	const ITEMS_PER_PAGE = 10;

	useEffect(() => {
		(async () => {
			const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
			if (!userId) return;

			try {
				const data = await fetchAccountTransactionsFromDB(userId);
				const transformedData = data.map((transaction: TransactionObject) => ({
					...transaction,
					amount: Number(transaction.amount),
					category: typeof transaction.category === 'string' ? transaction.category.split(/,\s*|\s*,\s*|\s*,/) : transaction.category,
				}));
				setTransactions(transformedData);
				console.log("Fetched transactions");

				const categoryMap = getCategoryColorMap(transformedData);
				setCategoryColorMap(categoryMap);
			} catch (error) {
				console.error("Failed to fetch transactions:", error);
			}
		})();
	}, []);

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
			const dateA = new Date(a.authorized_date).getTime();
			const dateB = new Date(b.authorized_date).getTime();
			return filter.sortByDate === "asc" ? dateA - dateB : dateB - dateA;
		});

		return filteredData;
	}, [transactions, filter, selectedCategories]);

	const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
	const currentPageTransactions = useMemo(
		() => filteredTransactions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
		[filteredTransactions, currentPage]
	);

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

	const toggleDropdown = (state: any) => setIsOpen(state);

	return (
		<div className="bg-gray-50 min-h-screen">
			<Navbar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

			<div className="pt-10">
				<section className="container mx-auto px-6 py-16 flex flex-col items-center">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
					<hr className="my-6 border-t border-gray-300 w-2/5" />

					{/* Filters Section */}
					<TransactionFilters
						filter={filter}
						setFilter={setFilter}
						selectedCategories={selectedCategories}
						setSelectedCategories={setSelectedCategories}
						categoryColorMap={categoryColorMap}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						isOpen={isOpen}
						toggleDropdown={toggleDropdown}
					/>

					<CustomeTable
						transactions={currentPageTransactions}
						handleRowClick={handleRowClick}
						categoryColorMap={categoryColorMap}
					/>

					{/* Pagination Controls */}
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
						onNextPage={handleNextPage}
						onPrevPage={handlePrevPage}
					/>
				</section>
				{isModalOpen && <UIModel transaction={activeTransactionRow ?? undefined} onClose={closeModal} />}
			</div>
		</div>
	);
}