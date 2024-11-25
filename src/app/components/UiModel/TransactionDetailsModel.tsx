
export const TransactionDetailsModel = ({ transaction, onClose }: any) => {
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
										${transaction.amount}
									</span>
								</p>
								<p><strong>Date:</strong> {formatValue(transaction.date)}</p>
								<p><strong>Transaction Type:</strong>
									{formatValue(transaction.transaction_type)}</p>
							</div>
						</div>

						<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
							<h3 className="text-xl font-semibold text-blue-600">Details</h3>
							<div className="space-y-3">
								<p><strong>Categories:</strong> {transaction.category.join(', ').match(/.{1,20}/g).join('\n')}</p>
								<p><strong>Authorized Date:</strong> {formatValue(transaction.authorized_date)}</p>
								<p><strong>Payment Channel:</strong> {formatValue(transaction.payment_channel)}</p>
							</div>
						</div>
					</div>

					<div className="p-8 border-2 border-blue-200 bg-blue-50 rounded-lg space-y-6">
						<h3 className="text-xl font-semibold text-blue-600">Additional Information</h3>
						<div className="space-y-3">
							<p><strong>Account ID:</strong> {formatValue(transaction.account_id)}</p>
							<p><strong>Category ID:</strong> {formatValue(transaction.category_id)}</p>
							<p><strong>ISO Currency Code:</strong> {formatValue(transaction.iso_currency_code)}</p>
							<p><strong>Transaction ID:</strong> {formatValue(transaction.transaction_id)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};