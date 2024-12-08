import { Mail, User } from "lucide-react";
import React from "react";
import FormInput from "../../(profile)/profile/ui/formInput";
import FormTextarea from "../../(profile)/profile/ui/formtextArea";

export default function Form() {
  return (
    <form className="flex w-full flex-col gap-2 bg-bgcolor1 p-2 sm:p-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-color1">
          تحتاج لمساعدة أو لديك إستفسار ؟
        </h1>
        <h2 className="text-xl">أرسل لنا رسالة</h2>
      </div>

      <FormInput
        label="الإسم"
        name="full name"
        placeholder="أدخل الإسم الكامل"
        required
        icon={<User className="h-4 w-4" />}
      />
      <FormInput
        label="البريد الإلكتروني"
        name="email"
        type="email"
        placeholder="أدخل البريد الإلكتروني"
        required
        icon={<Mail className="h-4 w-4" />}
      />
      <FormInput
        label="الموضوع"
        name="subject"
        placeholder="أدخل الموضوع"
        required
      />
      <FormTextarea
        label="محتوى الرسالة"
        name="content"
        required
        placeholder="اكتب رسالتك هنا"
      />
    </form>
  );
}
