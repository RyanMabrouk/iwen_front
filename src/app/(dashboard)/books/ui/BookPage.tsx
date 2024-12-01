"use client";

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../themes/theme";
import { Pagination } from "@mui/material";
import { useBooksProvider } from "../provider/BooksProvider";

export default function PaginationExample({
  numberOfPages,
}: {
  numberOfPages: number;
}) {
  const { page, setPage } = useBooksProvider();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value.toString());
  };

  return (
    <div className="bg-color flex flex-col items-center py-4">
      <ThemeProvider theme={theme}>
        <Pagination
          count={numberOfPages}
          page={parseInt(page)}
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
