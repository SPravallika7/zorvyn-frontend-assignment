import React, { useState } from "react";

function Auth({ setUser, setRole }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "viewer"
  });

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Fill all fields");
      return;
    }

    setUser({ name: form.name });
    setRole(form.role);
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2 className="mb-3 text-center">Finance Dashboard</h2>

        <input
          className="form-control mb-3"
          placeholder="Enter Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Enter Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <select
          className="form-select mb-3"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Enter Dashboard
        </button>

      </div>

    </div>
  );
}

export default Auth;