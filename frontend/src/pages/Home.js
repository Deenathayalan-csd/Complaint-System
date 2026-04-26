import { Link } from "react-router-dom";

function Home() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        backgroundImage: "url('/images/college2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        position: "relative"
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1
        }}
      ></div>

      {/* Content */}
      <div style={{ zIndex: 2 }}>
        <h1 className="fw-bold display-4 mb-3">
          KEC Complaint System
        </h1>

        <p className="lead">
          Submit and track complaints easily in a simple and transparent way.
        </p>

        <p>
          Report academic, infrastructure, and hostel-related issues with ease.
        </p>

        <p>Complaints are monitored and updated in real-time.</p>

        {/* Buttons */}
        {!isLoggedIn && (
          <div className="mt-3">
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success btn-lg">
              Signup
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <h4 className="mt-4 text-success">
            Welcome! You are logged in ✅
          </h4>
        )}

        {/* Features Section */}
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="p-3 bg-dark rounded shadow">
              <h5>📌 Easy Submission</h5>
              <p>Submit complaints in just a few clicks.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-dark rounded shadow">
              <h5>📊 Track Status</h5>
              <p>Monitor complaint progress anytime.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 bg-dark rounded shadow">
              <h5>⚡ Fast Resolution</h5>
              <p>Get quick responses from admin.</p>
            </div>
          </div>
        </div>

        {/* Footer line */}
        <p className="mt-5 small text-light">
          © 2026 KEC Complaint System | Built for students
        </p>
      </div>
    </div>
  );
}

export default Home;