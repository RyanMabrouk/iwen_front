import Image from "next/image";
import { Enums } from "@/types/database.types";

interface PaymentMethodSelectionProps {
  paymentMethod: Enums<"payment_method_enum">;
  setPaymentMethod: (method: Enums<"payment_method_enum">) => void;
}

export default function PaymentMethodSelection({
  paymentMethod,
  setPaymentMethod,
}: PaymentMethodSelectionProps) {
  const payment_methods = [
    {
      img: "/truck.svg",
      value: "onDelivery",
      text: "الدفع عند التسليم",
      forbidden: false,
    },
    {
      img: "/bank.svg",
      value: "bank",
      text: "الدفع عن طريق البنك",
      forbidden: true,
    },
    {
      img: "/card.svg",
      value: "online",
      text: "الدفع عن طريق البطاقة البنكية",
      forbidden: true,
    },
  ] as const;
  return (
    <>
      <div className="my-12 text-lg font-semibold">طريقة الدفع</div>
      <div className="my-12 flex flex-row items-center gap-4 max-sm:flex-col max-sm:items-start">
        {payment_methods.map((e, i) => (
          <div key={i}>
            <input
              type="radio"
              name="payment_method"
              id={`payment_method_${i}`}
              value={e.value}
              onChange={(event) => {
                if (!e.forbidden) {
                  setPaymentMethod(
                    event.target.value as Enums<"payment_method_enum">,
                  );
                }
              }}
              className="hidden"
            />
            <label
              htmlFor={`payment_method_${i}`}
              className={`relative flex h-32 w-52 flex-col items-center justify-end gap-2 rounded-md border py-3 transition-all ease-linear ${
                paymentMethod === e.value
                  ? "border-2 border-color1"
                  : "border-gray-200"
              } ${e.forbidden ? "cursor-not-allowed" : "hover:cursor-pointer"}`}
            >
              <span
                className={`absolute right-2 top-2 size-4 rounded-full bg-color1 ${
                  e.forbidden ? "hidden" : "block"
                }`}
              ></span>
              <Image
                src={e.img}
                alt=""
                width={110}
                height={110}
                className="bg rounded-md bg-white px-6"
              />
              <hr
                className={`w-[75%] ${
                  paymentMethod === e.value
                    ? "h-[3px] bg-color1"
                    : "h-[1px] bg-gray-200"
                }`}
              />
              <span
                className={`text-sm transition-all ease-linear ${
                  paymentMethod === e.value
                    ? "font-semibold opacity-100"
                    : "text-black opacity-50"
                }`}
              >
                {e.text}
              </span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
