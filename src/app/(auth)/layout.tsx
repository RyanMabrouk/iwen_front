import React from "react";
import Image from "next/image";
import logo from "@/app/(auth)/(icons)/logo.svg";
import cart from "@/app/(auth)/(icons)/cart.svg";
import SidePicture from "./ui/SidePicture";
import FormContainer from "./ui/FormContainer";
import { PageProvider } from "../../provider/PageProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageProvider>
      <div
        style={{ background: "#CDECEA" }}
        className="relative flex min-h-screen flex-col font-tajawal"
      >
        <div className="absolute inset-0">
          <nav
            style={{ background: "#1C7775" }}
            className="flex items-center justify-between p-4 blur-[2px]"
          >
            <div className="flex items-center space-x-4">
              <select
                defaultValue="0"
                name="language"
                id="language"
                className="cursor-pointer rounded border-0 bg-inherit px-10 py-1 outline-none"
              >
                <option
                  className="cursor-pointer text-white"
                  value="0"
                  disabled
                >
                  اللغة
                </option>
                <option value="1">العربية</option>
              </select>
              <button className="rounded-md bg-white p-1">
                <Image src={cart} className="bg-white" alt="cart" />
              </button>
              <button
                style={{ background: "#27A098" }}
                className="rounded px-6 py-2 text-white"
              >
                إنشاء حساب
              </button>
            </div>
            <div className="flex items-center space-x-10">
              <ul className="flex space-x-4">
                <li className="text-xl text-white">إستكشف جديدنا</li>
                <li className="text-xl text-white">تواصل معنا</li>
                <li className="text-xl text-white">تعرف علينا</li>
              </ul>
              <Image
                src={logo}
                alt="logo"
                width={125}
                className="text-red-500"
              />
            </div>
          </nav>
          <footer
            style={{ background: "#BDE2E0" }}
            className="absolute bottom-0 left-0 right-0 w-full items-center justify-center p-4 py-10 text-white blur-[2px]"
          >
            <ul className="flex justify-center gap-20 text-zinc-600">
              <li>فقه إسلامي</li>
              <li>الحج و العمرة</li>
              <li>السيرة النبوية</li>
              <li>المرأة في الإسلام</li>
              <li>تفاسير</li>
              <li>ما قبل الإسلام</li>
              <li>مواضيع أخرى</li>
            </ul>
          </footer>
        </div>
        <div className="relative z-10 flex-grow">
          <div className="flex min-h-screen w-full items-center justify-center">
            <div className="grid h-[30rem] w-8/12 grid-cols-3 grid-rows-10 overflow-hidden rounded-2xl border bg-white max-md:h-fit max-md:w-10/12">
              <FormContainer>{children}</FormContainer>
              <SidePicture />
            </div>
          </div>
        </div>
      </div>
    </PageProvider>
  );
}
