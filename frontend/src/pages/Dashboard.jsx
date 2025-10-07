import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
        else {
          setError(data.message || 'Failed to fetch user');
        }
      })
      .catch((err) => setError(err.message || 'Failed to fetch'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>
            You are logged in as <strong>{user.name}</strong> ({user.email})
          </p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}
