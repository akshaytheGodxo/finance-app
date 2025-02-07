"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "~/app/hooks/use-outside-click";

// Define Card Type
type Card = {
  name: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => JSX.Element;
};

// Cards Data
const cards: Card[] = [
  {
    name: "John Doe",
    title: "Excellent Platform!",
    src: "/elon.jpg",
    ctaText: "Read More",
    ctaLink: "/reviews/john-doe",
    content: () => (
      <p>
        "This platform has completely changed the way I approach stock and crypto markets.
        The interactive and game-based approach makes learning fun and engaging. Highly
        recommend it to anyone looking to improve their investment skills!"
        <br /> <br /> The UI is seamless, and the AI chatbot is incredibly helpful in
        answering queries. It has been an amazing experience so far!"
      </p>
    ),
  },
  {
    name: "Sarah Johnson",
    title: "Super Engaging & Informative",
    src: "/emilia.webp",
    ctaText: "Read More",
    ctaLink: "/reviews/sarah-johnson",
    content: () => (
      <p>
        "I never thought financial learning could be this exciting! The tutorials and
        simulated trading sessions are very realistic and helped me understand real-world
        trading strategies."
        <br /> <br /> "The customer support team is also super responsive and always ready
        to help. Five stars from me!"
      </p>
    ),
  },
  {
    name: "Michael Lee",
    title: "Great Learning Experience!",
    src: "/john.webp",
    ctaText: "Read More",
    ctaLink: "/reviews/michael-lee",
    content: () => (
      <p>
        "I was skeptical at first, but after using this platform for a month, I can
        confidently say that my understanding of market trends has improved drastically."
        <br /> <br /> "The platform is user-friendly and visually appealing, making it easy
        to stay engaged while learning. Absolutely love it!"
      </p>
    ),
  },
];

export function ExpandableCardDemo() {
  const [active, setActive] = useState<Card | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    document.body.style.overflow = active ? "hidden" : "auto";

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              className="absolute top-4 right-4 bg-white rounded-full p-2"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-60 object-cover"
                />
              </motion.div>

              <div className="p-4">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="font-bold text-neutral-700 dark:text-neutral-200 text-lg"
                >
                  {active.title}
                </motion.h3>
                <motion.p className="text-neutral-600 dark:text-neutral-400 mt-2">
                  {active.content()}
                </motion.p>
                <motion.a
                  layoutId={`button-${active.title}-${id}`}
                  href={active.ctaLink}
                  target="_blank"
                  className="mt-4 block text-center px-4 py-3 text-sm font-bold  text-white bg-[#F8D57E] hover:bg-[#eeb424] rounded-full"
                >
                  {active.ctaText}
                </motion.a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={60}
                  height={60}
                  src={card.src}
                  alt={card.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </motion.div>
              <div>
                <motion.h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                  {card.title}
                </motion.h3>
                <motion.p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {card.name}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm font-bold rounded-lg w-44 h-12 hover:bg-[#eeb424] hover:text-white text-black rounded-full bg-[#F8D57E]"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-black"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
