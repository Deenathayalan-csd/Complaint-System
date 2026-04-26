import { useState } from "react";
import Layout from "../components/Layout";

function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    regNo: "",
    department: "",
    year: "",
    section: "",
    category: "",
    hostelName: "",
    issue: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const nameRegex = /^[A-Za-z.\s]+$/;
    const regNoRegex = /^[A-Za-z0-9]+$/;
    const deptRegex = /^[A-Za-z\s]+$/;
    const issueRegex = /^[A-Za-z0-9\s]+$/;

    // ✅ Required fields
    if (
      !form.name ||
      !form.regNo ||
      !form.department ||
      !form.year ||
      !form.section ||
      !form.category ||
      !form.issue
    ) {
      setError("All fields are required (except description)");
      return;
    }

    // ✅ Hostel validation
    if (form.category === "Hostel" && !form.hostelName) {
      setError("Hostel Name is required");
      return;
    }

    // ✅ Regex validations
    if (!nameRegex.test(form.name)) {
      setError("Name should contain only letters and dot (.)");
      return;
    }

    if (!regNoRegex.test(form.regNo)) {
      setError("Register Number should contain only letters and numbers");
      return;
    }

    if (!deptRegex.test(form.department)) {
      setError("Department should contain only letters");
      return;
    }

    if (!issueRegex.test(form.issue)) {
      setError("Issue should not contain special characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Complaint submitted successfully ✅");

        // reset form
        setForm({
          name: "",
          regNo: "",
          department: "",
          year: "",
          section: "",
          category: "",
          hostelName: "",
          issue: "",
          description: "",
        });
      } else {
        setError(data.message || "Submission failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="card auth-card1 p-3">
          <h3 className="text-center mb-2">Submit Complaint</h3>

          {error && <p className="error-text">{error}</p>}

          {success && (
            <p style={{ color: "green", textAlign: "center" }}>
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <input
              type="text"
              placeholder="Name *"
              className="form-control mb-2"
              value={form.name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z.\s]*$/.test(value)) {
                  setForm({ ...form, name: value });
                }
              }}
            />

            {/* REG NO */}
            <input
              type="text"
              placeholder="Register No *"
              className="form-control mb-2"
              value={form.regNo}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z0-9]*$/.test(value)) {
                  setForm({ ...form, regNo: value });
                }
              }}
            />

            {/* DEPARTMENT */}
            <input
              type="text"
              placeholder="Department *"
              className="form-control mb-2"
              value={form.department}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setForm({ ...form, department: value });
                }
              }}
            />

            {/* YEAR */}
            <select
              className="form-control mb-2"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value })
              }
            >
              <option value="">-- Select Year --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>

            {/* SECTION */}
            <select
              className="form-control mb-2"
              value={form.section}
              onChange={(e) =>
                setForm({ ...form, section: e.target.value })
              }
            >
              <option value="">-- Select Section --</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            {/* CATEGORY */}
            <div className="mb-2">
              <label><b>Category *</b></label>
              <select
                className="form-control mt-1"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">-- Select Category --</option>
                <option value="Academic">Academic</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Hostel">Hostel</option>
              </select>
            </div>

            {/* HOSTEL NAME (conditional) */}
            {form.category === "Hostel" && (
              <input
                type="text"
                placeholder="Hostel Name *"
                className="form-control mb-2"
                value={form.hostelName}
                onChange={(e) =>
                  setForm({ ...form, hostelName: e.target.value })
                }
              />
            )}

            {/* ISSUE */}
            <input
              type="text"
              placeholder="Issue *"
              className="form-control mb-2"
              value={form.issue}
              onChange={(e) =>
                setForm({ ...form, issue: e.target.value })
              }
            />

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description (optional)"
              className="form-control mb-3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <button className="btn btn-primary w-100">
              Submit Complaint
            </button>

          </form>
        </div>
      </div>
    </Layout>
  );
}

export default ComplaintForm;