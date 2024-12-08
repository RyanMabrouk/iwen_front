import React, { useState, useEffect } from "react";
import arrows_right from "../../../../../public/dashboard/book/arrows_right";
import filter from "../../../../../public/dashboard/book/filter";
import search from "../../../../../public/dashboard/book/search";
import useBooks from "@/hooks/data/books/useBooks";
import BookSuggestions from "./BookSuggestions";

export default function Search() {
  const [name, setName] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const suggestions = useBooks({
    limit: 5,
    filters: {
      "books.title": [
        { operator: "like", value: name.length > 3 ? "%" + name + "%" : "" },
      ],
    },
  });

  const handleSuggestionClick = (bookTitle: string) => {
    setName(bookTitle);
  };

  const handleFilterClick = () => {};
  console.log(showSuggestions);

  return (
    <div className="flex items-center gap-4">
      <div
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget) && !isHovering) {
            setShowSuggestions(false);
          }
        }}
        className="relative"
      >
        <div className="flex items-center overflow-hidden rounded-md">
          <div className="flex" style={{ background: "#E4EFEF" }}>
            <button className="p-3">{search("#A8A8A8", "20", "20")}</button>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              dir="rtl"
              className="w-[20rem] bg-inherit p-3 outline-none"
              type="text"
              placeholder="إبحث عن كتاب ..."
            />
          </div>
          <button
            className="p-3.5"
            style={{ background: "#A2CBC9" }}
            onClick={handleFilterClick}
          >
            {filter("#FFFFFF", "20", "20")}
          </button>
        </div>
        {showSuggestions && !suggestions.isLoading && (
          <BookSuggestions
            onFocus={(bool: boolean) => setIsHovering(bool)}
            books={suggestions.data?.data?.data ?? []}
            onSuggestionClick={handleSuggestionClick}
          />
        )}
      </div>
      <button className="p-3">{arrows_right("#31827D", "20", "20")}</button>
    </div>
  );
}
