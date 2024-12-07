"use client";
import React from "react";
import SingleEvent from "./SingleEvent";
import useEvents from "@/hooks/data/events/useEvents";

export default function Events({
  activeEvent,
  setActiveEvent,
}: {
  activeEvent: number;
  setActiveEvent: (index: number) => void;
}) {
  const { data: events } = useEvents();
  const events_data = Array.isArray(events?.data) ? events?.data : [];
  return (
    <div className="dir-[rtl] flex min-w-max flex-row-reverse gap-[25px] whitespace-nowrap">
      {events_data?.map((event, index) => (
        <SingleEvent
          key={event.id}
          eventId={event.id}
          activeEvent={activeEvent}
          index={index}
          setActiveEvent={setActiveEvent}
          eventName={event.name}
        />
      ))}
    </div>
  );
}
