export const eventsEndpoints = {
    getEvents: () => `/events`,
    getEvent: (id:string) => `/events/${id}`,
    updateEvent: (id:string) => `/events/${id}`,
    createEvent: () =>  `/events`,
    deleteEvent: (id:string) => `/events/${id}`,
    addBookToEvent: (id:string ,book_id:string) => `/books/${id}/books/${book_id}`,
    removeBookFromEvent: (id:string , book_id:string) => `/books/${id}/books/${book_id}`,
}
