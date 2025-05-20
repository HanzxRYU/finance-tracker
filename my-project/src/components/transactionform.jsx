import React from "react";
import { Trash2, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionList({ transactions, onDeleteTransaction }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">
        Belum ada transaksi.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Daftar Transaksi</h2>
      <ul className="space-y-3">
        <AnimatePresence>
          {transactions.map((tx) => (
            <motion.li
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                {tx.type === "income" ? (
                  <ArrowDownCircle className="text-green-600" />
                ) : (
                  <ArrowUpCircle className="text-red-600" />
                )}
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p
                    className={`text-sm ${
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(tx.amount)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onDeleteTransaction(tx.id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Hapus transaksi"
              >
                <Trash2 />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
