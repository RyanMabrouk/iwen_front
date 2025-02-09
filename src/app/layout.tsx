import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Hydration from "@/provider/MainHydration";
import Store from "@/provider/QCStore";
import React from "react";
import dynamic from "next/dynamic";
import type { Viewport } from "next";
import Script from "next/script";
const SpeedInsights = dynamic(() =>
  import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
);
const Analytics = dynamic(() =>
  import("@vercel/analytics/react").then((mod) => mod.Analytics),
);
const ToastProvider = dynamic(() =>
  import("@/hooks/useToast").then((mod) => mod.ToastProvider),
);
const ToastContainer = dynamic(() =>
  import("@/hooks/useToast").then((mod) => mod.ToastContainer),
);
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "white",
};

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: {
    default: "دار إيوان | مكتبتك الموثوقة",
    template: " دار إيوان | %s",
  },
  description:
    "دار إيوان هي مكتبتك الموثوقة التي توفر مجموعة واسعة من الكتب باللغة العربية وغيرها. اكتشف مجموعتنا الغنية وابحث عن كتابك التالي.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "دار إيوان",
    "دار ايوان",
    "iwann",
    "iwen",
    "iwan",
    "iwenn",
    "dar iwan",
    "dar iwen",
    "dar iwann",
    "dar al iwann",
    "dar al iwen",
    "dar al iwan",
    "dar al iwenn",
    "dar-al-iwann",
    "dar-al-iwen",
    "dar-al-iwan",
    "dar-al-iwenn",
    "دار الإيوان",
    "دار إيوان للنشر",
    "دار إيوان للنشر والتوزيع",
    "دار ايوان للنشر والتوزيع",
    "مكتبة",
    "كتب",
    "كتاب",
    "روايات",
    "قراءة",
    "متجر كتب",
    "شراء كتب",
    "بيع كتب",
    "متجر كتب عربي",
  ],
  authors: [
    {
      name: "دار إيوان",
      url: "https://www.dar-iwan.shop",
    },
  ],
  creator: "دار إيوان",
  publisher: "دار إيوان للنشر",
  applicationName: "دار إيوان",
  robots: "index, follow",
  openGraph: {
    title: "دار إيوان | مكتبتك الموثوقة",
    description:
      "اكتشف عالم الكتب مع دار إيوان. تصفح مجموعتنا الغنية وابحث عن كتابك المفضل.",
    url: "https://www.dar-iwan.shop",
    siteName: "دار إيوان",
    images: [
      {
        url: "https://www.dar-iwan.shop/icon.ico",
        width: 1200,
        height: 630,
        alt: "دار إيوان - مكتبتك الموثوقة",
      },
    ],
    type: "website",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dar_iwan",
    creator: "@dar_iwan",
    title: "دار إيوان | مكتبتك الموثوقة",
    description:
      "استكشف مجموعة دار إيوان الغنية من الكتب باللغة العربية. ابحث عن كتابك القادم الآن.",
    images: ["https://www.dar-iwan.shop/icon.ico"],
  },
  alternates: {
    canonical: "https://www.dar-iwan.shop",
  },
  metadataBase: new URL("https://www.dar-iwan.shop"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "دار إيوان",
              url: "https://www.dar-iwan.shop",
              description:
                "دار إيوان هي مكتبتك الموثوقة التي توفر مجموعة واسعة من الكتب باللغة العربية وغيرها.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+216 26187939",
                contactType: "Customer Service",
              },
              sameAs: [
                "https://www.linkedin.com/company/dar-iwan",
                "https://www.facebook.com/dar.iwan",
                "https://twitter.com/dar_iwan",
              ],
            }),
          }}
        />
      </head>

      <body className={tajawal.className + " min-h-screen"}>
        <Analytics />
        <SpeedInsights />{" "}
        <Store>
          {/* @ts-ignore bug */}
          <Hydration>
            <ToastProvider>
              <ToastContainer />
              <main>{children}</main>{" "}
            </ToastProvider>
          </Hydration>
        </Store>
      </body>
    </html>
  );
}
