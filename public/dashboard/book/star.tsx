import React from "react";

export default function star(filled: boolean, id: string) {
  if (filled)
    return (
      <svg
        key={id}
        width="25"
        height="23"
        viewBox="0 0 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3789 0L15.1853 8.63725H24.267L16.9197 13.9754L19.7261 22.6126L12.3789 17.2745L5.03157 22.6126L7.83798 13.9754L0.490697 8.63725H9.57244L12.3789 0Z"
          fill="#FFCE00"
        />
      </svg>
    );
  else
    return (
      <svg
        key={id}
        width="25"
        height="23"
        viewBox="0 0 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3789 0L15.1853 8.63725H24.267L16.9197 13.9754L19.7261 22.6126L12.3789 17.2745L5.03157 22.6126L7.83798 13.9754L0.490697 8.63725H9.57244L12.3789 0Z"
          fill="#B5B4B3"
          fillOpacity="0.2"
        />
      </svg>
    );
}
