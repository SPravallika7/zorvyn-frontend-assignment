import React from "react";
import Transactions from "./Transactions";
import Insights from "./Insights";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import { format } from "date-fns";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336"];

function Dashboard({ transactions, setTransactions, role }) {

  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;
  const savings = income ? ((balance / income) * 100).toFixed(1) : 0;

  const lineData = transactions.map(t => ({
    name: format(new Date(t.date), "d-MMM"),
    value: t.amount
  }));

  const categoryMap = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map(k => ({
    name: k,
    value: categoryMap[k]
  }));

  return (
    <div className="container mt-3">

      {/* CARDS */}
      <div className="row text-center">
        <div className="col card m-2 p-3">Balance ₹{balance}</div>
        <div className="col card m-2 p-3">Income ₹{income}</div>
        <div className="col card m-2 p-3">Expense ₹{expense}</div>
        <div className="col card m-2 p-3">Savings {savings}%</div>
      </div>

      {/* TRANSACTIONS + INSIGHTS */}
      <div className="row mt-3">

        {/* LEFT → TRANSACTIONS */}
        <div className="col-lg-8 mb-3">
          <div className="card p-3 h-100">
            <Transactions
              transactions={transactions}
              setTransactions={setTransactions}
              role={role}
            />
          </div>
        </div>

        {/* RIGHT → INSIGHTS */}
        <div className="col-lg-4 mb-3">
          <div className="card p-3 h-100">
            <Insights transactions={transactions} />
          </div>
        </div>

      </div>

      {/* CHARTS */}
      <div className="row mt-4">

        {/* LINE CHART */}
        <div className="col-md-6 mb-3">
          <div className="card p-3 h-100">
            <h6 className="mb-3">Balance Trend</h6>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="#4CAF50" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* PIE CHART */}
        <div className="col-md-6 mb-3">
          <div className="card p-3 h-100">
            <h6 className="mb-3">Category Breakdown</h6>

            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  label={({ name }) => name}   // ✅ SHOW CATEGORY NAME
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>


    </div>
  );
}
export default Dashboard;