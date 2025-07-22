export function Textarea({ value, onChange, placeholder, rows = 5, readOnly = false, className = '' }) {
  return (
    <textarea
      className={`w-full p-2 border rounded ${className}`}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}
