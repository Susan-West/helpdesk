'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react';
import Header from '../../components/header';
import Dashboard from '../../components/dashboard';
import TicketDetail from '../../components/ticketDetail';
import TicketForm from '../../components/ticketForm';
import TicketList from '../../components/ticketList';

const Main = () => {
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const openList = () => setShowList(true);
  const closeList = () => setShowList(false);

  const openDetail = (ticket) => {
    setSelectedTicket(ticket);
    setShowDetail(true);
  };
  const closeDetail = () => {
    setSelectedTicket(null);
    setShowDetail(false);
  };

  const handleTicketSubmitted = (ticket) => {
    // Called after successful submission from TicketForm
    setTimeout(() => {
      closeForm(); // ✅ Close modal after toast has time to render
      if (ticket) {
        setSelectedTicket(ticket);
        setShowDetail(true);
      }
    }, 500); // ✅ Delay to allow toast to show
  };

  return (
    <>
      {/* ✅ Toast container mounted at top level */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />

      <Dashboard
        onCreateTicket={openForm}
        onViewTickets={openList}
        onTicketClick={(ticket) => {
          openDetail(ticket);
        }}
      />

      {showForm && (
        <TicketForm
          onClose={closeForm}
          onSubmitted={handleTicketSubmitted} // ✅ TicketForm should call this after success
        />
      )}

      {showList && (
        <TicketList
          tickets={[]} // Replace with real ticket data
          onTicketClick={(ticket) => {
            openDetail(ticket);
            closeList();
          }}
          onClose={closeList}
        />
      )}

      {showDetail && selectedTicket && (
        <TicketDetail ticket={selectedTicket} onClose={closeDetail} />
      )}
    </>
  );
};

export default Main;