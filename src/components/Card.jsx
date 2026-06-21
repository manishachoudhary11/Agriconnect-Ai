function Card({ title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-2">
      <h2 className="text-2xl font-bold text-green-700">
        {title}
      </h2>

      <p className="mt-4 text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Card;