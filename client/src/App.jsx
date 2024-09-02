import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post("/api/tasks", task);
      setTasks([...tasks, response.data]);
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Error adding task");
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await axios.put(
        `/api/tasks/${updatedTask._id}`,
        updatedTask
      );
      setTasks(
        tasks.map((task) =>
          task._id === updatedTask._id ? response.data : task
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(updatedTask);
    } catch (error) {
      toast.error("Error updating task status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">To-Do List</h1>
        <AddTask addTask={addTask} />
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
        />
      </div>

      {editingTask && (
        <EditTask
          task={editingTask}
          updateTask={updateTask}
          closeModal={() => setEditingTask(null)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
