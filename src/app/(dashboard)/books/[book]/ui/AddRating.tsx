"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import star from "../../../../../../public/dashboard/book/star";

export default function AddRating({
  rating,
  setRating,
}: {
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleClick = () => {
    if (!isFormOpen) {
      setIsFormOpen(true);
    } else if (rating > 0) {
      setIsFormOpen(false);
    }
  };

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
    setTimeout(() => setIsFormOpen(false), 500);
  };

  return (
    <motion.div
      className="flex items-center gap-2 rounded-md p-3 outline outline-2 outline-yellow-200 transition-all duration-200 hover:cursor-pointer hover:shadow-md"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {!isFormOpen ? (
          <motion.div
            key="closed"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {rating > 0 ? (
              <>
                {[...Array(rating)].map((_, i) => star(true, String(i)))}
                <h1 className="mr-2">تقييمك: {rating}</h1>
              </>
            ) : (
              <>
                {star(true, "1")}
                <h1>اختر تقييمك</h1>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="open"
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div
                key={s}
                onMouseEnter={() => setHoveredRating(s)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRatingClick(s);
                }}
                whileHover={{ scale: 1.2 }}
              >
                {star(s <= (hoveredRating || rating), "1")}
              </motion.div>
            ))}
            <h1 className="mr-2">اختر تقييمك</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
