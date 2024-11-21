import Image from "next/image";
import React from "react";

export default function AuthorInfo() {
  const dummyData = [
    { id: 1, src: "/dashboard/book/pic4.jpg", title: "title", price: 200 },
    { id: 2, src: "/dashboard/book/pic3.jpg", title: "title2", price: 300 },
    { id: 3, src: "/dashboard/book/pic1.jpg", title: "title3", price: 400 },
    { id: 4, src: "/dashboard/book/picture.png", title: "title4", price: 500 },
  ];
  return (
    <div dir="rtl" className="flex gap-3">
      <div
        dir="rtl"
        className="m-3 max-w-72 border p-4"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <div dir="rtl" className="mb-3 flex items-center gap-2">
          <div className="relative h-10 w-10 rounded-full">
            <Image
              src="/dashboard/book/pic4.jpg"
              alt="alternative"
              className="rounded-full"
              fill
            />
          </div>
          <h2 className="font-semibold">name of author</h2>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          amet praesentium est dolor quis, neque beatae, temporibus debitis
          nobis magnam accusamus, dignissimos maiores blanditiis nihil! Nisi
          quas aspernatur ab tempora.
        </p>
      </div>
      <div
        className="m-3 flex flex-grow flex-col gap-2 border p-4"
        style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
      >
        <h2 className="font-semibold">مؤلفات أخرى متوفرة (X)</h2>
        <div className="flex max-h-[11rem] flex-1 flex-col gap-1 overflow-y-scroll p-3">
          {dummyData.map((book) => (
            <div
              className="flex items-center gap-2 rounded-md border bg-white p-2"
              style={{ borderColor: "#E7E9EB" }}
              key={book.id}
            >
              <div className="relative h-12 w-10">
                <Image src={book.src} alt="alternative" fill />
              </div>
              <div dir="rtl">
                {" "}
                <h3 className="font-semibold">{book.title}</h3>
                <h4 style={{ color: "#27A098" }}>السعر ({book.price} د.م)</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
