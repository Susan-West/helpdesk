'use client'

import React, { useState } from 'react'
import { statusConfig, priorityConfig } from '../constant'
import { Search, Filter, Clock, AlertCircle, CheckCircle, X } from 'lucide-react'

const TicketList = ({ tickets = [], onTicketClick = () => {}, onClose = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const getStatusIcon = (status = '') => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'closed':
        return <CheckCircle className="w-4 h-4 text-gray-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status = '') => {
    const config = statusConfig[status] || statusConfig.open

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    )
  }

  const getPriorityBadge = (priority = 'medium') => {


    const key = priority || 'medium'
    const config = priorityConfig[key] || priorityConfig.medium
    const label = (key.charAt(0).toUpperCase() + key.slice(1))

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {label}
      </span>
    )
  }

  const searchLower = searchTerm.trim().toLowerCase()

  const filteredTickets = (tickets || []).filter(ticket => {
    const title = (ticket.title || '').toLowerCase()
    const description = (ticket.description || '').toLowerCase()
    const id = (ticket.id || '').toLowerCase()

    const matchesSearch = !searchLower || title.includes(searchLower) || description.includes(searchLower) || id.includes(searchLower)
    const matchesStatus = statusFilter === 'all' || (ticket.status === statusFilter)
    const matchesPriority = priorityFilter === 'all' || (ticket.priority === priorityFilter)

    return matchesSearch && matchesStatus && matchesPriority
  })

  const formatDate = (dateString = '') => {
    if (!dateString) return ''
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    }
  }

  return (
    <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ticket List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : "You haven't submitted any support tickets yet"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => onTicketClick(ticket)}
                  className="card p-4 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(ticket.status)}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">TKT-{(ticket.id || '').slice(-3)}</h3>
                        <p className="text-xs text-gray-500">{formatDate(ticket.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(ticket.priority)}
                      {getStatusBadge(ticket.status)}
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 mb-2">{ticket.title || 'No title'}</h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {ticket.description || ''}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>Category: {ticket.category || 'General'}</span>
                      {ticket.profiles && (
                        <span>By: {ticket.profiles.full_name}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketList
