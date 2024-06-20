import { useState, useEffect } from "react";
import { useWindowHeight } from "@react-hook/window-size"
const useWindowHeightHook = () => {
  const [height, setHeight] = useState(0);
  const newHeight = useWindowHeight();
  useEffect(() => {
    setHeight(newHeight)
  }, [newHeight]);

  return height;
}

export default useWindowHeightHook;