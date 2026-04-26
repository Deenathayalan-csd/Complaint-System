import { useEffect, useState } from "react";
import Layout from "../components/Layout";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);

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
    try {
      await fetch(`http://localhost:5000/api/complaints/${id}`, {
        method: "PUT",
      });
      fetchComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Complaints List</h2>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Reg No</th>
                <th>Dept</th>
                <th>Year</th>
                <th>Section</th>
                <th>Category</th>
                <th>Issue</th>
                <th>Status</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {complaints.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 9 : 8} className="text-center">
                    No complaints found
                  </td>
                </tr>
              ) : (
                complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.regNo}</td>
                    <td>{c.department}</td>
                    <td>{c.year}</td>
                    <td>{c.section}</td>

                    {/* Category + Hostel */}
                    <td>
                      {c.category}
                      {c.category === "Hostel" && c.hostelName && (
                        <div style={{ fontSize: "12px" }}>
                          🏠 {c.hostelName}
                        </div>
                      )}
                    </td>

                    <td>{c.issue}</td>

                    {/* Status Badge */}
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

                    {/* Admin Action */}
                    {isAdmin && (
                      <td>
                        {c.status === "Pending" && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleResolve(c._id)}
                          >
                            Resolve
                          </button>
                        )}
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