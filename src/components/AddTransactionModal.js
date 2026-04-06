import React, { useState } from "react";

function AddTransactionModal({ show, handleClose, transactions, setTransactions }) {

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "income"
  });

  if (!show) return null;

  const save = () => {
    setTransactions([...transactions, { ...form, amount: Number(form.amount) }]);
    handleClose();
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4 rounded">

          <h5 className="mb-3">Add Transaction</h5>

          <input type="date" className="form-control mb-2"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input className="form-control mb-2" placeholder="Amount"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input className="form-control mb-2" placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select className="form-control mb-3"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
<div className="d-flex justify-content-end gap-2"> <button className="btn btn-success me-2" onClick={save}>Save</button>
          <button className="btn btn-secondary" onClick={handleClose}>Cancel</button></div>
         

        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;