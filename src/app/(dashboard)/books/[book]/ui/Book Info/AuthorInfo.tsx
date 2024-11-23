import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useBookProvider } from "../../provider/BookProvider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function AuthorInfo() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const { book, authors } = useBookProvider();
  if (!authors) return <div>no authors to be shown</div>;
  const dummyData = [
    { id: 1, src: "/dashboard/book/pic4.jpg", title: "title", price: 200 },
    { id: 2, src: "/dashboard/book/pic3.jpg", title: "title2", price: 300 },
    { id: 3, src: "/dashboard/book/pic1.jpg", title: "title3", price: 400 },
    { id: 4, src: "/dashboard/book/picture.png", title: "title4", price: 500 },
  ];
  return (
    <ScrollArea>
      <div
        dir="rtl"
        key="author"
        className="flex w-full max-w-[40rem] gap-3 max-lg:max-h-[12rem] max-lg:flex-col max-lg:items-center max-md:min-h-[200px]"
      >
        <div
          dir="rtl"
          className="m-3 h-auto w-1/2 flex-grow border p-4 max-lg:w-full"
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
            <h2 className="font-semibold">{authors[0].name}</h2>
          </div>
          <p className="">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, quod
            nihil. Molestiae perferendis doloremque eum ullam deleniti similique
            cumque illo aspernatur dolorum, qui, sapiente est ab cupiditate ipsa
            iste tenetur.
          </p>
        </div>
        <div
          key="recommended books"
          className="m-3 flex h-[17rem] w-1/2 flex-grow flex-col gap-2 border p-4 max-lg:w-full max-lg:bg-color3"
          style={{ background: "#FCFCFD", borderColor: "#E7E9EB" }}
        >
          <h2 className="font-semibold">
            مؤلفات أخرى متوفرة ({dummyData.length})
          </h2>
          <ScrollArea className="w-full flex-grow rounded-md border">
            <div className="flex flex-1 flex-col gap-1 p-3">
              {dummyData.map((book) => (
                <div
                  dir="rtl"
                  className="flex items-center gap-2 rounded-md border bg-white p-2"
                  style={{ borderColor: "#E7E9EB" }}
                  key={book.id}
                >
                  <div className="relative h-12 w-10">
                    <Image src={book.src} alt={book.title} fill />
                  </div>
                  <div dir="rtl">
                    <h3 className="font-semibold">{book.title}</h3>
                    <h4 style={{ color: "#27A098" }}>
                      السعر ({book.price} د.م)
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <ScrollBar orientation={`${isSmallScreen ? "vertical" : "horizontal"}`} />
    </ScrollArea>
  );
}
