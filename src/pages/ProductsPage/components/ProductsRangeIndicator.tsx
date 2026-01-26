import { useEffect, useRef, useState } from "react";

const FADE_OUT_DELAY = 800;
const SCROLL_THRESHOLD = 1000;

const ProductsRangeIndicator = ({
  rangeStart,
  rangeEnd,
  totalCount,
}: {
  rangeStart: number;
  rangeEnd: number;
  totalCount: number;
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < SCROLL_THRESHOLD) {
        setVisible(false);
        return;
      }

      setVisible((prev) => (prev ? prev : true));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setVisible(false);
      }, FADE_OUT_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (totalCount === 0 || rangeEnd === 0) {
    return null;
  }

  const safeRangeEnd = Math.min(rangeEnd, totalCount);

  return (
    <div
      className={`bg-surface-primary fixed right-18 bottom-[30px] z-40 rounded-sm px-2 shadow-xl transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-s12-l16 text-text-primary">
        {rangeStart}–{safeRangeEnd} / {totalCount}
      </span>
    </div>
  );
};

export default ProductsRangeIndicator;
