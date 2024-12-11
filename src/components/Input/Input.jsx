export default function Input({ label, value, onChange }) {
  return (
    <div className="formControl">
      <label htmlFor={label} data-cy="input-label">
        {label} :
      </label>
      <input
        data-cy="input"
        value={value}
        type="text"
        id={label}
        name={label}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
