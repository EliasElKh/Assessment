import './App.css'
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  status: "active" | "locked";
  dob: string;
}


const loadFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) as T : defaultValue;
}; // load data from localStorage or return default value

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", status: "active", dob: "1990-05-15" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "locked", dob: "1988-10-22" },
  { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", status: "active", dob: "1995-02-10" },
  { id: 4, name: "Bob", email: "bob.martin@example.com", status: "locked", dob: "1980-08-05" },
  { id: 5, name: "Charlie Brown", email: "charlie.brown@example.com", status: "active", dob: "1992-11-30" },
  { id: 6, name: "David Lee", email: "david.lee@example.com", status: "locked", dob: "1987-07-14" },
  { id: 7, name: "Eve", email: "eve.green@example.com", status: "active", dob: "1993-09-21" },
  { id: 8, name: "Frank White", email: "frank.white@example.com", status: "active", dob: "1994-01-25" },
  { id: 9, name: "Grace Black", email: "grace.black@example.com", status: "locked", dob: "1985-03-17" },
  { id: 10, name: "Hannah", email: "hannah.purple@example.com", status: "active", dob: "1996-12-03" }
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(() => 
    loadFromLocalStorage<User[]>('users', initialUsers)
  );// Initial users loaded from localStorage or defaults
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => 
    loadFromLocalStorage<boolean>('darkMode', false)
  );// Load dark mode preference from localStorage
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    status: "active",
    dob: ""
  });
  const [editUser, setEditUser] = useState<User | null>(null);

  // Save users and darkMode to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  //Remove a user by ID
  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Show or hide create modal
  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  // Show edit modal
  const showEditUserModal = (user: User) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditUser(null);
  };

  // input change for create
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  // input change for edit
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editUser) {
      setEditUser({
        ...editUser,
        [name]: value
      });
    }
  };

  //create user
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the highest existing ID to generate a new one
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    const newUserWithId = { ...newUser, id: maxId + 1 };
    setUsers((prevUsers) => [...prevUsers, newUserWithId]);
    setShowCreateModal(false);
    setNewUser({ id: 0, name: "", email: "", status: "active", dob: "" });
  };

  //edit user
  const handleEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      const updatedUsers = users.map(user => 
        user.id === editUser.id ? editUser : user
      );
      setUsers(updatedUsers);
      setShowEditModal(false);
      setEditUser(null);
    }
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} m-0 p-0`}>
      <div className="bg-[#3251D0] text-white p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-none">
        <h1 className="text-xl font-bold mb-2 sm:mb-0">User Management</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            onClick={toggleCreateModal}
            className="px-4 py-2 rounded-md font-semibold bg-white text-[#3251D0] transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:scale-95"
          >
            Create User
          </button>
          <button 
            className="px-4 py-2 rounded-md font-semibold bg-red-500 text-white transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:scale-95 hover:bg-red-600"
          >
            Logout
          </button>
          <button 
            onClick={toggleDarkMode} 
            className="px-4 py-2 rounded-md font-semibold transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:scale-95"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search users..."
          className="mt-4 p-2 border rounded w-[65%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] transition-all duration-300 ease-in-out transform focus:scale-105 focus:border-[#3251D0] placeholder-gray-500 dark:placeholder-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className={`p-4 border rounded-lg shadow-md flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="w-16 h-16 flex items-center justify-center bg-[#3251D0] text-white rounded-full text-xl font-bold self-center">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h2 className="mt-2 font-semibold text-center">{user.name}</h2>
              <p className="text-gray-600 text-sm text-center">Email: {user.email}</p>
              <p className={`text-sm text-center ${user.status === "active" ? "text-green-500" : "text-red-500"}`}>
                Status: {user.status}
              </p>
              <p className="text-gray-600 text-sm text-center">Date of Birth: {user.dob}</p>
              <div className="mt-3 flex justify-center gap-2">
                <button 
                  onClick={() => showEditUserModal(user)}
                  className="px-4 py-2 rounded-md font-semibold bg-[#3251D0] text-white transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:scale-95"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteUser(user.id)} 
                  className="px-4 py-2 rounded-md font-semibold bg-red-500 text-white transition-all duration-300 ease-in-out transform hover:translate-y-[-2px] hover:shadow-md active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      {showCreateModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className={`rounded-lg p-6 shadow-lg max-w-sm w-full 
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          >
            <h2 className="text-2xl font-bold mb-4">Create New User</h2>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  name="dob"
                  value={newUser.dob}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleCreateModal}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white'} hover:bg-gray-500`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3251D0] text-white rounded hover:bg-[#1d3a98] transition-all duration-300"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {showEditModal && editUser && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className={`rounded-lg p-6 shadow-lg max-w-sm w-full 
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
          >
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditUser}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditInputChange}
                  placeholder="Name"
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditInputChange}
                  placeholder="Email"
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleEditInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  name="dob"
                  value={editUser.dob}
                  onChange={handleEditInputChange}
                  className={`w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white'} hover:bg-gray-500`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3251D0] text-white rounded hover:bg-[#1d3a98] transition-all duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}