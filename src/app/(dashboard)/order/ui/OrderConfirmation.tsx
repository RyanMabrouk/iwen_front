import Image from "next/image";

interface OrderConfirmationProps {
  books: any[];
}

export default function OrderConfirmation({ books }: OrderConfirmationProps) {
  return (
    <>
      <div className="mt-12 text-lg font-semibold">تأكيد الشراء</div>
      <div className="flex max-w-[60svw] flex-1 flex-row flex-wrap gap-4 max-sm:hidden">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex max-w-[40%] flex-row items-start gap-3 rounded-md bg-color7 px-3 py-2"
          >
            <Image
              src={book.images_urls?.[0] ?? "/empty-book.svg"}
              alt="book"
              className="rounded-md bg-white px-6 py-4"
              width={100}
              height={100}
            />
            <div className="mt-6 flex flex-col items-start justify-start gap-2">
              <div className="flex flex-col gap-2 text-sm font-medium">
                <span className="flex flex-row items-start justify-start gap-1">
                  <span
                    data-tip={book.title}
                    className="tooltip tooltip-top z-[40] line-clamp-1 text-right"
                  >
                    {book.title}
                  </span>
                  <span>({book.quantity ?? 1}x)</span>
                </span>
                <span className="text-lg font-medium">
                  {book.price_after_discount} د.م
                </span>
              </div>
              {book.isbn && (
                <span className="flex flex-row items-start justify-start gap-2 text-sm text-color4">
                  <p>رقم الكتاب :</p>
                  <p>{book.isbn}</p>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:p-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex items-start gap-3">
              <Image
                src={book.images_urls?.[0] ?? "/empty-book.svg"}
                alt={book.title}
                className="rounded-md bg-gray-100 object-cover"
                width={80}
                height={80}
              />
              <div className="flex flex-col gap-1">
                <h3 className="line-clamp-2 font-medium" title={book.title}>
                  {book.title}
                </h3>
                {book.isbn && (
                  <span className="text-xs text-gray-500">
                    رقم الكتاب: {book.isbn}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {book.price_after_discount} د.م
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
