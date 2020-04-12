export const baseUrl =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080'

export const updateTicketStatus = (ticketId: string, statusId: string) => {
  return fetch(`${baseUrl}/api/ticket/${ticketId}/status`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      status: statusId,
    }),
  })
}
