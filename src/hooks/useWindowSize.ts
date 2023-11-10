import { useEffect, useState } from "react";

const getWindowSize = () => {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return { windowWidth, windowHeight };
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return windowSize;
};
