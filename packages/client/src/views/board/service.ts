const baseUrl = 'http://localhost:8080'

export const updateTicketStatus = (ticketId: string, statusId: string) => {
  return fetch(`${baseUrl}/ticket/${ticketId}/status`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      status: statusId,
    }),
  })
}
