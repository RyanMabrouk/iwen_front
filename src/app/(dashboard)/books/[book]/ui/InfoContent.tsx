import React from "react";
import MainInfo from "./Book Info/MainInfo";
import DetailedInfo from "./Book Info/DetailedInfo";
import CommentsInfo from "./Book Info/CommentsInfo";
import AuthorInfo from "./Book Info/AuthorInfo";
import DescriptionInfo from "./Book Info/DescriptionInfo";

export default function InfoContent({ selectedTab }: { selectedTab: number }) {
  switch (selectedTab) {
    case 1:
      return (
        <div>
          <MainInfo />
        </div>
      );
    case 2:
      return (
        <div>
          <DetailedInfo />
        </div>
      );
    case 3:
      return (
        <div>
          <CommentsInfo />
        </div>
      );
    case 4:
      return (
        <div>
          <AuthorInfo />
        </div>
      );
    case 5:
      return (
        <div>
          <DescriptionInfo />
        </div>
      );
    default:
      return <div>an Error occured</div>;
  }
}
