export const eventsEndpoints = {
  getEvents: () => `/events`,
  updateEvent: (id: string) => `/events/${id}`,
  createEvent: () => `/events`,
  deleteEvent: (id: string) => `/events/${id}`,
  getEventById: (id: string) => `/events/${id}`,
};
