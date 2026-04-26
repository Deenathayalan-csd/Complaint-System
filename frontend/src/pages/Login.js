import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.email || !user.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
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
        <div
          className="card p-4 shadow"
          style={{
            width: "350px",
            borderRadius: "10px"
          }}
        >
          <h3 className="text-center mb-3">Login</h3>

          <form onSubmit={handleLogin} autoComplete="off">
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>
                {error}
              </p>
            )}

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />

            <button className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;