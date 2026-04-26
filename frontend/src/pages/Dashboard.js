import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Dashboard</h2>

      <Link to="/complaint">
        <button>New Complaint</button>
      </Link>

      <br /><br />

      <Link to="/list">
        <button>View Complaints</button>
      </Link>
    </div>
  );
}

export default Dashboard;