import { useEffect } from "react";

export const DisableInspect = () => {
  useEffect(() => {
    // Disable right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable common developer-tool shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl + Shift + I
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "I" || e.key === "i")
      ) {
        e.preventDefault();
      }

      // Ctrl + Shift + J
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "J" || e.key === "j")
      ) {
        e.preventDefault();
      }

      // Ctrl + Shift + C
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === "C" || e.key === "c")
      ) {
        e.preventDefault();
      }

      // Ctrl + U
      if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};
