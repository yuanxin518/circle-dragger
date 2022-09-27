import { getRulerStyle } from "./getRulerStyle";

let ROW_RULER: HTMLCanvasElement | null = null;
let COLUMN_RULER: HTMLCanvasElement | null = null;
let rowContext: CanvasRenderingContext2D | null;
let columnContext: CanvasRenderingContext2D | null;

const isCache = [false, false];
const VIEWCONTROLLER_SIZE = {
  width: 2000,
  height: 2000,
};

const {
  markColor,
  shortMarkWidth,
  longMarkWidth,
  markSpacing,
  highlightSpacing,
  font,
  fontColor,
  backgroundColor,
  rulerWidth,
} = getRulerStyle();

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

//绘制文字
function strokeText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  isRow: boolean
) {
  context.font = font;
  context.fillStyle = fontColor;
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
 * 填充颜色
 * @param rowContext
 * @param columnContext
 */
export function fillColor(
  rowContext?: CanvasRenderingContext2D,
  columnContext?: CanvasRenderingContext2D
) {
  if (rowContext) {
    rowContext.fillStyle = backgroundColor;
    rowContext.fillRect(0, 0, VIEWCONTROLLER_SIZE.width, rulerWidth);
  }
  if (columnContext) {
    columnContext.fillStyle = backgroundColor;
    columnContext.fillRect(0, 0, rulerWidth, VIEWCONTROLLER_SIZE.height);
  }
}

/**
 * 绘制ruler的刻度
 */
const setRulerMark = () => {
  if (!rowContext || !columnContext) return;
  rowContext.strokeStyle = markColor;
  columnContext.strokeStyle = markColor;

  clearCanvas();

  if (isCache[0]) {
    fillColor(rowContext, undefined);
    for (let i = 0; i < VIEWCONTROLLER_SIZE.width; i++) {
      if (rowContext && i % markSpacing === 0) {
        rowContext.moveTo(i, 0);
        rowContext.lineTo(i, shortMarkWidth);
        if (i % highlightSpacing === 0) {
          rowContext.lineTo(i, longMarkWidth);
          strokeText(rowContext, i.toString(), i + 5, longMarkWidth + 5, true);
        }

        rowContext.stroke();
      }
    }
    changeResizeStatus("width", "off");
  }

  if (isCache[1]) {
    fillColor(undefined, columnContext);
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
      COLUMN_RULER.width = VIEWCONTROLLER_SIZE.width;
    }
  }
  setRulerMark();
};
export const setRulerTranslate = (type: "row" | "column", offset: number) => {
  rowContext!.translate(offset, offset);
  rowContext?.stroke();
};

const clearCanvas = () => {
  if (isCache[0]) {
    rowContext?.clearRect(
      0,
      0,
      VIEWCONTROLLER_SIZE.width,
      VIEWCONTROLLER_SIZE.height
    );
  }
  if (isCache[1]) {
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
    isCache[0] = status === "on";
  }
  if (type === "height") {
    isCache[1] = status === "on";
  }
};
