"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { FiHome, FiHeart, FiUser } from "react-icons/fi";

const BottomNav = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";

    if (direction === "down" && latest > 50) {
      setVisible(false);
    } else if (direction === "up") {
      setVisible(true);
    }

    lastScrollY.current = latest;
  });

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white border-t z-50 transition-transform duration-300 ease-in-out sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex w-2.5 h-20 p-4 flex-grow flex-shrink-0 basis-auto items-start justify-center mx-auto max-w-[560px] gap-[30px]">
        <button className="flex flex-col items-center text-gray-700">
          <FiHome size={30} />
          <span className="text-xs">Explore</span>
        </button>

        <button className="flex flex-col items-center text-gray-700">
          <FiHeart size={30} />
          <span className="text-xs">Wishlist</span>
        </button>

        <button className="flex flex-col items-center text-gray-700">
          <FiUser size={30} />
          <span className="text-xs">Login</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
