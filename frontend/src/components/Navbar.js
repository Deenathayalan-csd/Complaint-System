import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const isAdmin = localStorage.getItem("isAdmin");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">Complaint System</span>

      <div>

        {/* 🛡️ ADMIN NAVBAR */}
        {isAdmin ? (
  <>
    <Link to="/admin" className="btn btn-info me-2">
      All Complaints
    </Link>

    <button
      className="btn btn-danger"
      onClick={() => {
        localStorage.removeItem("isAdmin");
         navigate("/");
      }}
    >
      Logout
    </button>
  </>
) : isLoggedIn ? (

          /* 👤 USER NAVBAR */
          <>
            <Link to="/" className="btn btn-light me-2">
              Home
            </Link>

            <Link to="/complaint" className="btn btn-info me-2">
              Complaint
            </Link>

            <Link to="/list" className="btn btn-warning me-2">
              My Complaints
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : (

          /* 🔓 BEFORE LOGIN */
          <>
            <Link to="/" className="btn btn-light me-2">
              Home
            </Link>

            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>

            <Link to="/signup" className="btn btn-success me-2">
              Signup
            </Link>

            <Link to="/admin-login" className="btn btn-warning">
              Admin
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;