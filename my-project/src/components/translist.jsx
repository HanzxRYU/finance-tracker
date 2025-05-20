const TransactionList = ({ transactions, onDelete }) => {
  const formatCurrency = (num) => {
    return num.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Riwayat Transaksi</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi yang ditambahkan.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {transactions.map((t) => (
            <li
              key={t.id}
              className="flex flex-col md:flex-row md:items-center justify-between py-3 transition hover:bg-gray-50 px-2 rounded"
            >
              <div className="flex-1">
                <p className="font-medium">{t.description}</p>
                <p className="text-sm text-gray-500 capitalize">{t.type}</p>
              </div>
              <div className="flex items-center gap-4 mt-2 md:mt-0">
                <span
                  className={`text-lg font-bold ${
                    t.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {formatCurrency(t.amount)}
                </span>
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-500 text-white text-sm py-1 px-3 rounded-xl hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;