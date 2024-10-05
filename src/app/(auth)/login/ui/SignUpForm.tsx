import Image from "next/image";
import React from "react";
import lock from "@/app/(auth)/icons/unlock.svg";
import envelope from "@/app/(auth)/icons/envelope.svg";
import eye from "@/app/(auth)/icons/eye-crossed.svg";
import profile from "@/app/(auth)/icons/Profile.svg";
import { set } from "zod";

export default function SignUpForm() {
  const [email, setEmail] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<boolean>(false);
  const [password2, setPassword2] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showPassword2, setShowPassword2] = React.useState<boolean>(false);
  const [informations, setInformations] = React.useState<boolean>(true);
  return (
    <div className="flex h-full w-full flex-col items-end gap-1">
      {informations && (
        <>
          <label htmlFor="">الإسم*</label>
          <div
            onFocus={() => setUser(true)}
            onBlur={() => setUser(false)}
            className={`${user && "border-emerald-700"} flex w-full justify-end gap-2 rounded-md border p-2 transition-all duration-300 focus:border focus:border-emerald-400`}
          >
            <input
              id="email"
              className="h-[20px] flex-1 outline-none"
              type="email"
              dir="rtl"
            />
            <Image src={profile} alt="envelope" />
          </div>
          <label htmlFor="">البريد إلكتروني*</label>
          <div
            onFocus={() => setEmail(true)}
            onBlur={() => setEmail(false)}
            className={`${email && "border-emerald-700"} flex w-full justify-end gap-2 rounded-md border p-2 transition-all duration-300 focus:border focus:border-emerald-400`}
          >
            <input
              id="email"
              className="h-[20px] flex-1 outline-none"
              type="email"
              dir="rtl"
            />
            <Image src={envelope} alt="envelope" />
          </div>
          <label htmlFor="">كلمة المرور*</label>
          <div
            onFocus={() => setPassword(true)}
            onBlur={() => setPassword(false)}
            className={`${password && "border-emerald-500"} flex w-full justify-between gap-2 rounded-md border p-2`}
          >
            <button onClick={() => setShowPassword((e) => !e)}>
              <Image src={eye} alt="eye" />
            </button>
            <div className="flex flex-1 justify-end gap-2">
              <input
                id="password"
                className="h-[20px] flex-1 outline-none"
                type={`${showPassword ? "text" : "password"}`}
                dir="rtl"
              />
              <Image src={lock} alt="lock" />
            </div>
          </div>
          <label htmlFor="">التأكد من كلمة المرور*</label>
          <div
            onFocus={() => setPassword2(true)}
            onBlur={() => setPassword2(false)}
            className={`${password2 && "border-emerald-500"} flex w-full justify-between gap-2 rounded-md border p-2`}
          >
            <button onClick={() => setShowPassword2((e) => !e)}>
              <Image src={eye} alt="eye" />
            </button>
            <div className="flex flex-1 justify-end gap-2">
              <input
                id="password"
                className="h-[20px] flex-1 outline-none"
                type={`${showPassword2 ? "text" : "password"}`}
                dir="rtl"
              />
              <Image src={lock} alt="lock" />
            </div>
          </div>
          <button
            onClick={() => setInformations(false)}
            style={{ background: "#27A098" }}
            className="text-md mt-2 w-full rounded-md p-3 text-center font-semibold text-white"
          >
            إنشاء حساب
          </button>
        </>
      )}
      {informations || (
        <div className="flex flex-col items-end gap-3">
          <h1 className="text-xl">نسخ رمز التحقق للمواصلة</h1>
          <h1 className="text-xl">
            : أدخل العدد المكون من 4 أرقام الذي أرسلناه إلى عنوان بريدك
            الإلكتروني
          </h1>
          <div className="flex items-center gap-2">
            <Input id={0} />
            <h1 className="text-xl">-</h1>
            <Input id={1} />
            <h1 className="text-xl">-</h1>
            <Input id={2} />
            <h1 className="text-xl">-</h1>
            <Input id={3} />
          </div>
          <h1>
            لم تتلق الرمز ؟{" "}
            <span
              className="cursor-pointer text-xl font-semibold"
              onClick={() => setInformations(true)}
            >
              إعادة الإرسال الآن
            </span>
          </h1>
        </div>
      )}
    </div>
  );
}

function Input({ id }: { id: number }) {
  const [value, setValue] = React.useState<string>("");
  return (
    <input
      value={value}
      id={`input${id}`}
      name={`input${id}`}
      min="0"
      max="9"
      onKeyDown={(e) => {
        if (
          (e.key === "Backspace" || "delete") &&
          e.currentTarget.value.length === 0
        ) {
          document.getElementById(`input${id - 1}`)?.focus();
        }
        if (e.key === "Backspace" || "delete") setValue("");
        if (e.key === "ArrowLeft") {
          document.getElementById(`input${id - 1}`)?.focus();
        }
        if (e.key === "ArrowRight") {
          document.getElementById(`input${id + 1}`)?.focus();
        }
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          return;
        }
        if (e.key in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
          setValue(e.key);
          console.log(id);
          document.getElementById(`input${id + 1}`)?.focus();
        }
      }}
      maxLength={1}
      placeholder="-"
      type="number"
      className={`h-[5rem] w-[4rem] rounded-xl border text-center text-2xl text-teal-600 outline-none ${value?.toString().length !== 0 ? "border-teal-600" : "border-gray-300"}`}
    />
  );
}
