"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import { Pagination } from "@mui/material";

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
    <div className="bg-color flex flex-col items-center py-4">
      <ThemeProvider theme={theme}>
        <Pagination
          count={4}
          page={page}
          onChange={handleChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </ThemeProvider>
    </div>
  );
}
