import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signup } from '../services/authService';

interface SignupFormInputs {
  username: string;
  password: string;
}

const Signup = () => {
  const { register, handleSubmit } = useForm<SignupFormInputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      await signup(data.username, data.password);
      router.push('/auth/login');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} placeholder="Username" required />
      <input {...register('password')} type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
