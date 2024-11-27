"use client";
import React, { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Building2 } from "lucide-react";
import useCurrentUser from "@/hooks/data/user/useCurrentUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import getEndpoint from "@/services/getEndpoint";
import { useToast } from "@/hooks/useToast";
import { moroccanStates } from "@/helpers/data/data";
import sendRequest from "@/services/sendRequest";
import { z } from "zod";
import { IUserPayload, IValidationErrors } from "@/types";
import FormInput from "./formInput";
import FormSelect from "./formSelect";
const phoneNumberSchema = z
  .string()
  .regex(/^0\d{9}$/, "رقم الهاتف يجب أن يبدأ ب0 ويحتوي على 10 أرقام");
export default function Form() {
  const queryClient = useQueryClient();
  const { data: user } = useCurrentUser();
  console.log("🚀 ~ Form ~ user:", user?.data?.city)
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [errors, setErrors] = useState<
    IValidationErrors<IUserPayload> | null | undefined
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
      const first_name = String(formData.get("first_name"));
      const last_name = String(formData.get("last_name"));
      const phone_number = String(formData.get("phone_number"));
      const postal_code = String(formData.get("postalCode"));
      const street = String(formData.get("address1"));
      const street2 = String(formData.get("address2"));
      const url = getEndpoint({ resource: "users", action: "updateMe" });
      try {
        phoneNumberSchema.parse(phone_number);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0]?.message);
        }
        throw new Error("");
      }
      const payload = {
        first_name,
        last_name,
        phone_number,
        postal_code,
        street,
        street2,
        country: "Morocco",
        state: selectedState,
        city: selectedCity,
      };
      const { error, validationErrors } = await sendRequest<
        IUserPayload,
        IUserPayload
      >({
        method: "PATCH",
        url: url(),
        payload: payload,
      });

      if (error) {
        setErrors(validationErrors);
        throw new Error("");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      toast.success("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء تحديث الملف الشخصي");
    },
  });

  return (
    <form dir="rtl" className="bg-white " action={updateMutation.mutate}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput
          errors={errors?.first_name}
          label="الإسم"
          name="first_name"
          placeholder="صدقي"
          defaultValue={user?.data?.first_name}
          required
          icon={<User className="h-4 w-4" />}
        />
        <FormInput
          errors={errors?.last_name}
          label="اللقب"
          name="last_name"
          placeholder="تليجة"
          defaultValue={user?.data?.last_name}
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
        <FormSelect
        errors={errors?.state}
          label="الولاية"
          name="state"
          placeholder="اختر الولاية"
          options={moroccanStates.map((state) => state.state)}
          value={selectedState}
          required
          onChange={(value) => {
            if(value){
              setSelectedState(value);
            }

          }}
        />
        <FormSelect
          errors={errors?.city}
          label="المدينة"
          name="city"
          placeholder="اختر المدينة"
          options={ moroccanStates.find((state) => state.state === selectedState)?.cities || []
          }
          value={selectedCity}
          required
          onChange={(value) =>{ 
            if(value)setSelectedCity(value)
          }}
          disabled={!selectedState}
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
          errors={errors?.street}
          label="عنوان السكن - 1"
          name="address1"
          placeholder="شارع المهدي بن سلامة"
          defaultValue={user?.data?.street}
          required
          icon={<MapPin className="h-4 w-4" />}
        />
        <FormInput
          errors={errors?.street2}
          label="عنوان السكن - 2 (اختياري)"
          name="address2"
          placeholder="شارع المتنبي"
          defaultValue={user?.data?.street2}
          icon={<MapPin className="h-4 w-4" />}
        />
      
        <div></div>
        <div className="">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="rounded-md bg-color2 p-2 px-4 text-lg text-white opacity-100 hover:opacity-50"
          >
            {updateMutation.isPending ? "جاري التحديث..." : "احفظ التغيير"}
          </button>
        </div>
      </div>
    </form>
  );
}
