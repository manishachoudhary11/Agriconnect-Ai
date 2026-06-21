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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-green-700 mb-10">
          AgriConnect UI Library
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-bold text-xl mb-5">
              Button
            </h2>

            <Button
              text="Open Modal"
              onClick={() => setShowModal(true)}
            />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-bold text-xl mb-5">
              Input
            </h2>

            <Input placeholder="Enter crop name" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-bold text-xl mb-5">
              Toast
            </h2>

            <Toast message="Prediction Successful" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="font-bold text-xl mb-5">
              Loader
            </h2>

            <Loader />
          </div>

        </div>

        <Modal isOpen={showModal}>
          <h2 className="text-2xl font-bold">
            AI Recommendation
          </h2>

          <p className="mt-4">
            Rice is recommended for your soil.
          </p>
        </Modal>

      </div>
    </div>
  );
}

export default ComponentsDemo;