import { AlertCircle, Users, TrendingUp } from 'lucide-react'

export const statsData = [
  { label: 'Open Tickets', value: 12, icon: AlertCircle, bg: 'bg-red-100', color: 'text-red-600' },
  { label: 'In Progress', value: 5, icon: TrendingUp, bg: 'bg-yellow-100', color: 'text-yellow-600' },
  { label: 'Resolved', value: 32, icon: Users, bg: 'bg-green-100', color: 'text-green-600' },
  { label: 'Total Users', value: 120, icon: Users, bg: 'bg-blue-100', color: 'text-blue-600' },
]

export  const tickets = [
  { id: 'tkt_001', title: 'Printer not working', status: 'open', created_at: new Date().toISOString() },
  { id: 'tkt_002', title: 'Cannot access VPN', status: 'in_progress', created_at: new Date().toISOString() },
  { id: 'tkt_003', title: 'Software install request', status: 'resolved', created_at: new Date().toISOString() },
] 

export const categories = [
  { value: 'hardware', label: 'Hardware Issue' },
  { value: 'software', label: 'Software Problem' },
  { value: 'network', label: 'Network/Internet' },
  { value: 'email', label: 'Email Issues' },
  { value: 'printer', label: 'Printer Problems' },
  { value: 'phone', label: 'Phone System' },
  { value: 'other', label: 'Other' }
]

export const priorities = [
  { value: 'low', label: 'Low - Can wait', color: 'text-gray-600' },
  { value: 'medium', label: 'Medium - Normal', color: 'text-blue-600' },
  { value: 'high', label: 'High - Urgent', color: 'text-yellow-600' },
  { value: 'critical', label: 'Critical - Emergency', color: 'text-red-600' }
]

export const statusConfig = {
  open: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Open' },
  in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'In Progress' },
  resolved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Resolved' },
  closed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Closed' }
}

export const priorityConfig = {
  low: { bg: 'bg-gray-100', text: 'text-gray-800' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-800' },
  high: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  critical: { bg: 'bg-red-100', text: 'text-red-800' }
}