function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-100 to-emerald-50 py-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-green-800 leading-tight">
          Smart Farming
          <br />
          Powered by AI
        </h1>

        <p className="mt-8 text-xl text-gray-700 max-w-3xl mx-auto">
          Empowering farmers with crop recommendations,
          weather intelligence, market insights and AI-driven
          agricultural decisions.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl shadow-lg">
            Get Started
          </button>

          <button className="border border-green-700 text-green-700 px-8 py-4 rounded-xl">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;