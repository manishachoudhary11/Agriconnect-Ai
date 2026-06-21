import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 flex justify-center items-center px-6">

        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

          <h1 className="text-4xl font-bold text-green-700 text-center">
            Login
          </h1>

          <p className="text-center text-gray-500 mt-3">
            Access your AgriConnect account
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-lg mt-8"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-lg mt-4"
          />

          <button className="w-full bg-green-700 text-white py-4 rounded-lg mt-6">
            Login
          </button>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Login;