/**
 * Input Component
 * @param {string} placeholder
 */

function Input({ placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="
        w-full
        p-4
        border
        border-gray-300
        rounded-xl
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        focus:border-green-500
        transition
      "
    />
  );
}

export default Input;