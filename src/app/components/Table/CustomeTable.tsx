// Table.tsx
import React from "react";
import { TransactionObject } from "@/app/models/transactionUtils";
import TableRow from "./TableRow";

interface TableProps {
  transactions: TransactionObject[];
  handleRowClick: (transaction: TransactionObject) => void;
  categoryColorMap: Record<string, string>;
}

const CustomeTable: React.FC<TableProps> = ({ transactions, handleRowClick, categoryColorMap }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-lg">
        <thead>
            <tr className="bg-gray-100 text-center text-gray-700">
            <th className="px-6 py-3">{" "}</th>
            <th className="px-6 py-3">Transaction Name</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Categories</th>
            </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.transaction_id}
              transaction={transaction}
              handleRowClick={handleRowClick}
              categoryColorMap={categoryColorMap}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomeTable;