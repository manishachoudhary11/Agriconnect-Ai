/**
 * Input Component
 * @param {string} placeholder
 */

function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="border p-2 rounded w-full"
    />
  );
}

export default Input;