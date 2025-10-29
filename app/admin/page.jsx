
import SideBar from "../components/sidebar";
import KpiCard from "../components/kpi-card";
import Link from "next/link";


const Admin = () => {
  const stats = {
    openTickets: 12,
    resolvedTickets: 34,
    avgResolutionTime: '2h 45m',
    activeTechnicians: 5,
  };

  const tickets = [
    { id: '1', title: 'Printer not working', status: 'OPEN', priority: 'HIGH', assignedTo: 'Tech A' },
    { id: '2', title: 'PC slow boot', status: 'PENDING', priority: 'MEDIUM', assignedTo: 'Tech B' },
    { id: '3', title: 'Projector setup', status: 'RESOLVED', priority: 'LOW', assignedTo: 'Tech C' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar/>
      <main className="ml-64 p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back! Here is an overview of your dashboard.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="Open Tickets" value={stats.openTickets} />
        <KpiCard title="Resolved Tickets" value={stats.resolvedTickets} />
        <KpiCard title="Avg Resolution Time" value={stats.avgResolutionTime} />
        <KpiCard title="Active Technicians" value={stats.activeTechnicians} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mt-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Create Ticket
        </button>
        <Link href={"/sign-up"} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add User
        </Link>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          + Add Inventory
        </button>
      </div>

      <section>
        <h2 className="text-xl font-semibold mt-8 mb-2">Recent Tickets</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Priority</th>
              <th className="p-2 border">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-t">
                <td className="p-2 border">{ticket.title}</td>
                <td className="p-2 border">{ticket.status}</td>
                <td className="p-2 border">{ticket.priority}</td>
                <td className="p-2 border">{ticket.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


      </main>
    </div>
  )
}

export default Admin