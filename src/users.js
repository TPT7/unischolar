import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); 

  //function for fetching users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); 
        setUsers(response.data); 
        setLoading(false); 
      } catch (err) {
        setError('Error fetching users'); 
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  //searching users both in upper and lower case
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <div className="content">
      <div id="home" className="section">
        <h2>Uni Scholar Users</h2>
        <p>This page displays all the users that are on Uni Scholar.</p>
      </div>

      <div id="users" className="section">
        <h2>Users</h2>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={handleSearchChange} 
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading users...</p> 
        ) : error ? (
          <p>{error}</p> 
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p> 
        ) : (
          <div className="user-list">
            {filteredUsers.map((user) => (
              <div key={user.programme} className="user-card">
                <h3>{user.username}</h3>
                <p>Programme: {user.programme}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
