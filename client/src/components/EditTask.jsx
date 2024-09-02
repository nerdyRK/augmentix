import { useState, useEffect } from "react";

const EditTask = ({ task, updateTask, closeModal }) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (task) setTitle(task.title);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...task, title });
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 text-lg border rounded-lg shadow-sm focus:outline-none"
          />
          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg"
            >
              Save
            </button>
            <button onClick={closeModal} className="text-red-500 py-2 px-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
