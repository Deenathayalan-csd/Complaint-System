import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.name || !user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    if (!emailRegex.test(user.email)) {
      setError("Enter a valid email");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
  setSuccess("Signup successful ✅");

  setUser({ name: "", email: "", password: "" });

  navigate("/login"); // ✅ instant redirect
}else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
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
        <div
          className="card p-4 shadow"
          style={{
            width: "350px",
            borderRadius: "10px"
          }}
        >
          <h3 className="text-center mb-3">Signup</h3>

          <form onSubmit={handleSubmit} autoComplete="off">

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>
                {error}
              </p>
            )}

            {success && (
              <p style={{ color: "green", textAlign: "center" }}>
                {success}
              </p>
            )}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />

            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />

            <button
              className="btn btn-success w-100"
              disabled={
                loading ||
                !user.name ||
                !user.email ||
                !user.password
              }
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;