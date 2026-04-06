import React from "react";

function Navbar({ role, setRole, setShowModal, darkMode, setDarkMode, user, setUser }) {

  return (
    <nav className="navbar custom-navbar px-4">

      <h4 className="fw-bold m-0">Finance Dashboard</h4>

      <div className="d-flex align-items-center gap-3">

        {role === "admin" && (
          <button className="btn btn-light btn-sm px-3"
            onClick={() => setShowModal(true)}>
            + Add
          </button>
        )}

        <select
          className="form-select form-select-sm"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          className="btn btn-dark btn-sm px-3"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light" : "Dark"}
        </button>

        <span className="fw-semibold">👤 {user.name}</span>

        <button className="btn btn-danger btn-sm px-3"
          onClick={() => setUser(null)}>
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;