import { Mail, Send, User } from "lucide-react";
import React from "react";
import FormInput from "./formInput";
import FormTextarea from "./formtextArea";

export default function Form() {
  return (
    <form className="flex w-full flex-col gap-4 bg-bgcolor1 p-2 sm:p-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-color1">
          تحتاج لمساعدة أو لديك إستفسار ؟
        </h1>
        <h2 className="text-lg">أرسل لنا رسالة</h2>
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
      <button
        type="submit"
        className="flex w-fit items-center justify-center gap-2 rounded-md bg-color2 px-4 py-2 text-lg text-white transition-opacity hover:opacity-80"
      >
        <Send className="h-5 w-5" />
        <span className="mb-[-5px]"> أرسال لنا</span>
      </button>
    </form>
  );
}
