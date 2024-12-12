import React from "react";
import star from "../../../../../../public/dashboard/book/star";

export default function StarRating({ rating }: { rating: number }) {
  const [ratingValue, setRatingValue] = React.useState<number>(rating);
  const stars = Array.from({ length: 5 }, (_, i) => {
    return i < ratingValue;
  });
  return (
    <div className="flex items-center justify-center gap-1">
      {stars.map((filled, id) => star(filled, id.toString()))}
    </div>
  );
}
