"use client";
import BookCart from "@/components/BookCart";
import useWishlist from "@/hooks/data/user/wishlist/useWishlist";
import { wishlistQuery } from "@/hooks/data/user/wishlist/wishlistQuery";
import { IBookPopulated } from "@/types";
import { Pagination } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

export default function Wishlist() {
  const limit = 4;
  const [page, setPage] = useState(1);
  const { data: wishlist, isLoading } = useWishlist({
    page,
    limit,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (wishlist?.data?.meta?.has_next_page) {
      queryClient.prefetchQuery(
        wishlistQuery({
          page: page + 1,
          limit,
        }),
      );
    }
  }, [page, wishlist?.data?.meta?.has_next_page, queryClient]);
  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        {wishlist?.data?.data.map((book: IBookPopulated) => {
          return (
            <div
              dir="ltr"
              key={book.id}
              className="group flex h-full w-full items-center justify-center p-4"
            >
              <BookCart
                id={book.id}
                title={book.title}
                writer={book.writer?.name || "كاتب غير معروف"}
                images={book.images_urls}
                discount={book.discount}
                price={book.price}
                isWishlist={true}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          className="flex w-full justify-center"
          count={wishlist?.data?.meta?.total_pages ?? 1}
          page={page}
          boundaryCount={3}
          siblingCount={3}
          onChange={(e, value) => setPage(value)}
          dir="ltr"
        />
      </div>
    </div>
  );
}
