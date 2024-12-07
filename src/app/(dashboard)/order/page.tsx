"use client";
import Image from "next/image";
import FormInput from "../(profile)/profile/ui/formInput";
import FormSelect from "../(profile)/profile/ui/formSelect";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IValidationErrors } from "@/types";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import { useMutation } from "@tanstack/react-query";
import getEndpoint from "@/services/getEndpoint";
import { z } from "zod";
import sendRequest from "@/services/sendRequest";
import { useToast } from "@/hooks/useToast";
import { moroccanStates } from "@/helpers/data/data";
import { Enums } from "@/types/database.types";
import useCart from "@/hooks/cart/useCart";
import { redirect } from "next/navigation";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import Link from "next/link";

interface ICreateOrderPayload {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  postal_code: string;
  payment_method: string;
  books: {
    id: string;
    quantity: number;
  }[];
}

const phoneNumberSchema = z
  .string()
  .regex(/^0\d{9}$/, "رقم الهاتف يجب أن يبدأ ب0 ويحتوي على 10 أرقام");

export default function Page() {
  const { toast } = useToast();
  const [successFullySubmitted, setSuccessFullySubmitted] = useState(false);
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const cart = useCart();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    useState<Enums<"payment_method_enum">>("onDelivery");
  const [errors, setErrors] = useState<
    IValidationErrors<ICreateOrderPayload> | null | undefined
  >();

  useEffect(() => {
    if (user?.data?.state) {
      setSelectedState(user.data.state);
    }
  }, [user?.data?.state]);

  useEffect(() => {
    if (user?.data?.city) {
      setSelectedCity(user.data.city);
    }
  }, [user?.data?.city]);

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const phone_number = String(formData.get("phone_number"));
      const name = String(formData.get("first_name"));
      const address = String(formData.get("address1"));
      const postal_code = String(formData.get("postalCode"));
      const books =
        cart.data?.map((book) => ({
          id: book.id,
          quantity: book.quantity,
        })) ?? [];

      const payload = {
        name,
        email: user?.data?.email,
        phone_number,
        address,
        city: selectedCity,
        postal_code,
        payment_method: paymentMethod,
        books,
      };

      const url = getEndpoint({ resource: "orders", action: "createOrder" });

      try {
        phoneNumberSchema.parse(phone_number);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0]?.message);
        }
        throw new Error("");
      }
      const { error, validationErrors } = await sendRequest<
        never,
        ICreateOrderPayload
      >({
        method: "POST",
        url: url(),
        payload: payload,
      });

      if (error) {
        setErrors(validationErrors);
        throw new Error("");
      }
    },
    onSuccess: () => {
      cart.clearCart();
      setSuccessFullySubmitted(true);
      toast.success("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء معالجة الطلب");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    updateMutation.mutate(formData);
  };

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

  if (!user?.data && !userIsLoading) {
    redirect("/login");
  }

  return (
    <div dir="rtl" className="my-8 h-fit">
      <div className="relative mx-auto my-10 flex w-full flex-row items-start justify-center gap-4 bg-bgcolor1 py-4">
        <div className="flex h-full items-center justify-center">
          {successFullySubmitted ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/success_order.svg"}
                height={300}
                width={300}
                alt=""
                className="-mt-4 mb-6 h-full w-full max-w-[60svw] object-cover"
              />
              <Link href="/purchaseHistory">
                <PrimaryButton
                  size="md"
                  className="flex w-[10rem] flex-row-reverse items-center justify-center gap-1"
                >
                  <Image
                    src="/double-arrow-right-white.svg"
                    alt=""
                    className="-ml-3 rotate-180"
                    width={25}
                    height={25}
                  />
                  <span>طلباتي</span>
                </PrimaryButton>
              </Link>
            </div>
          ) : (
            <form
              dir="rtl"
              className="min-w-[60svw] rounded-md bg-white p-6 shadow-md"
              onSubmit={handleSubmit}
            >
              <div className="mb-6 text-lg font-semibold">الشحن</div>
              <div className="grid w-full grid-cols-2 gap-6 md:grid-cols-2">
                <FormInput
                  errors={errors?.name}
                  label="الإسم"
                  name="first_name"
                  placeholder="صدقي"
                  defaultValue={user?.data?.first_name}
                  required
                  icon={<User className="h-4 w-4" />}
                />
                <FormInput
                  errors={errors?.email}
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  placeholder="sedki_tilja@gmail.com"
                  defaultValue={user?.data?.email}
                  required
                  disabled
                  icon={<Mail className="h-4 w-4" />}
                />
                <FormSelect
                  label="الولاية"
                  name="state"
                  placeholder="اختر الولاية"
                  options={moroccanStates.map((state) => state.state)}
                  value={selectedState}
                  required
                  onChange={(value) => {
                    if (value) {
                      setSelectedState(value);
                    }
                  }}
                />
                <FormSelect
                  errors={errors?.city}
                  label="المدينة"
                  name="city"
                  placeholder="اختر المدينة"
                  options={
                    moroccanStates.find(
                      (state) => state.state === selectedState,
                    )?.cities || []
                  }
                  value={selectedCity}
                  required
                  onChange={(value) => {
                    if (value) setSelectedCity(value);
                  }}
                  disabled={!selectedState}
                />{" "}
                <FormInput
                  errors={errors?.phone_number}
                  label="رقم الهاتف"
                  name="phone_number"
                  type="number"
                  placeholder="004 47 18 74"
                  defaultValue={user?.data?.phone_number}
                  required
                  icon={<Phone className="h-4 w-4" />}
                />
                <FormInput
                  errors={errors?.postal_code}
                  label="الرقم البريدي"
                  name="postalCode"
                  placeholder="10004"
                  defaultValue={user?.data?.postal_code}
                  required
                  icon={<Building2 className="h-4 w-4" />}
                />
                <FormInput
                  errors={errors?.address}
                  label="عنوان السكن - 1"
                  name="address1"
                  placeholder="شارع المهدي بن سلامة"
                  defaultValue={user?.data?.street}
                  required
                  icon={<MapPin className="h-4 w-4" />}
                />
              </div>
              <div className="my-12 text-lg font-semibold">طريقة الدفع</div>
              <div className="my-12 flex flex-row items-center gap-4">
                {payment_methods.map((e, i) => (
                  <>
                    <input
                      type="radio"
                      name="payment_method"
                      id={`payment_method_${i}`}
                      value={e.value}
                      onChange={(event) => {
                        if (e.forbidden) return;
                        setPaymentMethod(event.target.value as any);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor={`payment_method_${i}`}
                      key={i}
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
                  </>
                ))}
              </div>
              <div className="mt-12 text-lg font-semibold">تأكيد الشراء</div>
              <div className="flex max-w-[60svw] flex-1 flex-row flex-wrap gap-4">
                {cart.data?.map((book, i) => (
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
                          <span>({book.quantity}x)</span>
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

              <div className="my-8 flex flex-row items-center gap-6">
                <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg text-black">
                  <span className="text-lg">توصيل</span>
                  <span>{8} د.م</span>
                </div>
                <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg text-black">
                  <span className="text-lg">الإجمالي الفرعي</span>
                  <del>{cart.total_before_discount} د.م</del>
                </div>
                <div className="flex w-full flex-row items-center justify-between rounded-md bg-color7 px-12 py-6 text-center text-lg font-semibold text-color1">
                  <span className="text-lg">المبلغ النهائي</span>
                  <span>{(cart.total ?? 0) + 8} د.م</span>
                </div>
              </div>

              <div className="flex flex-row justify-between pl-6">
                <span className="flex flex-row items-center gap-2">
                  <Image
                    src={"/truck.svg"}
                    alt=""
                    width={60}
                    height={60}
                    className="bg rounded-md bg-white"
                  />
                  <span className="text-lg font-semibold">
                    الدفع نقدا عند التوصيل
                  </span>
                </span>
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="rounded-md bg-color2 p-2 px-4 text-lg text-white opacity-100 hover:opacity-50"
                >
                  {updateMutation.isPending ? "جاري الطلب..." : "تأكيد الطلب"}
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="-ml-14 flex flex-col gap-2">
          <Image
            src="/dar_iwan.svg"
            alt="book"
            className="-mt-4 rounded-lg"
            width={300}
            height={300}
          />
          <Image
            src="/phone_number.svg"
            alt="book"
            className="-mt-4 rounded-lg"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
