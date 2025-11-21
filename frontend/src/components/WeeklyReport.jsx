import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyReport = ({ reportData }) => {
    const data = [
        {
            name: 'This Week',
            Credit: reportData.credit || 0,
            Debit: reportData.debit || 0,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Weekly Report</h2>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Credit" fill="#82ca9d" />
                        <Bar dataKey="Debit" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Total Credit</p>
                    <p className="text-2xl font-bold text-green-800">${reportData.credit || 0}</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600 font-medium">Total Debit</p>
                    <p className="text-2xl font-bold text-red-800">${reportData.debit || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default WeeklyReport;
