import { getRulerStyle } from "./getRulerStyle";

let ROW_RULER: HTMLCanvasElement | null = null;
let COLUMN_RULER: HTMLCanvasElement | null = null;
let rowContext: CanvasRenderingContext2D | null;
let columnContext: CanvasRenderingContext2D | null;

const isResize = [false, false];
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

  [
    rowContext as CanvasRenderingContext2D,
    columnContext as CanvasRenderingContext2D,
  ].forEach((item) => {
    if (!item) return;
    item.font = "20px";
  });

  setRulerMark();
};

//绘制文字
function strokeText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  isRow: boolean
) {
  if (!isRow) {
    context.save();
    context.translate(x, y);
    context.rotate((90 * Math.PI) / 180);
    context.fillText(text, 0, 5);
    context.restore();
  } else {
    context.fillText(text, x, y);
  }
}

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
  if (!rowContext || !columnContext) return;
  rowContext.strokeStyle = markColor;
  columnContext.strokeStyle = markColor;

  clearCanvas();

  if (isResize[0]) {
    for (let i = 0; i < VIEWCONTROLLER_SIZE.width; i++) {
      if (rowContext && i % markSpacing === 0) {
        rowContext.moveTo(i, 0);
        rowContext.lineTo(i, shortMarkWidth);
        if (i % highlightSpacing === 0) {
          rowContext.lineTo(i, longMarkWidth);
          strokeText(rowContext, i.toString(), i + 5, longMarkWidth + 5, true);
        }

        rowContext?.stroke();
      }
    }
    changeResizeStatus("width", "off");
  }

  if (isResize[1]) {
    for (let i = 0; i < VIEWCONTROLLER_SIZE.height; i++) {
      if (columnContext && i % markSpacing === 0) {
        columnContext.moveTo(0, i);
        columnContext.lineTo(shortMarkWidth, i);
        if (i % highlightSpacing === 0) {
          columnContext.lineTo(longMarkWidth, i);

          strokeText(
            columnContext,
            i.toString(),
            longMarkWidth + 5,
            i + 5,
            false
          );
        }
        columnContext.stroke();
      }
    }
    changeResizeStatus("height", "off");
  }
};

/**
 * 设置ruler的宽度或高度
 * @param width
 * @param height
 */
export const setRulerSize = (width: number, height: number) => {
  if (width !== VIEWCONTROLLER_SIZE.width) changeResizeStatus("width", "on");
  if (height !== VIEWCONTROLLER_SIZE.height) changeResizeStatus("height", "on");

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

const clearCanvas = () => {
  if (isResize[0]) {
    rowContext?.clearRect(
      0,
      0,
      VIEWCONTROLLER_SIZE.width,
      VIEWCONTROLLER_SIZE.height
    );
  }
  if (isResize[1]) {
    columnContext?.clearRect(
      0,
      0,
      VIEWCONTROLLER_SIZE.width,
      VIEWCONTROLLER_SIZE.height
    );
  }
};

const changeResizeStatus = (type: "width" | "height", status: "on" | "off") => {
  if (type === "width") {
    isResize[0] = status === "on";
  }
  if (type === "height") {
    isResize[1] = status === "on";
  }
};
