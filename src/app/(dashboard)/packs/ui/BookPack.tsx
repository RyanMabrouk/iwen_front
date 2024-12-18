import Image from "next/image";
import React from "react";

interface BookPackProps {
  packName: string;
  description: string;
  imageUrl: string;
  priceBeforeOffer: number;
  priceAfterOffer: number;
  displayAsList?: boolean;
}

export const BookPack: React.FC<BookPackProps> = ({
  packName,
  description,
  imageUrl,
  priceBeforeOffer,
  priceAfterOffer,
  displayAsList = false,
}) => {
  const savings = priceBeforeOffer - priceAfterOffer;

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
      <div
        className={`grid ${displayAsList ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} items-center gap-6`}
      >
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <Image
            src={imageUrl}
            alt={packName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-contain"
          />
        </div>
        <div className="text-right">
          <h2 dir="rtl" className="mb-2 text-nowrap text-2xl font-bold">
            {packName.length < 40
              ? packName
              : packName.substring(0, 40) + "..."}
          </h2>
          <p className="mb-4 text-gray-600">{description}</p>
          <div className="mt-4">
            <p className="text-lg font-semibold">
              السعر قبل العرض: {priceBeforeOffer.toFixed(2)} ريال
            </p>
            <p className="text-xl font-bold text-green-600">
              السعر بعد العرض: {priceAfterOffer.toFixed(2)} ريال
            </p>
            <p className="text-md text-green-600">
              التوفير: {savings.toFixed(2)} ريال
            </p>
          </div>
          <button className="mt-4 rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
            اشترِ الحزمة
          </button>
        </div>
      </div>
    </div>
  );
};
