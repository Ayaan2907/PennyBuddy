export interface TransactionObject {
	account_id: string;
	name: string;
	amount: number;
	authorized_date: string | null;
	category: string;
	category_id: string;
	date: string;
	logo_url: string | null;
	merchant_entity_id: string;
	merchant_name: string;
	payment_channel: string;
	pending: boolean;
	pending_transaction_id: string | null;
	personal_finance_category_icon_url: string;
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
