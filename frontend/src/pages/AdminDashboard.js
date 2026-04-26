import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const isAdmin = localStorage.getItem("isAdmin");

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResolve = async (id) => {
    await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "PUT",
    });
    fetchComplaints();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/complaints/${id}`, {
      method: "DELETE",
    });
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔍 Filter + Search logic
  const filteredComplaints = complaints.filter((c) => {
    return (
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.issue.toLowerCase().includes(search.toLowerCase())) &&
      (filterCategory ? c.category === filterCategory : true) &&
      (filterStatus ? c.status === filterStatus : true)
    );
  });

  // 📊 Stats
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="text-center mb-3 text-white">Admin Dashboard</h2>

        {/* 📊 Stats */}
        <div className="row text-center mb-3">
          <div className="col">
            <div className="card p-2 bg-light">Total: {total}</div>
          </div>
          <div className="col">
            <div className="card p-2 bg-warning">Pending: {pending}</div>
          </div>
          <div className="col">
            <div className="card p-2 bg-success text-white">
              Resolved: {resolved}
            </div>
          </div>
        </div>

        {/* 🔍 Search + Filters */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search by name or issue"
              className="form-control"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option>Academic</option>
              <option>Infrastructure</option>
              <option>Hostel</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-control"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>

        {/* 📋 Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>RegNo</th>
                <th>Dept</th>
                <th>Year</th>
                <th>Section</th>
                <th>Category</th>
                <th>Issue</th>
                <th>Status</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.regNo}</td>
                    <td>{c.department}</td>
                    <td>{c.year}</td>
                    <td>{c.section}</td>

                    <td>
                      {c.category}
                      {c.category === "Hostel" && c.hostelName && (
                        <div style={{ fontSize: "12px" }}>
                          🏠 {c.hostelName}
                        </div>
                      )}
                    </td>

                    <td>{c.issue}</td>

                    <td>
                      <span
                        className={
                          c.status === "Resolved"
                            ? "badge bg-success"
                            : "badge bg-danger"
                        }
                      >
                        {c.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td>
                        {c.status === "Pending" && (
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleResolve(c._id)}
                          >
                            ✔
                          </button>
                        )}

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(c._id)}
                        >
                          🗑
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ComplaintList;