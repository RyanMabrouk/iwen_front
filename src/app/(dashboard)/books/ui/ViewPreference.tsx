import React from "react";

export default function ViewPreference({
  setBooks,
  bookNumber,
}: {
  setBooks: React.Dispatch<React.SetStateAction<string>>;
  bookNumber: string;
}) {
  const choices = ['4', '6'];
  return (
    <div className="flex items-center gap-2">
      {choices.map((choice) => (
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
      <h1 style={{ color: "#27A49B" }}>يظهر في كل صف</h1>
    </div>
  );
}
