'use client';

import React from 'react';
import { Plus, Search, AlertCircle, Users, TrendingUp } from 'lucide-react';

const Dashboard = ({
  onCreateTicket = () => {},
  onViewTickets = () => {},
  onTicketClick = () => {},
  submittedTickets = [], // ✅ new prop
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
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            View My Tickets
          </button>
        </div>
      </div>

      {/* Quick Actions & Submitted Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={onCreateTicket}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Report Critical Issue</div>
                  <div className="text-sm text-gray-500">System down or patient safety concern</div>
                </div>
              </div>
            </button>
            <button
              onClick={onCreateTicket}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Request User Account</div>
                  <div className="text-sm text-gray-500">New employee or access change</div>
                </div>
              </div>
            </button>
            <button
              onClick={onCreateTicket}
              className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Software Request</div>
                  <div className="text-sm text-gray-500">Install or update applications</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Submitted Tickets */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Submitted Tickets</h3>
            <button
              onClick={onViewTickets}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {submittedTickets.length === 0 ? (
              <p className="text-sm text-gray-500">You haven’t submitted any tickets yet.</p>
            ) : (
              submittedTickets.slice(0, 3).map((ticket) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




/* const Dashboard = ({ onCreateTicket = () => {}, submittedTickets = [], onViewTickets = () => {}, onTicketClick = () => {} }) => {
  // Use the passed handlers (fall back to no-op)
  const handleCreateTicket = () => {
    onCreateTicket()
  }
  const handleViewTickets = () => {
    onViewTickets()
  } */