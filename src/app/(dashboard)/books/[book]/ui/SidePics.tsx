import Image from "next/image";
import React from "react";

export default function SidePics({
  pictures,
  set,
}: {
  pictures: {
    id: number;
    src: string;
    isSelected: boolean;
  }[];
  set: (src: string) => void;
}) {
  return (
    <div className="flex h-[25rem] w-[5rem] flex-col items-stretch justify-between gap-3 px-2">
      {pictures
        .filter((e) => !e.isSelected)
        .map((pic) => (
          <button
            key={pic.id}
            onClick={() => set(pic.src)}
            className={`relative flex-grow overflow-hidden rounded-md bg-white transition-all duration-200 hover:shadow-md`}
          >
            <Image src={pic.src} className="px-2 py-3" alt="placeholder" fill />
          </button>
        ))}
    </div>
  );
}
