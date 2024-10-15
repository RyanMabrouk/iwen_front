import Image from "next/image";
import React from "react";
import CustomSwiper from "./ui/Swiper";
import PrimaryButton from "@/components/PrimaryButton";
import SelectWithBorder from "@/components/main/SelectWithBorder";
import CategoryIcon from "@/components/icons/CategoryIcon";
import CategoryBooks from "@/components/CategoryBooksSection";
import BookCart from "@/components/BookCart";
import ArrowLeft from "@/components/icons/ArrowLeft";
import CategoryKidsBooks from "@/components/CategoryKidsBooks";
import ArrowRight from "@/components/icons/ArrowRight";

export default function page() {
  return (
    <div className="[&_.swiper-pagination-bullet-active]:bg-primary-200">
      <div className="relative">
        <div className="mx-auto max-w-[87rem] py-28">
          <div className="relative overflow-hidden rounded-xl">
            <CustomSwiper
              slides={Array.from({ length: 2 }).map((_, i) => (
                <div className="relative flex h-[30.842rem] w-full max-w-[87rem] items-center justify-between bg-primary-300">
                  <div className="relative ml-36 w-fit">
                    <Image src="/book.png" width={250} height={385} alt="" />
                    <div className="absolute inset-x-0 -bottom-4 mx-auto h-8 w-[70%] scale-x-[1.3] rounded-[100%] bg-black opacity-30 blur-lg"></div>
                  </div>

                  <div className="mr-10 space-y-20">
                    <div className="w-[470px] space-y-0.5">
                      <h1 className="p-2.5 text-[42px] font-extrabold text-black">
                        رَوْضَةُ العُقَلاَءِ
                      </h1>
                      <p className="text-2xl">
                        كتاب رؤوس المسائل (المسائل الخلافية بين الحنفية
                        والشافعية) للزمخشري، دراسة وتحقيق: عبد الله نذير أحمد.
                        الزمخشري إمام كبير في الحديث، والتفسير، والنحو،
                        والبلاغة.
                      </p>
                    </div>
                    <PrimaryButton>اشتري الآن</PrimaryButton>
                  </div>
                  <h1 className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2 text-[53px] font-bold text-primary-400">
                    <span>د.م </span>
                    <span>80.000 </span>
                  </h1>
                </div>
              ))}
              initialSlide={0}
              slidesPerView={1}
              pagination
              loop
              allowTouchMove
              speed={1500}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
              }}
            />

            <Image
              src={"/cartDecoration.svg"}
              height={242}
              width={38}
              alt={""}
              className="absolute left-[55%] top-0 z-10"
            />
          </div>
        </div>
        <Image
          src={"/decoration1.png"}
          width={172}
          height={262}
          alt={""}
          className="absolute -left-0 top-[40px]"
        />
        <Image
          src={"/decoration2.png"}
          width={65}
          height={65}
          alt={""}
          className="absolute right-[40px] top-1/2"
        />
      </div>
      <CategoryBooks />
      <div className="relative overflow-hidden">
        <div className="absolute -right-2/3 -top-48">
          <img src="/acs2.png" className="" />
        </div>

        <div className="py-20 pb-40">
          {/* <div className="h-[495px] w-[443px] rounded-[20px] bg-black"></div> */}
          <ArrowLeft
            size={36}
            className="btn_swiper_arrow_left absolute left-[200px] top-1/4 z-20 cursor-pointer text-primary-400"
          />
          <ArrowRight
            size={36}
            className="btn_swiper_arrow_right absolute right-[200px] top-1/4 z-20 cursor-pointer text-primary-400"
          />
          <CustomSwiper
            navigation={{
              prevEl: ".btn_swiper_arrow_left",
              nextEl: ".btn_swiper_arrow_right",
            }}
            slides={Array.from({ length: 2 }).map((_, i) => (
              <div className="mx-auto flex items-center justify-center gap-[125px]">
                <div className="w-[480px] space-y-20">
                  <div className="space-x-2">
                    <h1 className="flex flex-col py-2 text-3xl">
                      <span className="font-bold">إحصل على ثلات كتب</span>
                      <span>بسعر كتابين فقط </span>
                    </h1>
                    <p className="text-lg">
                      كتاب رؤوس المسائل (المسائل الخلافية بين الحنفية والشافعية)
                      للزمخشري، دراسة وتحقيق: عبد الله نذير أحمد. الزمخشري إمام
                      كبير في الحديث، والتفسير، والنحو، والبلاغة.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col text-lg text-gray-400">
                      <span>السعر قبل العرض</span>
                      <span>120.000 TND</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <PrimaryButton>تمتع بالعرض</PrimaryButton>
                      <span className="flex gap-[18px] text-3xl">
                        <span>فقط</span>
                        <span>80.000 MAD</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-[495px] w-[443px] rounded-[20px] bg-black"></div>
              </div>
            ))}
            initialSlide={0}
            slidesPerView={1}
            pagination
            loop
            allowTouchMove
            speed={1500}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            className=""
          />
          <div className="relative mx-auto w-[1494px] space-y-[78px] py-20">
            <img src="/acs2.png" className="absolute inset-0 -left-1/2" />
            <h2 className="p-1 text-center text-3xl font-bold">
              موثوقين من قبل
            </h2>
            <div className="z-10 mx-auto grid h-[186px] w-fit grid-cols-5 items-center gap-[136px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                  <img src={`/sponsor${i + 1}.png`} alt={`Sponsor ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex h-[518px] w-full items-end bg-[#E7F6F5]/30 pb-28">
        <img
          src="/SectionBook.png"
          className="absolute inset-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <img src="/decoration2.png" className="absolute right-36 top-36" />
        <img src="/acs.png" className="absolute left-80 top-36" />
        <img src="/decoration2.png" className="absolute left-96 h-11 w-11" />
        <img
          src="/acs.png"
          className="absolute bottom-32 right-80 h-14 w-14 -rotate-45"
        />
        <div className="mx-auto w-fit space-y-8 text-center text-3xl">
          <div className="space-y-2">
            {" "}
            <p className="text-center">يمكنك الأن </p>
            <p className="text-center font-medium">
              التمتع بخاصية قراءة الكتاب على الموقع مباشرة
            </p>
          </div>

          <PrimaryButton>إستكشف أكثر</PrimaryButton>
        </div>
      </div>
      <CategoryKidsBooks />
      <div className="mx-auto flex w-fit items-center justify-between gap-[268px] py-40 text-center">
        <div className="space-y-8 text-center">
          <span className="text-3xl font-medium">مؤلفين جدد إنضموا إلينا</span>
          <p className="w-[577px] text-center text-xl font-light">
            معرض أبوظبي الدولي للكتاب من قبل أحد ممثلي ... انضموا إلينا وكونوا
            جزء من هذا الحدث العالمي. ... ومواهبهم لخلق جيل جديد من الكتاب
            والناشرين
          </p>
          <PrimaryButton>ألقي نظرة</PrimaryButton>
        </div>
        <div>
          <div className="flex items-end gap-24">
            {" "}
            <div className="mb-11 h-[286px] w-[357px] rounded-2xl bg-black"></div>
            <div className="h-[257px] w-[242px] rounded-2xl bg-black"></div>
          </div>

          <div className="mx-auto h-[204px] w-[167px] rounded-2xl bg-black"></div>
        </div>
      </div>
    </div>
  );
}
