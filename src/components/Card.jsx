function Card({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-3 text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default Card;