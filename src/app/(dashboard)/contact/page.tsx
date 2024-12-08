import React from "react";
import Discover from "./ui/discover";
import Form from "./ui/form";
import ContactInfo from "./ui/contactInfo";

export default function Page() {
  return (
    <div dir="rtl" className="flex flex-col gap-10 px-10">
      <Discover />
      <div className="flex flex-col sm:flex-row justify-center gap-10">
        <Form />
        <div className="w-full flex flex-col gap-4">
          <ContactInfo />
          <iframe
            width="425"
            height="350"
            className="border border-1 w-full"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-7.629833221435548%2C32.99549079274747%2C-7.609748840332032%2C33.007637822018836&amp;layer=mapnik&amp;marker=33.00156451644311%2C-7.619791030883789"
          ></iframe>
          <br />
          <small>
            <a href="https://www.openstreetmap.org/?mlat=33.00156&amp;mlon=-7.61979#map=16/33.00156/-7.61979">
              Afficher une carte plus grande
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
