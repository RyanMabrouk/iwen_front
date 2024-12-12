"use client";

import React, { useState } from "react";
import AddComment from "../AddComment";
import AddRating from "../AddRating";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import { Spinner } from "@/app/ui/Spinner";
import StarRating from "../StarRating";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSendReview from "../../hooks/useSendReview";
import { useBookProvider } from "../../provider/BookProvider";
import useReviews from "@/hooks/data/reviews/useReviews";
import { CommentOptions } from "../CommentOptions";
import useEditReview from "../../hooks/useEditReview";
import useDeleteReview from "../../hooks/useDeleteReview";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CommentsInfo() {
  const { mutation: editReview } = useEditReview();
  const { mutation: deleteReview } = useDeleteReview();
  const [isClosed, setIsClosed] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    reviewId: string | null;
  }>({ isOpen: false, reviewId: null });
  const user = useCurrentUser();
  const { book } = useBookProvider();
  const reviewsData = useReviews();
  const {
    data: { mutate: onSubmit, isPending },
  } = useSendReview();
  const userData = useCurrentUser();

  if (userData.isLoading || reviewsData.isLoading)
    return (
      <div className="m-auto">
        <Spinner />
      </div>
    );
  if (!book) return null;

  const isLogged = userData.data?.data?.user_id ?? null;
  const realReviews = reviewsData.data?.data
    ?.filter((review) => review.book_id === book.id)
    .map((review) => ({
      id: review.id,
      name: review.user.first_name + " " + review.user.last_name,
      content: review.content,
      rating: review.rating,
      image:
        review.user.avatar !== undefined && review.user.avatar !== ""
          ? review.user.avatar
          : "/dashboard/book/profile.jpg",
      user_id: review.user_id,
    }));

  const handleEdit = (review: {
    id: string;
    content: string;
    rating: number;
  }) => {
    setEditingReviewId(review.id);
    setComment(review.content);
    setRating(review.rating);
  };

  const handleEditSubmit = () => {
    if (editingReviewId) {
      editReview.mutate({
        id: editingReviewId,
        data: { content: comment, rating },
      });
      setEditingReviewId(null);
      setComment("");
      setRating(0);
    }
  };

  const handleDelete = (reviewId: string) => {
    setDeleteConfirmation({ isOpen: true, reviewId });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.reviewId) {
      deleteReview.mutate(deleteConfirmation.reviewId);
    }
    setDeleteConfirmation({ isOpen: false, reviewId: null });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {isLogged === null && !isClosed && (
        <div
          dir="rtl"
          style={{ background: "#E4EFEF" }}
          className="relative flex w-full flex-row-reverse justify-center rounded-md px-2 py-1"
        >
          <h1 style={{ color: "#27A098" }} className="">
            يمكن فقط للمشترين التعليق و التقييم
          </h1>
          <button
            onClick={() => setIsClosed(true)}
            style={{ color: "#27A098" }}
            className="absolute right-4 text-xl"
          >
            X
          </button>
        </div>
      )}
      <ScrollArea className="w-full">
        <div
          className={`flex w-full flex-col gap-1 ${isLogged ? "h-[230px]" : "h-[250px]"}`}
        >
          {realReviews?.map((review) => (
            <div className="relative" key={review.id}>
              <div className="flex w-full flex-col items-center">
                <div
                  dir="rtl"
                  className="flex w-full items-center justify-between p-3 max-lg:flex-col max-lg:items-start max-lg:gap-2 max-sm:flex-row max-sm:items-center"
                >
                  <div className="relative flex h-[40px] w-[40px] flex-row items-center gap-2">
                    <Image
                      src={review?.image ?? "/dashboard/book/profile.jpg"}
                      className="mr-3 rounded-full"
                      alt="book"
                      width={40}
                      height={40}
                    />
                    <h1 className="absolute right-16 text-nowrap font-semibold">
                      {review.name}
                    </h1>
                  </div>
                  <div className="flex flex-row-reverse items-center justify-center gap-2 max-lg:mr-3">
                    {isLogged === review.user_id && (
                      <CommentOptions
                        onDelete={() => handleDelete(review.id)}
                        onEdit={() => handleEdit(review)}
                      />
                    )}
                    <StarRating rating={review.rating} />
                    <h2 dir="ltr" className="font-semibold -mb-2">
                      {review.rating} / 5
                    </h2>
                  </div>
                </div>
                <hr className="bg-color1" />
                <p dir="rtl" className="w-full px-7 pb-4 font-semibold">
                  {review.content}
                </p>
              </div>
              <div className="mx-auto h-0.5 w-[90%] bg-gray-200"></div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {isLogged !== null && (
        <div
          dir="ltr"
          className="flex w-full items-center gap-3 max-lg:flex-col"
        >
          {!isPending ? (
            <>
              <AddRating rating={rating} setRating={setRating} />
              <AddComment
                trigger={() => {
                  if (editingReviewId) {
                    handleEditSubmit();
                  } else {
                    onSubmit({
                      book_id: book?.id ?? "",
                      rating,
                      content: comment,
                      user_id: user.data?.data?.user_id ?? "",
                    });
                  }
                  setComment("");
                  setRating(0);
                }}
                comment={comment}
                setComment={setComment}
              />
            </>
          ) : (
            <div className="flex w-full items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      )}
      <Dialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteConfirmation({ isOpen, reviewId: null })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mr-3">تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <p className="mr-3">هل أنت متأكد أنك تريد حذف هذا التعليق؟</p>
          <DialogFooter className="mr-3">
            <Button
              variant="outline"
              onClick={() =>
                setDeleteConfirmation({ isOpen: false, reviewId: null })
              }
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              حذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
