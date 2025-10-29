"use client";

import SideBar from "../../components/sidebar"
import { useState } from "react";

const Ticket = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('priority');

  const tickets = [
    { id: '1', title: 'Printer not working', status: 'OPEN', priority: 'HIGH', assignedTo: 'Tech A' },
    { id: '2', title: 'PC slow boot', status: 'PENDING', priority: 'MEDIUM', assignedTo: 'Tech B' },
    { id: '3', title: 'Projector setup', status: 'RESOLVED', priority: 'LOW', assignedTo: 'Tech C' },
    { id: '4', title: 'Wi-Fi issue in ward', status: 'OPEN', priority: 'CRITICAL', assignedTo: null },
  ];

  const technicians = ['Tech A', 'Tech B', 'Tech C'];

  const priorityOrder = { CRITICAL: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
  const sorted = [...tickets].sort((a, b) => {
    if (sortKey === 'priority') return priorityOrder[a.priority] - priorityOrder[b.priority];
    if (sortKey === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const filtered = sorted.filter(ticket =>
    ticket.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className='min-h-screen bg-gray-50'>
      <SideBar currentPath="/ticket" />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Ticket Management</h1>
              <p className="text-sm text-gray-500">Manage your tickets here.</p>
            </div>
          </div>
        </div>
        
         {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full max-w-md"
        />
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border rounded w-full max-w-xs"
        >
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>


      {/* Ticket Table */}
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(ticket => (
            <tr key={ticket.id} className="border-t">
              <td className="p-2 border">{ticket.title}</td>
              <td className="p-2 border">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  ticket.status === 'OPEN' ? 'bg-yellow-100 text-yellow-800' :
                  ticket.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                  ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status}
                </span>
              </td>
              <td className="p-2 border">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  ticket.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'HIGH' ? 'bg-pink-100 text-pink-800' :
                  ticket.priority === 'MEDIUM' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.priority}
                </span>
              </td>
              <td className="p-2 border">
                <select
                  defaultValue={ticket.assignedTo || ''}
                  className="p-1 border rounded"
                >
                  <option value="">Unassigned</option>
                  {technicians.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>




      </main>
    </div>
  )
}

export default Ticket