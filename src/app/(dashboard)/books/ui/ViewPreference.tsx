import React from "react";
import { useBooksProvider } from "../provider/BooksProvider";

export default function ViewPreference({ className }: { className?: string }) {
  const { numberOfBooks: bookNumber, setNumberOfBooks: setBooks } =
    useBooksProvider();
  const choices1 = ["6", "4", "1"];
  const choices2 = ["3", "2"];

  const renderLines = (choice: string) => {
    const count: number = parseInt(choice);
    return choice !== "1" ? (
      <div className={`flex flex-row justify-between gap-1`}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={`h-4 w-1 rounded-md bg-current`}></div>
        ))}
      </div>
    ) : (
      <div className={`flex flex-col justify-between gap-0.5`}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-0.5">
            <div className={`h-1 w-4 rounded-md bg-current`}></div>
            <div className={`h-1 w-1 rounded-md bg-current`}></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`flex items-center gap-2 text-nowrap max-lg:flex-col-reverse ${className}`}
    >
      <div className={`flex gap-2 max-xl:hidden`}>
        {choices1.map((choice) => (
          <button
            key={choice}
            aria-label={`Set ${choice} columns`}
            className={`rounded p-2 transition-colors ${
              bookNumber === choice
                ? "bg-[#27A49B] text-white"
                : "bg-[#B1E1DE] text-[#27A49B]"
            }`}
            onClick={() => setBooks(choice)}
          >
            {renderLines(choice)}
          </button>
        ))}
      </div>
      <div className={`hidden gap-2 max-xl:flex`}>
        {choices2.map((choice) => (
          <button
            key={choice}
            aria-label={`Set ${choice} rows`}
            className={`rounded p-2 transition-colors ${
              bookNumber === choice
                ? "bg-[#27A49B] text-white"
                : "bg-[#B1E1DE] text-[#27A49B]"
            }`}
            onClick={() => setBooks(choice)}
          >
            {renderLines(choice)}
          </button>
        ))}
      </div>
      <h1 className="text-[#27A49B]">يظهر في كل صف</h1>
    </div>
  );
}
