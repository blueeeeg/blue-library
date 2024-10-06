import { ReactNode, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: ReactNode;
  className?: string;
}

export function BottomFixedContainer({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | string | undefined>(undefined);
  const [isKeyboardHide, setIsKeyboardHide] = useState(true);

  useEffect(() => {
    const setResize = () => {
      const windowHeight = window.innerHeight;
      const visualViewportHeight =
        window.visualViewport?.height ?? window.innerHeight;

      if (visualViewportHeight < windowHeight) {
        setIsKeyboardHide(false);
      } else {
        setIsKeyboardHide(true);
      }

      if (containerRef?.current) {
        const containerHeight = containerRef.current.clientHeight;

        setTop(visualViewportHeight - containerHeight);
      }
    };

    window.addEventListener("resize", setResize);

    return () => {
      window.removeEventListener("resize", setResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "fixed w-full flex justify-center items-center bottom-0 transition-all duration-300",
        className
      )}
      style={{ top: isKeyboardHide ? undefined : top }}
    >
      {children}
    </div>
  );
}
