import { useEffect, useState } from "react";
import { KeyboardArrowUpIcon } from "../assets/icons";
import { customTwMerge } from "../shared/utils/Tailwind.util";

const SHOW_AFTER_PX = 500;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={customTwMerge(
        "fixed right-5 bottom-5 z-40 cursor-pointer",
        "flex h-11 w-11 items-center justify-center rounded-full",
        "bg-orange shadow-lg",
        "hover:bg-orange-dark transition",
      )}
      aria-label="Scroll to top"
    >
      <KeyboardArrowUpIcon className="fill-surface-primary h-7 w-7" />
    </button>
  );
};

export default ScrollToTopButton;
