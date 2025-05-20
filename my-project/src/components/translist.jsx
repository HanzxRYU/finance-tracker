import React from "react";
import { Trash } from "lucide-react";
import { motion } from "framer-motion";

const TransactionList = ({ transactions, onDelete }) => {
  const formatRupiah = (amount) =>
    amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Daftar Transaksi</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">Belum ada transaksi.</p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <motion.li
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between items-center p-4 border rounded"
            >
              <div>
                <p className="font-medium">{tx.description}</p>
                <p
                  className={`text-sm ${
                    tx.type === "pemasukan" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "pemasukan" ? "+" : "-"} {formatRupiah(tx.amount)}
                </p>
              </div>
              <button onClick={() => onDelete(tx.id)} className="text-red-500">
                <Trash className="w-5 h-5 hover:scale-110 transition" />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
