import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Login() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col justify-center items-center px-6 bg-white dark:bg-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400">
          Login
        </h1>

        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Secure access to AgriConnect AI.
        </p>

        <form className="mt-6 w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded mb-4 text-black"
          />

          <button className="w-full bg-green-700 text-white py-3 rounded">
            Login
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Login;