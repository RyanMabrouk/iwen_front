import React from "react";
import MainInfo from "./Book Info/MainInfo";
import DetailedInfo from "./Book Info/DetailedInfo";
import CommentsInfo from "./Book Info/CommentsInfo";
import AuthorInfo from "./Book Info/AuthorInfo";
import DescriptionInfo from "./Book Info/DescriptionInfo";

export default function InfoContent({ selectedTab }: { selectedTab: number }) {
  switch (selectedTab) {
    case 1:
      return <MainInfo />;
    case 2:
      return <DetailedInfo />;
    case 3:
      return <CommentsInfo />;
    case 4:
      return <AuthorInfo />;
    case 5:
      return <DescriptionInfo />;
    default:
      return <div>an Error occured</div>;
  }
}
