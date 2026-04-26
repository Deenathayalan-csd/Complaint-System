const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Debug middleware (VERY USEFUL)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ----------------------
// Models
// ----------------------
const complaintSchema = new mongoose.Schema({
  name: String,
  regNo: String,
  department: String,
  category: String,
  issue: String,
  description: String,
  status: {
    type: String,
    default: "Pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Complaint = mongoose.model("Complaint", complaintSchema);

// ----------------------
// Routes
// ----------------------
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" }); // ✅ JSON instead of text
});

// Create Complaint
app.post("/api/complaints", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Complaints
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Resolve Complaint
app.put("/api/complaints/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndUpdate(req.params.id, {
      status: "Resolved",
    });
    res.json({ message: "Complaint resolved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.delete("/api/complaints/:id", async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
// ----------------------
// Server Start
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});