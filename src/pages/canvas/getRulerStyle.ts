import type { CSSProperties } from "vue";

export const getCustomStyle = (type: "row" | "column"): CSSProperties => {
  return {
    "background-color": "#eeeeee",
  };
};

export const getRulerStyle = () => {
  return {
    markColor: "#7d8694",
    shortMarkWidth: 6,
    longMarkWidth: 12,
    //小刻度间隔
    markSpacing: 10,
    // 大刻度的间隔
    highlightSpacing: 100,
    font: "10px sans-serif",
    fontColor: "#7d8694",
  };
};
