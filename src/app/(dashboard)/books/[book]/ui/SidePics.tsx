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
  const neededPictures = pictures.filter((e) => !e.isSelected);
  const content =
    neededPictures.length >= 4
      ? neededPictures.slice(0, 4).map((pic) => (
          <button
            key={pic.id}
            onClick={() => set(pic.src)}
            className={`relative flex-grow overflow-hidden rounded-md bg-color3 transition-all duration-200 hover:shadow-md`}
          >
            <Image src={pic.src} className="px-2 py-3" alt="placeholder" fill />
          </button>
        ))
      : neededPictures
          .concat(Array(4 - neededPictures.length).fill({}))
          .map((pic, i) =>
            pic.id !== undefined ? (
              <button
                key={pic.id}
                onClick={() => set(pic.src)}
                className={`relative flex-grow overflow-hidden rounded-md bg-color3 transition-all duration-200 hover:shadow-md`}
              >
                <Image
                  src={pic.src}
                  className="px-2 py-3"
                  alt="placeholder"
                  fill
                />
              </button>
            ) : (
              <div key={i + 1}></div>
            ),
          );
  if (pictures.length === 1) return <div></div>;
  return (
    <div className="grid w-[5rem] grid-cols-1 items-stretch justify-between gap-5 px-2 max-lg:h-[5rem] max-lg:w-[20rem] max-lg:grid-cols-4 max-lg:grid-rows-1 max-lg:p-0">
      {...content}
    </div>
  );
}

/* pictures
        .filter((e) => !e.isSelected)
        .map((pic) => (
          <button
            key={pic.id}
            onClick={() => set(pic.src)}
            className={`relative flex-grow overflow-hidden rounded-md bg-white transition-all duration-200 hover:shadow-md`}
          >
            <Image src={pic.src} className="px-2 py-3" alt="placeholder" fill />
          </button>
        )) */
