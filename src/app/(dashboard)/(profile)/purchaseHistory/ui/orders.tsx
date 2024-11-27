"use client";

import { myOrdersQuery } from "@/hooks/data/payments/orders/myOrdersQuery";
import useMyOrders from "@/hooks/data/payments/orders/useMyOrders";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Pagination } from "@mui/material";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import NoPurchases from "./noPurchases";

export default function Orders() {
  const [page, setPage] = useState<number>(1);
  const limit = 3;
  const { data: orders } = useMyOrders({ limit, page });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (orders?.data?.meta?.has_next_page) {
      queryClient.prefetchQuery(
        myOrdersQuery({
          page: page + 1,
          limit,
        }),
      );
    }
  }, [page, orders?.data?.meta?.has_next_page, queryClient]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "canceled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  if (orders?.data?.meta.total_count === 0) {
    return <NoPurchases />;
  }
  return (
    <div className="mx-auto" dir="rtl">
      <h1 className="mb-8 text-right text-3xl font-bold text-color1">طلباتي</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {orders?.data?.data.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-muted">
              <CardTitle className="flex items-center justify-between">
                <span className="sm:text-2xl text-xl ">طلب #{order.id.slice(-5)}</span>
                <div
                  className={`${getStatusColor(order.status)} p-2 rounded-xl text-sm w-fit sm:text-base font-normal text-white`}
                >
                  {order.status === "paid"
                    ? "مدفوع"
                    : order.status === "pending"
                      ? "قيد الانتظار"
                      : "ملغى"}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4 text-right">
                {" "}
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  {" "}
                  <span className="font-semibold">التاريخ:</span>{" "}
                  {formatDate(order.created_at)}
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">الإجمالي:</span>{" "}
                  {order.total_price.toFixed(2)} د.م
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">تكلفة التوصيل:</span>{" "}
                  {order.delivery_price.toFixed(2)} د.م
                </p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold">طريقة الدفع:</span>
                  {order.payment_method === "onDelivery"
                    ? "عند التسليم"
                    : order.payment_method === "online"
                      ? "عبر الإنترنت"
                      : "تحويل بنكي"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="mt-4 bg-muted">
              <Dialog>
                <DialogTrigger className="m-auto">
                  <button className="m-auto mt-[-1rem] flex items-center rounded-sm bg-white px-4 py-2 shadow-lg hover:opacity-50">
                    <Package className="ml-2 h-4 w-4" /> عرض تفاصيل الطلب
                  </button>
                </DialogTrigger>
                <DialogContent dir="rtl" className="sm:h-[30rem]">
                  <div className="p-4 text-right">
                    <h2 className="text-xl font-semibold text-color1">
                      تفاصيل الطلب
                    </h2>
                    <div
                      className="mt-4 space-y-4"
                      style={{ maxHeight: "calc(5 * 4rem)", overflowY: "auto" }} // Allow scroll if more than 3 items
                    >
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4"
                        >
                          <Image
                            src={product.images_urls[0]}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">
                              {product.title}
                            </h3>
                            <p className="flex items-center gap-1 text-sm text-muted-foreground">
                              <span>{product.quantity}</span>
                              <span>&#x200E;x&#x200E;</span>
                              <span>{product.price_after_discount}</span>
                              د.م
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          className="flex w-full justify-center"
          count={orders?.data?.meta?.total_pages || 1}
          page={page}
          boundaryCount={3}
          siblingCount={3}
          onChange={(e, value) => setPage(value)}
          dir="ltr"
        />
      </div>
    </div>
  );
}
