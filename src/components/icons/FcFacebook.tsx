import React from "react";

export default function FcFacebook({
  size = 48,
}: {
  size: number;
}): JSX.Element {
  return (
    <div>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 48 48"
        height={size}
        width={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#3F51B5"
          d="M24,4C12.955,4,4,12.955,4,24c0,9.998,7.683,18.257,17.555,19.839v-14.01h-5.29v-5.828h5.29v-4.297
          c0-5.23,3.13-8.115,7.935-8.115c2.253,0,4.187,0.167,4.75,0.242v5.504l-3.264,0.001c-2.56,0-3.06,1.216-3.06,3.006v3.659h6.104
          l-0.796,5.828h-5.308v14.01C36.317,42.257,44,33.998,44,24C44,12.955,35.045,4,24,4z"
        />
      </svg>
    </div>
  );
}
