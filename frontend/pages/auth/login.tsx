import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { login } from '../services/authService';

// Define the type for the form data
interface LoginFormInputs {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>(); // Pass the type here
  const router = useRouter();

  // Define the onSubmit function with the correct type
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data.username, data.password);
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" required />
      <input {...register('password')} type="password" placeholder="Password" required />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
