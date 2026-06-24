function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
    >
      {text}
    </button>
  );
}

export default Button;