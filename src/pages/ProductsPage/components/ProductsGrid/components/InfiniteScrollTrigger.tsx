import { useEffect, useRef } from "react";

const InfiniteScrollTrigger = ({
  onIntersect,
}: {
  onIntersect: () => void;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [onIntersect]);

  return <div ref={ref} className="h-10 w-full" />;
};

export default InfiniteScrollTrigger;
