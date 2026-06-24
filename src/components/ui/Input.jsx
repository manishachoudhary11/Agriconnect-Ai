/**
 * Input Component
 * @param {string} placeholder
 */

function Input({ placeholder }) {
  return (
    <input
      placeholder={placeholder}
      className="
        w-full
        p-4
        rounded-xl
        border
        border-gray-400
        bg-transparent
        text-inherit
        outline-none
        focus:border-green-500
      "
    />
  );
}

export default Input;