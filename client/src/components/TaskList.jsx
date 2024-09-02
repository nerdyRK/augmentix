import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  console.log(tasks);

  return (
    <div>
      {tasks?.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
