"use client";

import useEvent from "@/hooks/data/events/useEvent";
import { useEffect } from "react";

export default function SingleEvent({
  eventId,
  activeEvent,
  index,
  setActiveEvent,
  eventName,
}: {
  eventId: string;
  activeEvent: number;
  index: number;
  setActiveEvent: (index: number) => void;
  eventName: string;
}) {
  const { data: event } = useEvent({ eventId });
  return (
    <div>
      <h2
        id={eventId}
        className={`cursor-pointer p-2.5 text-xl transition-colors ${
          activeEvent === index
            ? "font-semibold text-primary-500"
            : "font-normal"
        }`}
        onClick={() => {
          setActiveEvent(index);
        }}
      >
        {eventName} ({event?.data?.books.length})
      </h2>
      {index === activeEvent && <div className="h-0.5 bg-primary-500"></div>}
    </div>
  );
}
