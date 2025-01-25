import { useForm, SubmitHandler } from 'react-hook-form';
import { createTask } from '../services/taskService';

interface TaskFormInputs {
  title: string;
  description: string;
}

const TaskForm = ({ userId }: { userId: number }) => {
  const { register, handleSubmit, reset } = useForm<TaskFormInputs>(); // Specify the type here

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      await createTask({ ...data, userId }); // Pass `userId` with task data
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Title" required />
      <textarea {...register('description')} placeholder="Description" required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
