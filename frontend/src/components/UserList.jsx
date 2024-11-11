import React, { useState } from "react";
import { deleteUser, updateUser } from "../services/userAPI";

const UserList = ({ users, fetchAllUsers, setSelectedUser }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
  });

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedUserData({
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
    });
  };

  const handleSave = async (userId) => {
    await updateUser(userId, editedUserData);
    fetchAllUsers();
    setEditingUser(null);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchAllUsers();
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            {editingUser === user._id ? (
              // Editing mode
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedUserData.name}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      name: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg font-sans text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="email"
                  value={editedUserData.email}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg font-sans text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="date"
                  value={editedUserData.dateOfBirth}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg font-sans text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            ) : (
              // Display mode
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 font-sans tracking-tight">
                  {user.name}
                </h3>
                <p className="text-gray-600 font-medium font-sans">
                  {user.email}
                </p>
                <p className="text-sm text-gray-500 font-sans">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-end space-x-4">
              {editingUser === user._id ? (
                <button
                  onClick={() => handleSave(user._id)}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
