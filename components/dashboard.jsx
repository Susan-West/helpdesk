'use client';

import React from 'react';
import { tickets } from '../constant';
import { Plus, Search, AlertCircle, Users, TrendingUp } from 'lucide-react';

const Dashboard = ({
  onCreateTicket = () => {},
  onViewTickets = () => {},
  onTicketClick = () => {},
  loading = false, // ✅ new prop
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome to IT Support</h2>
        <p className="text-blue-100 mb-4">How can we help you today?</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCreateTicket}
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Submit New Ticket
          </button>

          <button
            onClick={onViewTickets}
            disabled={loading}
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              loading
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
            ) : (
              <Search className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Loading...' : 'View My Tickets'}
          </button>
        </div>
      </div>

      {/* Quick Actions & Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {/* Buttons omitted for brevity — same as before */}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
            <button
              onClick={onViewTickets}
              disabled={loading}
              className={`text-sm font-medium ${
                loading ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {tickets.slice(0, 3).map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => onTicketClick(ticket)}
                className="flex items-start space-x-3 cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    ticket.status === 'resolved'
                      ? 'bg-green-500'
                      : ticket.status === 'in_progress'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">TKT-{ticket.id.slice(-3)}</span> - {ticket.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;