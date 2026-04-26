function CategorySelect({ value, onChange }) {
  return (
    <select name="category" value={value} onChange={onChange}>
      <option value="">Select Category</option>
      <option value="Hostel">Hostel</option>
      <option value="Academic">Academic</option>
      <option value="Infrastructure">Infrastructure</option>
    </select>
  );
}

export default CategorySelect;