"use client";

import SideBar from "../../components/sidebar"
import { useState } from "react";

const Access = () => {
  const [search, setSearch] = useState('');

  // Mock user data
  const users = [
    { id: '1', email: 'nurse1@hospital.com', role: 'USER', active: true },
    { id: '2', email: 'tech1@hospital.com', role: 'TECHNICIAN', active: true },
    { id: '3', email: 'admin@hospital.com', role: 'ADMIN', active: true },
  ];

  // Mock audit logs
  const logs = [
    { id: 'a1', action: 'Changed role to ADMIN', actorId: 'admin@hospital.com', targetId: 'tech1@hospital.com', timestamp: '2025-10-27T14:32:00Z' },
    { id: 'a2', action: 'Deactivated user', actorId: 'admin@hospital.com', targetId: 'nurse1@hospital.com', timestamp: '2025-10-26T09:15:00Z' },
  ];

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar currentPath="/access" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Access & Security</h1>
              <p className="text-sm text-gray-500">Manage users and permissions here.</p>
            </div>
          </div>
        </div>
        
         {/* User Role Management */}
      <section>
        <h2 className="text-xl font-semibold mb-2">User Role Management</h2>
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 p-2 border rounded w-full max-w-md"
        />
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">
                  <select defaultValue={user.role} className="p-1 border rounded">
                    <option value="USER">User</option>
                    <option value="TECHNICIAN">Technician</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-2 border">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

        {/* Audit Logs */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Action</th>
              <th className="p-2 border">Actor</th>
              <th className="p-2 border">Target</th>
              <th className="p-2 border">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id} className="border-t">
                <td className="p-2 border">{log.action}</td>
                <td className="p-2 border">{log.actorId}</td>
                <td className="p-2 border">{log.targetId}</td>
                <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      </main>
    </div>
  )
}

export default Access