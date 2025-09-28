"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import NavbarDefault from "./navbardefault";
import NavbarScroll from "./navbarScrolled";
import BottomNav from "./bottomNav";
// import { useDispatch } from 'react-redux';
// import { openPopup } from '../../redux/slices/loginmodal/loginmodal';

type NavbarProps = {
  onAuthTrigger: (login: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ onAuthTrigger }) => {
  // const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);
  const scrollStateRef = useRef(false); // Prevent re-renders
  const tickingRef = useRef(false);
  const { scrollY } = useScroll();

  const SCROLL_IN_THRESHOLD = 50;
  const SCROLL_OUT_THRESHOLD = 20;

  useEffect(() => {
    const current = window.scrollY;
    const initial = current > SCROLL_IN_THRESHOLD;
    scrollStateRef.current = initial;
    setScrolled(initial);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!tickingRef.current) {
      tickingRef.current = true;

      requestAnimationFrame(() => {
        const prev = scrollStateRef.current;
        let shouldScroll = prev;

        if (!prev && latest > SCROLL_IN_THRESHOLD) {
          shouldScroll = true;
        } else if (prev && latest < SCROLL_OUT_THRESHOLD) {
          shouldScroll = false;
        }

        if (shouldScroll !== prev) {
          scrollStateRef.current = shouldScroll;
          setScrolled(shouldScroll);
        }

        tickingRef.current = false;
      });
    }
  });

  return (
    <>
      <div
        className={`sticky top-0 w-full z-50 bg-white transition-all duration-300 ease-in-out ${
          scrolled ? "h-[60px] sm:h-[60px]" : "h-[160px] md:h-[200px]"
        }`}
      >
        <div className="relative w-full">
          {/* Default Navbar */}
          <div
            className={`ease-in-out h-full absolute top-0 left-0 w-full ${
              scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <NavbarDefault scrolled={false} />
          </div>

          {/* Scrolled Navbar */}
          <div
            className={`transition-opacity duration-300 ease-in-out h-full ${
              scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <NavbarScroll scrolled={true}  onAuthTrigger={onAuthTrigger}/>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Navbar;
