import React from "react";
import { BookPack } from "./BookPack";

export default function BookPacksList({
  offers,
  displayAsList = false,
}: {
  offers:
    | {
        created_at: string;
        created_by: string;
        description: string;
        id: string;
        image_url: string;
        price_after_offer: number;
        price_before_offer: number;
        title: string;
        updated_at: string;
      }[]
    | null
    | undefined;
  displayAsList?: boolean;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-right text-3xl font-bold">حزم الكتب الخاصة</h1>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {offers?.map((offer) => (
          <BookPack
            key={offer.id}
            packName={offer.title}
            description={offer.description}
            imageUrl={offer.image_url}
            priceBeforeOffer={offer.price_before_offer}
            priceAfterOffer={offer.price_after_offer}
            displayAsList={displayAsList}
          />
        ))}
      </div>
    </div>
  );
}
