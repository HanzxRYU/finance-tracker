import { useState } from "react";
import FinanceSummary from "./components/finance-sum";
import TransactionList from "./components/translist";

function App() {
  const [transactions, setTransactions] = useState([
    { id: "1", description: "Gaji", amount: 5000000, type: "pemasukan" },
    { id: "2", description: "Makan Siang", amount: 50000, type: "pengeluaran" },
  ]);

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <FinanceSummary transactions={transactions} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
