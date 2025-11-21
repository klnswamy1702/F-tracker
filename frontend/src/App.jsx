import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import WeeklyReport from './components/WeeklyReport';
import api from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [reportData, setReportData] = useState({ credit: 0, debit: 0 });

  const fetchData = async () => {
    try {
      const transactionsRes = await api.get('/transactions/');
      setTransactions(transactionsRes.data);

      const reportRes = await api.get('/reports/weekly');
      setReportData(reportRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
          Personal Finance Tracker
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TransactionForm onTransactionAdded={fetchData} />
            <TransactionList transactions={transactions} />
          </div>
          <div className="lg:col-span-1">
            <WeeklyReport reportData={reportData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
