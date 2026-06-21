/**
 * Toast Component
 * @param {string} message
 */

function Toast({ message }) {
  return (
    <div className="bg-green-500 text-white p-3 rounded">
      {message}
    </div>
  );
}

export default Toast;