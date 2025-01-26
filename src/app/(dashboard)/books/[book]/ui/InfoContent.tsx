import React from "react";
import MainInfo from "./Book Info/MainInfo";
import DetailedInfo from "./Book Info/DetailedInfo";
import CommentsInfo from "./Book Info/CommentsInfo";
import AuthorInfo from "./Book Info/AuthorInfo";
import DescriptionInfo from "./Book Info/AboutInfo";
import { useBookProvider } from "../provider/BookProvider";

export default function InfoContent() {
  const { view: selectedTab } = useBookProvider();
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
