import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

function ComponentsDemo({ darkMode }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className={`min-h-screen flex justify-center py-10 px-4 transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl ${
          darkMode
            ? "bg-slate-900"
            : "bg-white"
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold">
            UI Component
            <br />
            Showcase
          </h1>

          <div
  className={`px-4 py-2 rounded-xl ${
    darkMode
      ? "bg-gray-700 text-white"
      : "bg-gray-200 text-black"
  }`}
>
  {darkMode ? "🌙 Dark" : "☀ Light"}
</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button className="bg-green-600 text-white py-3 rounded-xl font-semibold">
            Primary
          </button>

          <button className="bg-gray-600 text-white py-3 rounded-xl font-semibold">
            Secondary
          </button>

          <button className="border-2 border-green-600 text-green-600 py-3 rounded-xl font-semibold">
            Outline
          </button>

          <button className="bg-green-800 text-green-300 py-3 rounded-xl font-semibold opacity-70">
            Disabled
          </button>
        </div>

        {/* Email */}
        <div className="mb-6">
         <label
  className={`block mb-2 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>
            Email Address
          </label>

          <Input placeholder="Enter your email" />
        </div>

        {/* Password */}
        <div className="mb-6">
         <label
  className={`block mb-2 ${
    darkMode ? "text-gray-300" : "text-gray-600"
  }`}
>   
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full p-4 rounded-xl border border-red-500 bg-transparent"
          />

          <p className="text-red-500 text-sm mt-2">
            Password is required
          </p>
        </div>

        {/* Loader */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Loader Component
          </h2>

          <Loader />
        </div>

        {/* Toast */}
        <div className="mb-8">
          <Toast message="Prediction Successful" />
        </div>

        {/* Modal */}
        <Button
          text="Open Modal"
          onClick={() => setShowModal(true)}
        />

        <Modal isOpen={showModal}>
          <h2 className="text-2xl font-bold mb-4 text-black">
            AI Recommendation
          </h2>

          <p className="text-black">
            Rice is recommended for your soil.
          </p>

          <button
            onClick={() => setShowModal(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default ComponentsDemo;