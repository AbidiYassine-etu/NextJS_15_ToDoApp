import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

interface DecodedToken {
  userId: number;
  exp: number;
}

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsAuthenticated(false); // Update authentication state
    setUserId(null); // Clear userId
    router.push('/auth/login'); // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken & { sub: number } = jwtDecode(token);
        console.log(decoded);

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
          console.error('Token expired');
          handleLogout(); // Call logout if the token is expired
        } else {
          setUserId(decoded.sub);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
        handleLogout(); // Call logout if the token is invalid
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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Your Tasks</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Logout
        </button>
      </header>
      <TaskForm userId={userId} /> {/* Pass userId to TaskForm */}
      <TaskList userId={userId} /> {/* Pass userId to TaskList */}
    </div>
  );
};

export default Home;
