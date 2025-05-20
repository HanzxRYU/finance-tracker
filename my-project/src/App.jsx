import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import FinanceSummary from "./components/FinanceSummary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        📊 Personal Finance Tracker
      </h1>

      {/* Navbar sederhana */}
      <nav className="flex gap-4 justify-center mb-8">
        <Link to="/" className="text-blue-600 hover:underline">
          Ringkasan
        </Link>
        <Link to="/form" className="text-blue-600 hover:underline">
          Tambah Transaksi
        </Link>
        <Link to="/list" className="text-blue-600 hover:underline">
          Daftar Transaksi
        </Link>
      </nav>

      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={<FinanceSummary transactions={transactions} />}
        />
        <Route
          path="/form"
          element={<TransactionForm onAddTransaction={addTransaction} />}
        />
        <Route
          path="/list"
          element={
            <TransactionList
              transactions={transactions}
              onDeleteTransaction={deleteTransaction}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

