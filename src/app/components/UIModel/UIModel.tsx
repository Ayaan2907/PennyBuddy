import { UIModelProps } from '@/app/models/transactionUtils';

export const UIModel = ({ transaction, account, onClose }: UIModelProps) => {
	if (!transaction && !account) return null;

	// Function to handle undefined or null values
	const formatValue = (value: any) => (value ? value : "Unknown");

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl p-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-[80vh] overflow-auto space-y-8 mb-4">

				{/* Modal Header */}
				<div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
					<div className="flex items-center space-x-4">
						<h2 className="text-2xl font-semibold text-blue-600">{transaction ? "Transaction Details" : "Account Details"}</h2>
					</div>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Close
					</button>
				</div>

				{/* Modal Content */}
				<div className="space-y-8 text-black">
					{transaction && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Transaction Overview */}
							<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
								<h3 className="text-xl font-semibold text-blue-600">Overview</h3>
								<div className="space-y-3">
									<p><strong>Name:</strong> {formatValue(transaction.name)}</p>
									<p>
										<strong>Amount:</strong>{" "}
										<span className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
											${transaction.amount}
										</span>
									</p>
									<p><strong>Transaction Type:</strong> {formatValue(transaction.transaction_type)}</p>
								</div>
							</div>

							{/* Transaction Details */}
							<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
								<h3 className="text-xl font-semibold text-blue-600">Details</h3>
								<div className="space-y-3">
									<p><strong>Categories:</strong> {transaction.category}</p>
									<p><strong>Authorized Date:</strong> {transaction.authorized_date ? new Date(transaction.authorized_date).toISOString().split('T')[0] : "N/A"}</p>
									<p><strong>Payment Channel:</strong> {formatValue(transaction.payment_channel)}</p>
								</div>
							</div>
						</div>
					)}

					{account && (
						<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
							{/* Account Details */}
							<h3 className="text-xl font-semibold text-blue-600">Account Details</h3>
							<div className="space-y-3">
								<p><strong>Institution:</strong> {formatValue(account.institution)}</p>
								<p><strong>Account Type:</strong> {formatValue(account.type)} - {formatValue(account.subtype)}</p>
								<p><strong>Balance:</strong> ${formatValue(account.b_current_balance)}</p>
								<p><strong>Available Balance:</strong> ${formatValue(account.b_available_balance)}</p>
								<p><strong>Currency:</strong> {formatValue(account.b_currency)}</p>
								<p><strong>User Name:</strong> {formatValue(account.user_name)}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};