"use client";

import { useState, useEffect } from "react";
import { useSearchParams, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { useToast } from "@/hooks/useToast";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import useCart from "@/hooks/cart/useCart";
import useOffer from "@/hooks/data/offers/useOffer";
import getEndpoint from "@/services/getEndpoint";
import sendRequest from "@/services/sendRequest";
import { IValidationErrors } from "@/types";
import { Enums } from "@/types/database.types";

import PrimaryButton from "@/components/main/buttons/PrimaryButton";

import success_order from "../../../public/success_order.svg";
import SuccessMessage from "./ui/SuccessMessage";
import ShippingForm from "./ui/ShippingForm";
import PaymentMethodSelection from "./ui/PaymentMethodSelection";
import OrderConfirmation from "./ui/OrderConfirmation";
import OrderSummary from "./ui/OrderSummary";

interface ICreateOrderPayload {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  postal_code: string;
  payment_method: string;
}

interface ICreateOrderFromCartPayload extends ICreateOrderPayload {
  books: {
    id: string;
    quantity: number;
  }[];
}

interface ICreateOrderFromOfferPayload extends ICreateOrderPayload {
  offer_id: string;
}

export default function CheckoutPage() {
  const { toast } = useToast();
  const [successFullySubmitted, setSuccessFullySubmitted] = useState(false);
  const { data: user, isLoading: userIsLoading } = useCurrentUser();
  const cart = useCart();
  const searchParams = useSearchParams();
  const offer_id = searchParams.get("offer_id");
  const offer_quantity = Number(searchParams.get("quantity"));
  const { data: offer } = useOffer(offer_id ?? "");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [paymentMethod, setPaymentMethod] =
    useState<Enums<"payment_method_enum">>("onDelivery");
  const [errors, setErrors] = useState<
    IValidationErrors<ICreateOrderPayload> | null | undefined
  >();

  const price_after_discount =
    (offer_id && offer
      ? Number(offer.price_after_offer) * offer_quantity
      : cart.total) ?? 0;
  const price_before_discount = offer_id
    ? Number(offer?.price_before_offer ?? 0) * offer_quantity
    : cart.total_before_discount;
  const delivery_fee = price_after_discount > 100 ? 0 : 10;

  const books =
    offer?.books?.map((e) => ({ ...e, quantity: offer_quantity })) ??
    cart.data ??
    [];

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

  const orderFromCartMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const phone_number = String(formData.get("phone_number"));
      const name = String(formData.get("first_name"));
      const address = String(formData.get("address1"));
      const postal_code = String(formData.get("postalCode"));

      const payload = {
        name,
        email: user?.data?.email,
        phone_number,
        address,
        city: selectedCity,
        postal_code,
        payment_method: paymentMethod,
        books:
          cart.data?.map((book) => ({
            id: book.id,
            quantity: book.quantity,
          })) ?? [],
      };

      const url = getEndpoint({
        resource: "orders",
        action: "createOrderFromCart",
      });

      const { error, validationErrors } = await sendRequest<
        never,
        ICreateOrderFromCartPayload
      >({
        method: "POST",
        url: url(),
        payload: payload,
      });

      if (error) {
        setErrors(validationErrors);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      cart.clearCart();
      setSuccessFullySubmitted(true);
      toast.success("تم إرسال الطلب بنجاح");
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء معالجة الطلب الرجاء التثبت من معطياتك",
      );
    },
  });

  const orderFromOfferMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const phone_number = String(formData.get("phone_number"));
      const name = String(formData.get("first_name"));
      const address = String(formData.get("address1"));
      const postal_code = String(formData.get("postalCode"));

      const payload = {
        name,
        email: user?.data?.email,
        phone_number,
        address,
        city: selectedCity,
        postal_code,
        payment_method: paymentMethod,
        offer_id,
        quantity: offer_quantity ?? 1,
      };

      const url = getEndpoint({
        resource: "orders",
        action: "createOrderFromOffer",
      });

      const { error, validationErrors } = await sendRequest<
        never,
        ICreateOrderFromOfferPayload
      >({
        method: "POST",
        url: url(),
        payload: payload,
      });

      if (error) {
        setErrors(validationErrors);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      cart.clearCart();
      setSuccessFullySubmitted(true);
      toast.success("تم إرسال الطلب بنجاح");
    },
    onError: (error) => {
      toast.error(
        error.message || "حدث خطأ أثناء معالجة الطلب الرجاء التثبت من معطياتك",
      );
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (offer) {
      orderFromOfferMutation.mutate(formData);
    } else {
      orderFromCartMutation.mutate(formData);
    }
  };

  if (!user?.data && !userIsLoading) {
    redirect("/login");
  }

  return (
    <div dir="rtl" className="my-8 h-fit">
      <div className="relative mx-auto my-10 flex w-full flex-row items-start justify-center gap-4 bg-bgcolor1 py-4">
        <div className="flex h-full items-center justify-center">
          {successFullySubmitted ? (
            <SuccessMessage />
          ) : (
            <form
              dir="rtl"
              className="min-w-[60svw] rounded-md bg-white p-6 shadow-md max-sm:w-screen"
              onSubmit={handleSubmit}
            >
              <ShippingForm
                user={user}
                errors={errors}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
              <PaymentMethodSelection
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
              <OrderConfirmation books={books} />
              <OrderSummary
                delivery_fee={delivery_fee}
                price_before_discount={price_before_discount ?? 0}
                price_after_discount={price_after_discount}
              />
              <div className="flex flex-row justify-between pl-6">
                <span className="flex flex-row items-center gap-2">
                  <Image
                    src="/truck.svg"
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
                  disabled={
                    orderFromCartMutation.isPending ||
                    orderFromOfferMutation.isPending
                  }
                  className="rounded-md bg-color2 p-2 px-4 text-lg text-white opacity-100 hover:opacity-50"
                >
                  {orderFromCartMutation.isPending ||
                  orderFromOfferMutation.isPending
                    ? "جاري الطلب..."
                    : "تأكيد الطلب"}
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
        </div>
      </div>
    </div>
  );
}
