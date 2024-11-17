import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedCorrectIconProps {
  src: string;
  alt: string;
}

const AnimatedCorrectIcon: React.FC<AnimatedCorrectIconProps> = ({
  src,
  alt,
}) => {
  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.1,
      rotate: -540,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        times: [0, 0.3, 0.6, 1],
        opacity: { duration: 0.2 },
        scale: { duration: 0.4 },
        rotate: { duration: 0.6, ease: "easeInOut" },
        y: { duration: 0.4, ease: "easeOut" },
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={iconVariants}>
      <Image className="m-6" src={src} alt={alt} width={100} height={100} />
    </motion.div>
  );
};

export default AnimatedCorrectIcon;
