import React from "react";
import { useBooksProvider } from "../provider/BooksProvider";

export default function ViewPreference({ className }: { className?: string }) {
  const { numberOfBooks: bookNumber, setNumberOfBooks: setBooks } =
    useBooksProvider();
  const choices1 = ["4", "6"];
  const choices2 = ["2", "3"];
  return (
    <div
      className={`flex items-center gap-2 text-nowrap max-lg:flex-col-reverse ${className}`}
    >
      <div className={`flex gap-2 max-xl:hidden`}>
        {choices1.map((choice) => (
          <button
            key={choice}
            style={{
              background: bookNumber === choice ? "#27A49B" : "#B1E1DE",
            }}
            className="p-1 px-2 text-white"
            onClick={() => setBooks(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className={`hidden gap-2 max-xl:visible max-xl:flex`}>
        {choices2.map((choice) => (
          <button
            key={choice}
            style={{
              background: bookNumber === choice ? "#27A49B" : "#B1E1DE",
            }}
            className="p-1 px-2 text-white"
            onClick={() => setBooks(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
      <h1 style={{ color: "#27A49B" }}>يظهر في كل صف</h1>
    </div>
  );
}
