const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div
      className={`p-4 bg-white shadow-lg rounded-lg mb-4 ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
            className="mr-4"
          />
          <span
            className={`text-lg ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
        </div>
        <div className="flex space-x-4">
          <button onClick={() => onEdit(task)} className="text-blue-500">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="text-red-500">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
