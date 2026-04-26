function StatusBadge({ status }) {
  return (
    <span style={{
      color: status === "Resolved" ? "green" : "red",
      fontWeight: "bold"
    }}>
      {status}
    </span>
  );
}

export default StatusBadge;