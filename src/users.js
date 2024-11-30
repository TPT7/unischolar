import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  // State to store users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust URL based on your backend API
        setUsers(response.data); // Store the fetched users in state
        setLoading(false); // Set loading to false once the data is fetched
      } catch (err) {
        setError('Error fetching users'); // Set an error if something goes wrong
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle the change in search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  return (
    <div className="content">
      <div id="home" className="section">
        <h2>Uni Scholar Users</h2>
        <p>This page displays all the users that are on Uni Scholar.</p>
      </div>

      <div id="users" className="section">
        <h2>Users List</h2>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={handleSearchChange} // Update the search query as user types
            className="search-input"
          />
        </div>

        {loading ? (
          <p>Loading users...</p> // Show loading message while fetching data
        ) : error ? (
          <p>{error}</p> // Show error message if there's an issue
        ) : filteredUsers.length === 0 ? (
          <p>No users found.</p> // Show this if there are no users matching the search
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
