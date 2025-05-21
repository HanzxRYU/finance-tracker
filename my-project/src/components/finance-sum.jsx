import React from "react";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FinanceSummary({ transactions = [] }) {
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

  const numberAnimation = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  // Warna aksen utama, bisa disesuaikan
  const accentColor = "text-amber-700";
  const accentBg = "bg-amber-50";

  return (
    <motion.div
      className="bg-beige-50 p-8 rounded-2xl shadow-lg max-w-lg mx-auto"
      style={{ backgroundColor: "#f5f0e6" }} // Beige custom bg
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="region"
      aria-label="Ringkasan Keuangan"
    >
      <h2 className={`text-3xl font-extrabold mb-6 text-center ${accentColor}`}>
        Ringkasan Keuangan
      </h2>

      <div className="space-y-6">
        {/* Income */}
        <div
          className={`flex justify-between items-center rounded-lg ${accentBg} p-5 shadow-inner border border-amber-200`}
        >
          <div className={`flex items-center gap-3 ${accentColor}`}>
            <ArrowDownCircle size={32} />
            <span className="font-semibold text-lg select-none">Pemasukan</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={totalIncome}
              {...numberAnimation}
              className={`font-bold text-xl tabular-nums ${accentColor}`}
              aria-live="polite"
            >
              {formatCurrency(totalIncome)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Expense */}
        <div
          className={`flex justify-between items-center rounded-lg ${accentBg} p-5 shadow-inner border border-amber-200`}
        >
          <div className={`flex items-center gap-3 ${accentColor}`}>
            <ArrowUpCircle size={32} />
            <span className="font-semibold text-lg select-none">
              Pengeluaran
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={totalExpense}
              {...numberAnimation}
              className={`font-bold text-xl tabular-nums ${accentColor}`}
              aria-live="polite"
            >
              {formatCurrency(totalExpense)}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Balance */}
        <div
          className={`flex justify-between items-center rounded-lg p-6 shadow-lg border border-amber-300`}
          style={{ backgroundColor: "#fef9f4" }}
        >
          <div className={`flex items-center gap-3 ${accentColor}`}>
            <Wallet size={36} />
            <span className="font-extrabold text-2xl select-none">
              Saldo Akhir
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={balance}
              {...numberAnimation}
              className={`font-extrabold text-2xl tabular-nums ${accentColor}`}
              aria-live="polite"
            >
              {formatCurrency(balance)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
