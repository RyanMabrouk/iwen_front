"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getEndpoint from "@/services/getEndpoint";
import { useToast } from "@/hooks/useToast";
import { moroccanStates } from "@/helpers/data/data";
import sendRequest from "@/services/sendRequest";
import { z } from "zod"; 

const phoneNumberSchema = z
  .string()
  .regex(/^0\d{9}$/, "رقم الهاتف يجب أن يبدأ ب0 ويحتوي على 10 أرقام");

const formSchema = z.object({
  first_name: z.string().min(1, "الاسم الأول مطلوب"),
  last_name: z.string().min(1, "اللقب مطلوب"),
  phone_number: phoneNumberSchema, 
  postalCode: z.string().min(1, "الرقم البريدي مطلوب"),
  address1: z.string().min(1, "عنوان السكن مطلوب"),
  address2: z.string().optional(),
  state: z.string().min(1, "الولاية مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
});
export default function Form() {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  useEffect(() => {
    if (user?.data) {
      setSelectedState(user.data.state || "");
      if (user.data.state) {
        setSelectedCity(user.data.city || "");
      }
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      // Convert the FormData into a plain object
      const formValues = Object.fromEntries(formData) as {
        first_name: string;
        last_name: string;
        phone_number: string;
        postalCode: string;
        address1: string;
        address2?: string;
        state: string;
        city: string;
      };
      try {
        formSchema.parse(formValues); 
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(` ${error.errors[0].message}`);
        }
      }

      const first_name = String(formData.get("first_name"));
      const last_name = String(formData.get("last_name"));
      const phone_number = String(formData.get("phone_number"));
      const postal_code = String(formData.get("postalCode"));
      const street = String(formData.get("address1"));
      const street2 = String(formData.get("address2"));
      const url = getEndpoint({ resource: "users", action: "updateMe" });
      const payload = { first_name, last_name, phone_number, postal_code, street, street2, country: "Morocco", state: selectedState, city: selectedCity };

      const { error } = await sendRequest({
        method: "PATCH",
        url: url(),
        payload: payload,
      });

      if (error) throw new Error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      toast.success("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      toast.error(
        `حدث خطأ أثناء تحديث الملف الشخصي: ${(error as Error).message}`
      );
    },
  });


  const citiesForState =
    moroccanStates.find((state) => state.state === selectedState)?.cities || [];

  return (
    <form
      dir="rtl"
      className="bg-white sm:px-4"
      action={updateMutation.mutate}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="block text-right text-lg font-medium text-gray-700"
          >
            الإسم<span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="first_name"
              placeholder="صدقي"
              className="pl-3 pr-10 focus:ring-color1"
              defaultValue={user?.data?.first_name}
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="block text-right text-lg font-medium text-gray-700"
          >
            اللقب<span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input    
              name="last_name"
              placeholder="تليجة"
              className="pl-3 pr-10 focus:ring-color1"
              defaultValue={user?.data?.last_name}
            />
          </div>
        </div>
            {/* Email */}
            <div className="space-y-2">
          <Label
            htmlFor="email"
            className="block text-right text-lg font-medium text-gray-700"
          >
            البريد الإلكتروني<span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              disabled
              placeholder="sedki_tilja@gmail.com"
              className="pl-3 pr-10 focus:ring-color1"
              defaultValue={user?.data?.email}
            />
          </div>
        </div>
        {/* Phone Number */}
        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="block text-right text-lg font-medium text-gray-700"
          >
            رقم الهاتف<span className="text-destructive">*</span>
          </Label>
          <div className="flex">
            <Select dir="rtl" defaultValue="+212">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+212">+212</SelectItem>
                {/* Add more country codes as needed */}
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
              type="number"
                name="phone_number"
                defaultValue={user?.data?.phone_number}
                placeholder="004 47 18 74"
                className="rounded-r-md pl-3 pr-10 focus:ring-color1"
              />
            </div>
          </div>
        </div>

        {/* State */}
        <div className="space-y-2">
          <Label
            htmlFor="state"
            className="block text-right text-lg font-medium text-gray-700"
          >
            الولاية<span className="text-destructive">*</span>
          </Label>
          <Select
            dir="rtl"
            value={selectedState}
            onValueChange={(value) => {
              setSelectedState(value);
              setSelectedCity("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الولاية" />
            </SelectTrigger>
            <SelectContent>
              {moroccanStates.map((state, index) => (
                <SelectItem key={index} value={state.state}>
                  {state.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label
            htmlFor="city"
            className="block text-right text-lg font-medium text-gray-700"
          >
            المدينة<span className="text-destructive">*</span>
          </Label>
          <Select
            dir="rtl"
            value={selectedCity}
            defaultValue={selectedCity}
            onValueChange={(value) => setSelectedCity(value)}
            disabled={!selectedState}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent>
              {citiesForState.map((city, index) => (
                <SelectItem key={index} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label
            htmlFor="postalCode"
            className="block text-right text-lg font-medium text-gray-700"
          >
            الرقم البريدي<span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Building2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={user?.data?.postal_code}
              type="number"
              name="postalCode"
              placeholder="10004"
              className="pl-3 pr-10 focus:ring-color1"
            />
          </div>
        </div>

        {/* Address 1 */}
        <div className="space-y-2">
          <Label
            htmlFor="address1"
            className="block text-right text-lg font-medium text-gray-700"
          >
            عنوان السكن - 1<span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={user?.data?.street}
              name="address1"
              placeholder="شارع المهدي بن سلامة"
              className="pl-3 pr-10 focus:ring-color1"
            />
          </div>
        </div>

        {/* Address 2 */}
        <div className="space-y-2">
          <Label
            htmlFor="address2"
            className="block text-right text-lg font-medium text-gray-700"
          >
            عنوان السكن - 2 (اختياري)
          </Label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              defaultValue={user?.data?.street2}
              name="address2"
              placeholder="شارع المتنبي"
              className="pl-3 pr-10 focus:ring-color1"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div></div>
        <div className="">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="bg-color1 text-lg p-2 px-4 rounded-md text-white opacity-100 hover:opacity-50"
          >
            {updateMutation.isPending ? "جاري التحديث..." : "احفظ التغيير"}
          </button>
        </div>
      </div>
    </form>
  );
}

