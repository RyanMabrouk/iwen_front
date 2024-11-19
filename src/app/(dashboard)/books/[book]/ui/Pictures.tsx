import Image from "next/image";
import React from "react";
import MainPic from "./MainPic";
import SidePics from "./SidePics";

export default function Pictures() {
  const [liked, setLiked] = React.useState(false);
  return (
    <div dir="rtl" className="flex items-stretch gap-3">
      <MainPic liked={liked} setLiked={setLiked} />
      <SidePics />
    </div>
  );
}
