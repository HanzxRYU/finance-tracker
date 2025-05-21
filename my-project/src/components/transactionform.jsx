import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatAmountInput = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleAmountChange = (e) => {
    setAmount(formatAmountInput(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!description.trim()) {
      setError("Deskripsi wajib diisi.");
      return;
    }
    if (!amount.trim()) {
      setError("Jumlah wajib diisi.");
      return;
    }

    const cleanAmount = parseFloat(amount.replace(/\./g, ""));
    if (isNaN(cleanAmount) || cleanAmount <= 0) {
      setError("Jumlah harus angka positif.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: description.trim(),
      amount: cleanAmount,
      type,
    };

    onAddTransaction(newTransaction);
    navigate("/list");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto rounded-2xl bg-beige-50 p-8 shadow-lg"
      style={{ backgroundColor: "#f5f1e9" }} // beige tone bg
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-amber-900">
        Tambah Transaksi
      </h2>

      {error && (
        <div
          role="alert"
          className="mb-4 text-red-600 font-semibold text-center"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-amber-900"
          >
            Deskripsi
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            placeholder="Contoh: Gaji, Belanja, dll."
            autoComplete="off"
            required
          />
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block mb-2 font-semibold text-amber-900"
          >
            Jumlah (IDR)
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            placeholder="Contoh: 12.000"
            autoComplete="off"
            inputMode="numeric"
            required
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block mb-2 font-semibold text-amber-900"
          >
            Tipe
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            required
          >
            <option value="income">Pemasukan</option>
            <option value="expense">Pengeluaran</option>
          </select>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          className="w-full rounded-xl bg-amber-700 py-3 font-semibold text-white shadow-md hover:bg-amber-800 active:scale-95 transition-transform"
          aria-label="Simpan Transaksi"
        >
          Simpan Transaksi
        </motion.button>
      </form>
    </motion.div>
  );
}
