import React from "react";

function Insights({ transactions }) {

  const totals = {};
  transactions.forEach(t => {
    if (t.type === "expense") {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.keys(totals).reduce((a, b) =>
    totals[a] > totals[b] ? a : b, "-"
  );

  return (
    <div className="card p-3">
      <h5>Insights</h5>
      <p>Highest Spending: {highest}</p>
      <p>Total Transactions: {transactions.length}</p>
      <p>Suggestion: Reduce unnecessary expenses</p>
    </div>
  );
}

export default Insights;