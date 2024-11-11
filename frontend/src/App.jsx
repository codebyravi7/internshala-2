import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { fetchUsers } from "./services/userAPI";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(page);
      const { data } = response;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [page]);

  // Pagination functions
  const handlePageChange = (newPage) => {
    console.log("page:: ", page);
    setPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-1">
      <div className="mb-12 bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          User Registration
        </h1>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            onClick={() => setToggleForm(!toggleForm)}
          >
            {toggleForm ? "Close Form" : "Add User"}
          </button>
        </div>

        {toggleForm && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-center">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Register
              </button>
            </div>
          </div>
        )}
      </div>

      {toggleForm && (
        <UserForm
          fetchAllUsers={fetchAllUsers}
          selectedUser={selectedUser}
          clearSelectedUser={() => setSelectedUser(null)}
        />
      )}

      {loading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <UserList
          users={users}
          fetchAllUsers={fetchAllUsers}
          setSelectedUser={setSelectedUser}
        />
      )}

      {/* Improved Pagination */}
      <div className="flex flex-col items-center ">
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
            className="pagination-button"
            title="First page"
          >
            <ChevronsLeft size={20} />
          </button>

          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="pagination-button"
            title="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="bg-blue-500 p-2 px-3 m-2 rounded-md">{page}</span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={users.length < 20}
            className=""
            title="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
