export function FormField({label, children }) {
  return (
    <>
      <label>{label}</label>
      {children}
    </>
  );
}