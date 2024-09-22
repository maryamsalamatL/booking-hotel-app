export default function Input({ label, value, onChange }) {
  return (
    <div className="formControl">
      <label htmlFor={label}>{label} :</label>
      <input
        value={value}
        type="text"
        id={label}
        name={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
