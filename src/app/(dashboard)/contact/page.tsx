import React from "react";
import Discover from "./ui/discover";
import Form from "./ui/form";
import ContactInfo from "./ui/contactInfo";

export default function Page() {
  return (
    <div dir="rtl" className="flex flex-col  sm:px-10">
      <Discover />
      <div className="my-12 px-4 flex flex-col justify-center gap-10 sm:flex-row">
        <Form />
        <div className="flex w-full flex-col gap-4">
          <ContactInfo />
          <iframe
            width="425"
            height="350"
            className="border-1 h-full w-full border"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-7.629833221435548%2C32.99549079274747%2C-7.609748840332032%2C33.007637822018836&amp;layer=mapnik&amp;marker=33.00156451644311%2C-7.619791030883789"
          ></iframe>
        </div>
        
      </div>
    </div>
  );
}
