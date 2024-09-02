import { useState } from "react";
import { toast } from "react-toastify";

const AddTask = ({ addTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }
    addTask({ title });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 text-lg border rounded-lg shadow-sm focus:outline-none"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg shadow-lg"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
