import React from "react";
import arrow_left from "../../../../../public/dashboard/book/arrow_left";
import arrow_right from "../../../../../public/dashboard/book/arrow_right";

export default function BookPage({
  page,
  setPage,
}: {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  console.log("type of page : ", typeof page);
  const pageNum = parseInt(page);
  const availablePages =
    page === "1" ? [1, 2, 3] : [pageNum - 1, pageNum, pageNum + 1];
  return (
    <div className="flex items-center gap-3 p-4">
      <button
        onClick={() =>
          setPage(pageNum !== 1 ? (e) => String(Number(e) - 1) : (e) => e)
        }
      >
        {arrow_left("#31827D")}
      </button>
      {availablePages.map((i) => (
        <button
          key={i}
          style={{ color: i === pageNum ? "#31827D" : "#000" }}
          onClick={() => setPage(String(i))}
          className="cursor-pointer text-2xl transition-all duration-300 hover:text-emerald-600"
        >
          {i}
        </button>
      ))}

      <button onClick={() => setPage((e) => e + 1)}>
        {arrow_right("#31827D")}
      </button>
    </div>
  );
}
