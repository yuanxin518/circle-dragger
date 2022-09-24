import type { CSSProperties } from "vue";

export const customStyle = (type: "row" | "column"): CSSProperties => {
  return {
    "background-color": "#000",
    opacity: "0.8",
  };
};
