import React from "react";
import arrows_right from "../../../../../public/dashboard/book/arrows_right";
import filter from "../../../../../public/dashboard/book/filter";
import serach from "../../../../../public/dashboard/book/search";
import useBooks from "@/hooks/data/books/useBooks";
import BookSuggestions from "./BookSuggestions";

export default function Search() {
  const [name, setName] = React.useState("");
  const suggestions = useBooks({
    limit: 5,
    filters: {
      "books.title": [{ operator: "like", value: name.length > 3 ? name : "" }],
    },
  });
  return (
    <div className="flex items-center gap-4">
      <div>
        <div className="flex items-center overflow-hidden rounded-md">
          <div className="flex" style={{ background: "#E4EFEF" }}>
            <button className="p-3">{serach("#A8A8A8", "20", "20")}</button>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              dir="rtl"
              className="w-[20rem] bg-inherit p-3 outline-none"
              type="text"
              placeholder="إبحث في متجرنا ..."
            />
          </div>
          <button className="p-3.5" style={{ background: "#A2CBC9" }}>
            {filter("#FFFFFF", "20", "20")}
          </button>
        </div>
        {suggestions.isLoading || (
          <BookSuggestions books={suggestions.data?.data?.data ?? []} />
        )}
      </div>
      <button className="p-3">{arrows_right("#31827D", "20", "20")}</button>
    </div>
  );
}
