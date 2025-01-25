import { useEffect, useState } from 'react';
import { deleteTask, getTasks, updateTask } from '../services/taskService';

const TaskList = ({ userId }: { userId: number }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await getTasks(userId);
    setTasks(data);
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleToggle = async (id: number, isCompleted: boolean) => {
    await updateTask(id, !isCompleted);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map((task: any) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.isCompleted ? 'Completed' : 'Incomplete'}</p>
          <button onClick={() => handleToggle(task.id, task.isCompleted)}>
            {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
