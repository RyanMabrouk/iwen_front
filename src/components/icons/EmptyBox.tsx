import React, { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src: string;
        background: string;
        speed: string;
        style: React.CSSProperties;
        loop: boolean;
        autoplay: boolean;
      };
    }
  }
}

export default function EmptyBox() {
  return (
    <>
      <script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
      ></script>
      <dotlottie-player
        src="https://lottie.host/0808d5fc-b261-4496-85fc-36f65617c384/1QAUTOftKa.lottie"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px" }}
        loop
        autoplay
      ></dotlottie-player>
    </>
  );
}
