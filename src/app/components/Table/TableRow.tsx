// Row.tsx
import React from "react";
import { TransactionObject } from "@/app/models/transactionUtils";


interface RowProps {
  transaction: TransactionObject;
  handleRowClick: (transaction: TransactionObject) => void;
  categoryColorMap: Record<string, string>;
}

const Row: React.FC<RowProps> = ({ transaction, handleRowClick, categoryColorMap }) => {
  return (
    <tr
      onClick={() => handleRowClick(transaction)}
      className={`cursor-pointer border-b hover:bg-gray-50 ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}
    >
      <td className="px-6 py-4">
        <img
          src={transaction.logo_url || transaction.personal_finance_category_icon_url || "/default-logo.png"}
          alt="Logo"
          className="w-8 h-8 rounded-full object-contain"
        />
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