interface OrderSummaryProps {
  delivery_fee: number;
  price_before_discount: number;
  price_after_discount: number;
}

export default function OrderSummary({
  delivery_fee,
  price_before_discount,
  price_after_discount,
}: OrderSummaryProps) {
  return (
    <div className="my-8 flex flex-row items-center gap-6 max-sm:flex-col">
      <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg text-black">
        <span className="text-lg">توصيل</span>
        <span className="text-nowrap">{delivery_fee} د.م</span>
      </div>
      <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg text-gray-400">
        <span className="text-lg">الإجمالي الفرعي</span>
        <del className="text-nowrap">{price_before_discount} د.م</del>
      </div>
      <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg font-semibold text-color1">
        <span className="text-lg">المبلغ النهائي</span>
        <span className="text-nowrap">
          {price_after_discount + delivery_fee} د.م
        </span>
      </div>
    </div>
  );
}
