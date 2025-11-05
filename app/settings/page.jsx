'use client';

import { useState } from 'react';
import SideBar from '../../components/sidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !password || !role) {
      toast.error('Please fill out all fields.');
      return;
    }

    toast.success('Changes saved successfully.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar currentPath="/settings" />
      <header className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
        </div>

        <main className="max-w-6xl">
          <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-6">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mb-6 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="New password"
              />
            </div>

            {/* Role Field */}
            <div >
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white mt-6 font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </header>

      {/* ✅ Toast container lives on this page */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Settings;