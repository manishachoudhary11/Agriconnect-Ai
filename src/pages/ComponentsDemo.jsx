import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

function ComponentsDemo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-8">
        UI Components Demo
      </h1>

      <div className="space-y-6">
        <Button
          text="Open Modal"
          onClick={() => setShowModal(true)}
        />

        <Input placeholder="Enter crop name" />

        <Toast message="Prediction Successful" />

        <Loader />

        <Modal isOpen={showModal}>
          <h2 className="text-xl font-bold mb-4">
            AI Recommendation
          </h2>

          <p>Rice is recommended for your soil.</p>

          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default ComponentsDemo;