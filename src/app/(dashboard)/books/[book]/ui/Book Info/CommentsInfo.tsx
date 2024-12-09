import React from "react";
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

export default function CommentsInfo() {
  const { mutation: editReview } = useEditReview();
  const { mutation: deleteReview } = useDeleteReview();
  const [isClosed, setIsClosed] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
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

  const dummyReviews: {
    name: string;
    content: string;
    rating: number;
    image: string;
  }[] = [
    {
      name: "جون دو",
      content: "كتاب رائع!",
      rating: 5,
      image: "/dashboard/book/profile.jpg",
    },
    {
      name: "جين سميث",
      content: "قراءة مثيرة.",
      rating: 4,
      image: "/dashboard/book/profile.jpg",
    },
    {
      name: "أليكس جونسون",
      content: "موصى به بشدة!",
      rating: 5,
      image: "/dashboard/book/profile.jpg",
    },
    {
      name: "سارة تومسون",
      content: "لم أستطع أن أتركه!",
      rating: 4,
      image: "/dashboard/book/profile.jpg",
    },
  ];
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
            <div className="relative" key={review.content}>
              <div
                key={review.name}
                className="flex w-full flex-col items-center"
              >
                <div
                  dir="rtl"
                  className="flex w-full items-center justify-between p-3"
                >
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={review?.image ?? "/dashboard/book/profile.jpg"}
                      className="max-h-10 rounded-full"
                      alt="book"
                      width={40}
                      height={40}
                    />
                    <h1 className="font-semibold">{review.name}</h1>
                  </div>
                  <div className="flex flex-row-reverse items-center gap-2">
                    {isLogged === review.user_id && (
                      <CommentOptions
                        onDelete={() => {
                          console.log("initiating delete");
                          deleteReview.mutate(review.id);
                        }}
                        onEdit={() => {
                          console.log("initiating edit");
                          editReview.mutate({
                            id: review.id,
                            data: { content: comment, rating },
                          });
                        }}
                      />
                    )}
                    <StarRating rating={review.rating} />
                    <h2 dir="ltr" className="font-semibold">
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
        <div dir="ltr" className="flex w-full items-center gap-3">
          {!isPending ? (
            <>
              <AddRating rating={rating} setRating={setRating} />
              <AddComment
                trigger={() =>
                  onSubmit({
                    book_id: book?.id ?? "",
                    rating,
                    content: comment,
                    user_id: user.data?.data?.user_id ?? "",
                  })
                }
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
    </div>
  );
}
