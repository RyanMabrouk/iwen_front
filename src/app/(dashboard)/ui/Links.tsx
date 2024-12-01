import React from "react";
import Link from "./Link";

export default function Links() {
  return (
    <ul className="flex items-center gap-3">
      <Link> إستكشف جديدنا</Link>
      <Link> تواصل معنا</Link>
      <Link>تعرف علينا</Link>
    </ul>
  );
}
