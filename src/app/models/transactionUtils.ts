export interface TransactionObject {
	account_id: string;
	name: string;
	amount: number;
	authorized_date: string | Date | number ;
	category: string | string[];
	category_id: string;
	merchant_entity_id: string;
	merchant_name: string;
	payment_channel: string;
	transaction_id: string;
	transaction_type: string;
}

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
	"bg-violet-100 text-violet-800",
	"bg-rose-200 text-rose-900",
	"bg-amber-200 text-amber-900",
	"bg-lime-200 text-lime-900",
	"bg-teal-200 text-teal-900",
	"bg-cyan-200 text-cyan-900",
	"bg-sky-200 text-sky-900",
	"bg-indigo-200 text-indigo-900",
	"bg-purple-200 text-purple-900",
	"bg-pink-200 text-pink-900",
];

export const tailwindToRgbColors: string[] = [
	"rgb(219, 234, 254)",
	"rgb(220, 252, 231)",
	"rgb(254, 243, 199)",
	"rgb(254, 226, 226)",
	"rgb(224, 231, 255)",
	"rgb(243, 232, 255)",
	"rgb(252, 231, 243)",
	"rgb(204, 251, 241)",
	"rgb(255, 237, 213)",
	"rgb(207, 250, 254)",
	"rgb(240, 253, 244)",
	"rgb(255, 251, 235)",
	"rgb(209, 250, 229)",
	"rgb(250, 232, 255)",
	"rgb(255, 228, 230)",
	"rgb(224, 242, 254)",
	"rgb(233, 213, 255)",
	"rgb(254, 205, 211)",
	"rgb(255, 237, 213)",
	"rgb(240, 253, 244)",
	"rgb(204, 251, 241)",
];


// Helper function to get category-color mapping
export const getCategoryColorMap = (transactions: TransactionObject[]) => {
	const categories: string[] = [
		...new Set(transactions.flatMap((t: TransactionObject) => t.category)),
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


export interface AccountBalance {
	b_available_balance: string | null;
	b_current_balance: string;
	b_currency: string;
	type: string;
	subtype: string;
	user_id: number;
	user_name: string;
	institution: string;
	account_id: string;
}

export interface UIModelProps {
	transaction?: TransactionObject;  // Transaction data
	account?: AccountBalance;      // Account data
	onClose: () => void;  // Function to close the modal
}



// chart props 
export interface PieChartProps {
	transactions: TransactionObject[];
}

export interface BarChartProps {
	accounts: AccountBalance[];
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
}

export interface TransactionFiltersProps {
	filter: {
	  type: string;
	  sortByDate: string;
	};
	setFilter: React.Dispatch<React.SetStateAction<{ type: string; sortByDate: string }>>;
	selectedCategories: string[];
	setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
	categoryColorMap: { [key: string]: string };
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	isOpen: boolean;
	toggleDropdown: (state: boolean) => void;
  }
  
