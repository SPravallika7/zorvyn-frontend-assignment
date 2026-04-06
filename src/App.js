import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddTransactionModal from "./components/AddTransactionModal";
import Auth from "./components/Auth";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [transactions, setTransactions] = useState([
    { date: "2026-04-02", amount: 35000, category: "Salary", type: "income" },
    { date: "2026-04-04", amount: 7000, category: "Travel", type: "expense" },
    { date: "2026-04-06", amount: 6000, category: "Rent", type: "expense" },
    { date: "2026-04-02", amount: 2000, category: "Food", type: "expense" },
  ]);

  // 🌙 DARK MODE FIX (REAL FIX)
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (!user) {
    return <Auth setUser={setUser} setRole={setRole} />;
  }

  return (
    <>
      <Navbar
        role={role}
        setRole={setRole}
        setShowModal={setShowModal}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        setUser={setUser}
      />

      <Dashboard
        transactions={transactions}
        setTransactions={setTransactions}
        role={role}
      />

      <AddTransactionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        transactions={transactions}
        setTransactions={setTransactions}
      />
    </>
  );
}

export default App;