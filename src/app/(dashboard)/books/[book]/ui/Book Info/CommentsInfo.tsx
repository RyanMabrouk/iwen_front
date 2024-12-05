import React from "react";
import AddComment from "../AddComment";
import AddRating from "../AddRating";

export default function CommentsInfo() {
  return (
    <div dir="ltr" className="flex w-full items-center gap-3">
      <AddRating />
      <AddComment />
    </div>
  );
}
