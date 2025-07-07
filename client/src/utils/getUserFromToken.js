import { jwtDecode } from 'jwt-decode';

const getUserFromToken = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const response = await fetch(`/api/auth/users/${userId}`);
    if (response.ok) {
      const user = await response.json();
      return user.email.split('@')[0];
    } else { return null; }
  } catch (err) {
    console.error('Error decoding token or fetching user:', err);
    return null;
  }
};

export default getUserFromToken;
