/**
 * Modal Component
 * @param {boolean} isOpen
 */

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white text-black p-6 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
}

export default Modal;