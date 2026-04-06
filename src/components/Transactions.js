import React, { useState } from "react";

function Transactions({ transactions = [], setTransactions, role }) {

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const [timeFilter, setTimeFilter] = useState("all");

  // EDIT STATES
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense"
  });
  const filterByTime = (data) => {
    const now = new Date();

    return data.filter(t => {
      const date = new Date(t.date);

      if (timeFilter === "daily") {
        return date.toDateString() === now.toDateString();
      }

      if (timeFilter === "weekly") {
        const diff = (now - date) / (1000 * 60 * 60 * 24);
        return diff <= 7;
      }

      if (timeFilter === "monthly") {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }

      if (timeFilter === "yearly") {
        return date.getFullYear() === now.getFullYear();
      }

      return true;
    });
  };

  // FILTER LOGIC
  let filtered = filterByTime([...transactions]);

  if (typeFilter !== "all") {
    filtered = filtered.filter(t => t.type === typeFilter);
  }

  if (search) {
    filtered = filtered.filter(t =>
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // SORT LOGIC
  if (sort === "low") {
    filtered.sort((a, b) => a.amount - b.amount);
  } else if (sort === "high") {
    filtered.sort((a, b) => b.amount - a.amount);
  }

  //DELETE FUNCTION
  const deleteTx = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  //SAVE EDIT
  const saveEdit = () => {
    const updated = [...transactions];
    updated[editIndex] = {
      ...editData,
      amount: Number(editData.amount)
    };
    setTransactions(updated);
    setEditIndex(null);
  };

  return (
    <div>

      {/* 🔹 HEADER */}
      <h5 className="mb-3">Transactions</h5>

      {/* 🔹 FILTER BAR */}
      <div className="d-flex flex-wrap gap-2 mb-3">

        {/* TYPE FILTER */}
        <select
          className="form-select w-auto"
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="daily">Today</option>
          <option value="weekly">Last 7 Days</option>
          <option value="monthly">This Month</option>
          <option value="yearly">This Year</option>
        </select>

        {/* SEARCH */}
        <input
          className="form-control w-auto"
          placeholder="Search category"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* SORT */}
        <select
          className="form-select w-auto"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="none">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

      </div>

      {/* 🔹 TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Type</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>₹{t.amount}</td>
                  <td>{t.category}</td>
                  <td className={t.type === "income" ? "text-success" : "text-danger"}>
                    {t.type}
                  </td>

                  {role === "admin" && (
                    <td>
                      <div className="d-flex justify-content-center gap-2">

                        {/* EDIT */}
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => {
                            setEditIndex(i);
                            setEditData(t);
                          }}
                        >
                          Edit
                        </button>

                        {/* DELETE */}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTx(i)}
                        >
                          Delete
                        </button>

                      </div>
                    </td>
                  )}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editIndex !== null && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">

              <h5 className="mb-3">Edit Transaction</h5>

              <input
                type="date"
                className="form-control mb-2"
                value={editData.date}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
              />

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Amount"
                value={editData.amount}
                onChange={(e) =>
                  setEditData({ ...editData, amount: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Category"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
              />

              <select
                className="form-select mb-3"
                value={editData.type}
                onChange={(e) =>
                  setEditData({ ...editData, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={saveEdit}
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Transactions;