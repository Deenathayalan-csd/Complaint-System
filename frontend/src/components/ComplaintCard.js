function ComplaintCard({ complaint }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h4>{complaint.issue}</h4>
      <p>{complaint.description}</p>
      <p>Status: {complaint.status}</p>
    </div>
  );
}

export default ComplaintCard;