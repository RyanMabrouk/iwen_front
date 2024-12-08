import React from "react";
import Comment from "../../../../../../public/dashboard/book/comment";

export default function AddComment({
  comment,
  setComment,
  trigger,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  trigger: () => void;
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-1 items-center gap-3 rounded-md border-2 border-gray-100 px-5 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
    >
      <button onClick={trigger}>
        <Comment />
      </button>
      <h1 className="text-2xl">|</h1>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        placeholder="أضف تعليقك هنا  ...  "
        className="py-3 outline-none"
      />
    </div>
  );
}
