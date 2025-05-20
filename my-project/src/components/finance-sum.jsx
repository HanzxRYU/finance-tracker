import React from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";

export default function FinanceSummary({ transactions }) {
  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Ringkasan Keuangan</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-green-600">
            <ArrowDownCircle />
            <span>Pemasukan:</span>
          </div>
          <span>{formatCurrency(totalIncome)}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-600">
            <ArrowUpCircle />
            <span>Pengeluaran:</span>
          </div>
          <span>{formatCurrency(totalExpense)}</span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <div className="flex items-center gap-2 text-blue-600">
            <Wallet />
            <span>Saldo Akhir:</span>
          </div>
          <span>{formatCurrency(balance)}</span>
        </div>
      </div>
    </div>
  );
}
