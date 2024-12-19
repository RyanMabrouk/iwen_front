import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/main/buttons/PrimaryButton";
import success_order from "../../../../../public/success_order.svg";

export default function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={success_order}
        height={300}
        width={300}
        alt=""
        priority
        className="-mt-4 mb-6 h-full w-full max-w-[60svw] object-cover"
      />
      <Link href="/purchaseHistory">
        <PrimaryButton
          size="md"
          className="flex w-[10rem] flex-row-reverse items-center justify-center gap-1"
        >
          <Image
            src="/double-arrow-right-white.svg"
            alt=""
            className="-ml-3 rotate-180"
            width={25}
            height={25}
          />
          <span>طلباتي</span>
        </PrimaryButton>
      </Link>
    </div>
  );
}
