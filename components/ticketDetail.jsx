"use client";

import React, { useState } from "react";
import { X, Clock, User, MapPin, Phone, MessageCircle, Send } from "lucide-react";

const TicketDetail = ({ ticket = null, onClose = () => {} }) => {
  const [newComment, setNewComment] = useState("");

  if (!ticket) return null;

  const normalizeStatus = (s = "") => s.replace("_", "-").toLowerCase();

  const getStatusColor = (status = "") => {
    switch (normalizeStatus(status)) {
      case "open":
        return "text-blue-600 bg-blue-100";
      case "in-progress":
        return "text-yellow-600 bg-yellow-100";
      case "resolved":
        return "text-green-600 bg-green-100";
      case "closed":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority = "") => {
    switch ((priority || "").toLowerCase()) {
      case "low":
        return "text-gray-600 bg-gray-100";
      case "medium":
        return "text-blue-600 bg-blue-100";
      case "high":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    const date = d instanceof Date ? d : new Date(d);
    if (isNaN(date.getTime())) return String(d);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) return;
    // wire up API call here
    console.log("Adding comment:", trimmed);
    setNewComment("");
  };

  const comments = Array.isArray(ticket.comments) ? ticket.comments : [];

  const priorityLabel = (ticket.priority || "Unknown").charAt(0).toUpperCase() + (ticket.priority || "priority").slice(1);
  const statusLabel = (ticket.status || "Unknown").replace(/[_-]/g, " ");
  const submittedBy = ticket.submittedBy || {};
  const assignedTo = ticket.assignedTo || null;

  return (
    <div
      className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-semibold text-gray-900">{ticket.id || "TKT-—"}</h2>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                  {priorityLabel} Priority
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                  {statusLabel.charAt(0).toUpperCase() + statusLabel.slice(1)}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-2">{ticket.title || "No title"}</h3>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Created {formatDate(ticket.createdAt || ticket.created_at)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>By {submittedBy.name || submittedBy.full_name || "Unknown"}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-6">
            {/* Ticket Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Description</h4>
                  <p className="text-sm text-gray-700">{ticket.description || "No description provided."}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Category</h4>
                  <p className="text-sm text-gray-700 capitalize">{(ticket.category || "general").replace(/[_-]/g, " ")}</p>
                </div>

                {ticket.location && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Location</h4>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-700">{ticket.location}</p>
                    </div>
                  </div>
                )}
                
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Submitted By</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-50">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{submittedBy.name || submittedBy.full_name || "Unknown"}</p>
                      <p className="text-xs text-gray-500">{submittedBy.department || "Unknown Department"}</p>
                    </div>
                  </div>
                </div>

                {assignedTo && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Assigned To</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-50">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{assignedTo.name}</p>
                        <p className="text-xs text-gray-500">{assignedTo.department}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Last Updated</h4>
                  <p className="text-sm text-gray-700">{formatDate(ticket.updatedAt || ticket.updated_at)}</p>
                </div>
              </div>
            </div>

            {/* Timeline/Comments Section */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Activity & Comments ({comments.length})
              </h4>

              <div className="space-y-4">
                {/* Initial submission */}
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-50">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{submittedBy.name || submittedBy.full_name || "Unknown"}</span>
                        <span className="text-xs text-gray-500">{formatDate(ticket.createdAt || ticket.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700">Created this ticket</p>
                    </div>
                  </div>
                </div>

                {/* Comments */}
                {comments.map((comment) => (
                  <div key={comment.id || comment.createdAt} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center border border-green-50">
                        <User className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">{(comment.author && (comment.author.name || comment.author.full_name)) || "Unknown"}</span>
                          <span className="text-xs text-gray-500">{formatDate(comment.createdAt || comment.created_at)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content || ""}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="mt-6">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center border border-blue-50">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;