"use client";

import useEvent from "@/hooks/data/books/useEvent";

export default function SingleEvent({
  eventId,
  activeEvent,
  index,
  setActiveEvent,
}: {
  eventId: string;
  activeEvent: number;
  index: number;
  setActiveEvent: (index: number) => void;
}) {
  const { data: event } = useEvent({ eventId });

  return (
    <div>
      <h2
        id={event?.data?.data?.id}
        className={`cursor-pointer p-2.5 text-2xl transition-colors ${
          activeEvent === index
            ? "font-semibold text-primary-500"
            : "font-normal"
        }`}
        onClick={() => setActiveEvent(index)}
      >
        {event?.data?.data?.name}
      </h2>
      {index === activeEvent && <div className="h-0.5 bg-primary-500"></div>}
    </div>
  );
}
