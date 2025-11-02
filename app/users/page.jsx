'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [userTickets, setUserTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  // ✅ Fetch user tickets once on load
  useEffect(() => {
    const fetchUserTickets = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('/api/tickets/mytickets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUserTickets(data.tickets);
        } else {
          toast.error(data.error || 'Failed to load tickets.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Network error. Please try again.');
      } finally {
        setLoadingTickets(false);
      }
    };

    fetchUserTickets();
  }, []);

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
    setTimeout(() => {
      closeForm();
      if (ticket) {
        setSelectedTicket(ticket);
        setShowDetail(true);
        setUserTickets((prev) => [ticket, ...prev]); // ✅ Add new ticket to list
      }
    }, 500);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <Dashboard
        onCreateTicket={openForm}
        onViewTickets={openList}
        onTicketClick={openDetail}
        submittedTickets={userTickets} // ✅ Pass tickets to Dashboard
        loading={loadingTickets}
      />

      {showForm && (
        <TicketForm onClose={closeForm} onSubmitted={handleTicketSubmitted} />
      )}

      {showList && (
        <TicketList
          tickets={userTickets}
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