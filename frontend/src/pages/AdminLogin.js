import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function AdminLogin() {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isAdmin", "true");
       navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
  <Layout>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "80px"
      }}
    >
      <div className="container">
        <div
          className="card auth-card admin-card p-3"
          style={{ maxWidth: "400px", margin: "auto" }}
        >
          <h3 className="text-center">Admin Login</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Admin Email"
              onChange={(e) =>
                setAdmin({ ...admin, email: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) =>
                setAdmin({ ...admin, password: e.target.value })
              }
            />

            <button className="btn btn-warning w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
);
}

export default AdminLogin;