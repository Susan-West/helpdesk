
import SideBar from "../../components/sidebar";
import KpiCard from "../../components/kpi-card";
import Link from "next/link";

export default function AdminDashboard() {
  // Mock data
  const stats = {
    openTickets: 12,
    resolvedTickets: 34,
    avgResolutionTime: '2h 45m',
    activeTechnicians: 5,
  };

  const tickets = [
    { id: '1', title: 'Printer not working', status: 'OPEN', priority: 'HIGH', assignedTo: 'Farouk' },
    { id: '2', title: 'PC slow boot', status: 'PENDING', priority: 'MEDIUM', assignedTo: 'Olivia' },
    { id: '3', title: 'Projector setup', status: 'RESOLVED', priority: 'LOW', assignedTo: 'Susan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar currentPath="/admin" />
      <main className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back! Here is an overview of your inventory.</p>
            </div>
          </div>
        </header>
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard title="Open Tickets" value={stats.openTickets} />
          <KpiCard title="Resolved Tickets" value={stats.resolvedTickets} />
          <KpiCard title="Avg Resolution Time" value={stats.avgResolutionTime} />
          <KpiCard title="Active Technicians" value={stats.activeTechnicians} />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 my-12">
          <Link href="/sign-up" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            + Add User
          </Link>
        
        </div>

        {/* Recent Tickets Table */}
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
  );
}

// Reusable KPI Card component



/* 'use client';

import React from "react";
import SideBar from "../../components/sidebar";
import KpiCard from "../../components/kpi-card";
import Link from "next/link";

const ProductsChart = ({ data = [] }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="w-full h-full flex items-end gap-2">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-blue-500/80"
          style={{ height: `${(v / max) * 100}%` }}
          title={`Week ${i + 1}: ${v}`}
        />
      ))}
    </div>
  );
};

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

  const weeklyProductsData = [2, 5, 3, 6, 4, 8, 7];
  const recent = [
    { name: "IV Pump", quantity: 2, lowStockAt: 5 },
    { name: "Gloves", quantity: 120, lowStockAt: 20 },
    { name: "Syringes", quantity: 4, lowStockAt: 10 },
  ];

  const totalProducts = recent.length;
  const totalValue = recent.reduce((sum, p) => sum + (p.quantity || 0) * (p.unitPrice || 1), 0);
  const lowStock = recent.filter((p) => p.quantity <= (p.lowStockAt ?? 5)).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar currentPath="/admin" />
      <main className="ml-64 p-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back! Here is an overview of your inventory.</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-3 gap-6">
              <KpiCard label="Total Products" value={totalProducts} delta={`+${totalProducts}`} />
              <KpiCard label="Total Value" value={`$${Number(totalValue).toFixed(0)}`} delta={`+$${Number(totalValue).toFixed(0)}`} />
              <KpiCard label="Low Stock" value={lowStock} delta={`+${lowStock}`} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>New products per week</h2>
            </div>
            <div className="h-48">
              <ProductsChart data={weeklyProductsData} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Stock Levels</h2>
            </div>

            <div className="space-y-3">
              {recent.map((product, key) => {
                const stockLevel =
                  product.quantity === 0 ? 0 : product.quantity <= (product.lowStockAt || 5) ? 1 : 2;

                const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"];
                const textColors = ["text-red-600", "text-yellow-600", "text-green-600"];
                return (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`} />
                      <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${textColors[stockLevel]}`}>{product.quantity} units</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin; */