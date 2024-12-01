"use client";

import useEvent from "@/hooks/data/events/useEvent";

export default function SingleEvent({
  eventId,
  activeEvent,
  index,
  setActiveEvent,
  eventName,
  setBooks,
  books,
}: {
  eventId: string;
  activeEvent: number;
  index: number;
  setActiveEvent: (index: number) => void;
  eventName: string;
  setBooks: (books: any[]) => void;
  books: any[];
}) {
  const { data: event } = useEvent({ eventId }) as unknown as any;
  if (event?.data?.books) {
    setBooks(Array.isArray(event.data.books) ? event.data.books : []);
  }
  return (
    <div>
      <h2
        id={eventId}
        className={`cursor-pointer p-2.5 text-xl transition-colors ${
          activeEvent === index
            ? "font-semibold text-primary-500"
            : "font-normal"
        }`}
        onClick={() => setActiveEvent(index)}
      >
        {eventName}
      </h2>
      {index === activeEvent && <div className="h-0.5 bg-primary-500"></div>}
    </div>
  );
}
