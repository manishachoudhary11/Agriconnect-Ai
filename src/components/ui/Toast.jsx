/**
 * Toast Component
 * @param {string} message
 */

function Toast({ message }) {
  return (
    <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg">
      {message}
    </div>
  );
}

export default Toast;