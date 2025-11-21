import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Transactions</h3>
            </div>
            <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-indigo-600 truncate">
                                    {transaction.description || "No Description"}
                                </div>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {transaction.type}
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        {transaction.category}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                        Amount: <span className="font-bold text-gray-900">${transaction.amount}</span>
                                    </p>
                                    <p className="ml-4">
                                        {transaction.date}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                    {transactions.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No transactions found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TransactionList;
