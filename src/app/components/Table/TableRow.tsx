// Row.tsx
import React from "react";
import { TransactionObject } from "@/app/models/transactionUtils";


interface RowProps {
  transaction: TransactionObject;
  handleRowClick: (transaction: TransactionObject) => void;
  categoryColorMap: Record<string, string>;
  index: number;
}

const Row: React.FC<RowProps> = ({index,  transaction, handleRowClick, categoryColorMap }) => {
  return (
    <tr
      onClick={() => handleRowClick(transaction)}
      className={`cursor-pointer border-b hover:bg-gray-50 ${transaction.amount < 0 ? "text-red-600" : "text-green-600"} text-center`}
    >
      <td className="px-6 py-4">
        <span className="text-gray-400">{index + 1}</span>
      </td>
      <td className="px-6 py-4">{transaction.name}</td>
      <td className="px-6 py-4">${isNaN(transaction.amount) ? "0.00" : transaction.amount.toFixed(2)}</td>
      <td className="px-6 py-4">{transaction.transaction_type}</td>
      <td className="px-6 py-4">{transaction.authorized_date ? new Date(transaction.authorized_date).toISOString().split('T')[0] : "N/A"}</td>
      <td className="px-6 py-4">
        {Array.isArray(transaction.category) && transaction.category.map((cat: string, index: number) => (
          <span key={index} className={`inline-flex items-center px-3 py-1 mr-2 text-sm font-medium rounded-full ${categoryColorMap[cat]}`}>
            {cat}
          </span>
        ))}
      </td>
    </tr>
  );
};

export default Row;