"use client";

import React from "react";
import { Pagination } from "@mui/material";
import useBooks from "@/hooks/data/books/useBooks";

export default function PaginationExample({
  page,
  setPage,
}: {
  page: number;
  setPage: (value: number) => void;
}) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <Pagination
        count={4}
        page={page}
        onChange={handleChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </div>
  );
}
