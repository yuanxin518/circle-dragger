import { getRulerStyle } from "./getRulerStyle";

let ROW_RULER: HTMLCanvasElement | null = null;
let COLUMN_RULER: HTMLCanvasElement | null = null;
let rowContext: CanvasRenderingContext2D | null;
let columnContext: CanvasRenderingContext2D | null;

const VIEWCONTROLLER_SIZE = {
  width: 2000,
  height: 2000,
};

const rulerStyle = getRulerStyle();
/**
 * 初始化ruler
 * @param rowRuler
 * @param columnRuler
 */
export const initRuler = (
  rowRuler: HTMLCanvasElement | null,
  columnRuler: HTMLCanvasElement | null
) => {
  if (rowRuler) {
    ROW_RULER = rowRuler;
  } else {
    COLUMN_RULER = columnRuler;
  }

  if (ROW_RULER && COLUMN_RULER) {
    initRulerMark(ROW_RULER, COLUMN_RULER);
  }
};

/**
 * 初始化ruler的刻度
 * @param rRuler
 * @param cRuler
 */
export const initRulerMark = (
  rRuler: HTMLCanvasElement,
  cRuler: HTMLCanvasElement
) => {
  rowContext = rRuler.getContext("2d");
  columnContext = cRuler.getContext("2d");
  setRulerMark();
};

/**
 * 绘制ruler的刻度
 */
const setRulerMark = () => {
  const {
    markColor,
    shortMarkWidth,
    longMarkWidth,
    markSpacing,
    highlightSpacing,
  } = rulerStyle;
  rowContext!.strokeStyle = markColor;
  columnContext!.strokeStyle = markColor;

  for (let i = 0; i < VIEWCONTROLLER_SIZE.width; i++) {
    if (i % markSpacing === 0) {
      rowContext?.moveTo(i, 0);
      rowContext?.lineTo(i, shortMarkWidth);
      if (i % highlightSpacing === 0) {
        rowContext?.lineTo(i, longMarkWidth);
      }
      rowContext?.stroke();
    }
  }
  for (let i = 0; i < VIEWCONTROLLER_SIZE.height; i++) {
    if (i % markSpacing === 0) {
      columnContext?.moveTo(0, i);
      columnContext?.lineTo(shortMarkWidth, i);
      if (i % highlightSpacing === 0) {
        columnContext?.lineTo(longMarkWidth, i);
      }
      columnContext?.stroke();
    }
  }
};

/**
 * 设置ruler的宽度或高度
 * @param width
 * @param height
 */
export const setSize = (width: number, height: number) => {
  if (VIEWCONTROLLER_SIZE.width !== width) {
    VIEWCONTROLLER_SIZE.width = width;
    if (ROW_RULER) {
      ROW_RULER.width = width;
    }
  }
  if (VIEWCONTROLLER_SIZE.height !== height) {
    VIEWCONTROLLER_SIZE.height = height;
    if (COLUMN_RULER) {
      COLUMN_RULER.height = height;
    }
  }
  setRulerMark();
};
