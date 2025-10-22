"use client"

import { useState } from "react"
import Layout from "@/components/header"
import Dashboard from "@/components/dashboard"
import TicketDetail from "@/components/ticketDetail"
import TicketForm from "@/components/ticketForm"
import TicketList from "@/components/ticketList"

const Main = () => {
  const [showForm, setShowForm] = useState(false)
  const [showList, setShowList] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)

  const openForm = () => setShowForm(true)
  const closeForm = () => setShowForm(false)

  const openList = () => setShowList(true)
  const closeList = () => setShowList(false)

  const openDetail = (ticket) => {
    setSelectedTicket(ticket)
    setShowDetail(true)
  }
  const closeDetail = () => {
    setSelectedTicket(null)
    setShowDetail(false)
  }

  const handleTicketSubmitted = (ticket) => {
    // ticket comes from TicketForm -> you can adjust to push into list / call API
    closeForm()
    if (ticket) {
      setSelectedTicket(ticket)
      setShowDetail(true)
    }
  }

  return (
    <>
      <Layout />
      <Dashboard
        onCreateTicket={openForm}
        onViewTickets={openList}
        onTicketClick={(ticket) => {
          openDetail(ticket)
        }}
      />

      {showForm && (
        <TicketForm
          onClose={closeForm}
          onSubmitted={handleTicketSubmitted} // TicketForm should call this with created ticket
        />
      )}

      {showList && (
        <TicketList
          tickets={[]} // pass real tickets array here
          onTicketClick={(ticket) => {
            openDetail(ticket)
            closeList()
          }}
          onClose={closeList}
        />
      )}

      {showDetail && selectedTicket && (
        <TicketDetail ticket={selectedTicket} onClose={closeDetail} />
      )}
    </>
  )
}

export default Main