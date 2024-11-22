import React from "react";
import MainInfo from "./Book Info/MainInfo";
import DetailedInfo from "./Book Info/DetailedInfo";
import CommentsInfo from "./Book Info/CommentsInfo";
import AuthorInfo from "./Book Info/AuthorInfo";
import DescriptionInfo from "./Book Info/AboutInfo";
import { PageType } from "./BookInfo";

export default function InfoContent({
  selectedTab,
}: {
  selectedTab: PageType;
}) {
  switch (selectedTab) {
    case "main":
      return <MainInfo />;
    case "details":
      return <DetailedInfo />;
    case "comments":
      return <CommentsInfo />;
    case "author":
      return <AuthorInfo />;
    case "about":
      return <DescriptionInfo />;
    default:
      return <div>an Error occured</div>;
  }
}
