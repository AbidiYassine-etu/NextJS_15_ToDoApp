import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

interface DecodedToken {
  userId: number;
  exp: number; // Add expiration to your token interface if you want to check expiration
}

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        console.log(decoded); 
        setUserId(decoded.sub);
        // Check if the token has expired (if the 'exp' field is present)
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.error('Token expired');
          router.push('/auth/login');
        } else {
          setUserId(decoded.userId);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
        router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  if (!isAuthenticated || userId === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskForm userId={userId} /> {/* Pass userId to TaskForm */}
      <TaskList userId={userId} /> {/* Pass userId to TaskList if needed */}
    </div>
  );
};

export default Home;
