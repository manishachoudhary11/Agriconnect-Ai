/**
 * Button Component
 * @param {string} text
 */

function Button({ text }) {
  return (
    <button className="bg-green-600 text-white px-4 py-2 rounded">
      {text}
    </button>
  );
}

export default Button;