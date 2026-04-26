function ComplaintTable({ complaints, onResolve }) {
  return (
    <div className="container mt-4">
      <div className="card shadow p-3">
        <h3 className="text-center">Complaints</h3>

        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.issue}</td>
                <td>
                  <span className={c.status === "Resolved" ? "text-success" : "text-danger"}>
                    {c.status}
                  </span>
                </td>

                <td>
                  {c.status === "Pending" && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => onResolve(c._id)}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintTable;