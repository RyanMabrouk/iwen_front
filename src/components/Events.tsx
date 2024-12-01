"use client";
import React from "react";
import SingleEvent from "./SingleEvent";
import useEvents from "@/hooks/data/events/useEvents";

export default function Events({
  activeEvent,
  setActiveEvent,
  books,
  setBooks,
}: {
  activeEvent: number;
  setActiveEvent: (index: number) => void;
  books: any[];
  setBooks: (books: any[]) => void;
}) {
  const { data: events } = useEvents();

  return (
    <div className="dir-[rtl] flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
      {(Array.isArray(events?.data) ? events.data : []).map((event, index) => (
        <SingleEvent
          key={event.id || index}
          eventId={event.id}
          activeEvent={activeEvent}
          index={index}
          setActiveEvent={setActiveEvent}
          eventName={event.name}
          setBooks={setBooks}
          books={books}
        />
      ))}
    </div>
  );
}
