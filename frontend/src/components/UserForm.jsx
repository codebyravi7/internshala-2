// src/components/UserForm.js
import React, { useState } from "react";
import { createUser, updateUser } from "../services/userAPI";

const UserForm = ({ fetchAllUsers, selectedUser, clearSelectedUser }) => {
  const [user, setUser] = useState(
    selectedUser || { name: "", email: "", dateOfBirth: "" }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedUser
      ? await updateUser(selectedUser._id, user)
      : await createUser(user);
    fetchAllUsers();
    clearSelectedUser();
    setUser({ name: "", email: "", dateOfBirth: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded shadow-md max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        placeholder="Date of Birth"
        value={user.dateOfBirth}
        onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
        required
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {selectedUser ? "Update" : "Add"} User
      </button>
    </form>
  );
};

export default UserForm;
