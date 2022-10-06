import { reactive, ref, type CSSProperties } from "vue";

export const useComponentEventStates = (props: any) => {
  return reactive({
    isHover: false,
    isChecked: false,
    isDown: false,
    offsetX: 0,
    offsetY: 0,
    clickPoint: {
      x: 0,
      y: 0,
    },
  });
};

type State = ReturnType<typeof useComponentEventStates>;

export const useRenderedComponent = (props: any, states: State) => {
  const containerStyle = ref<CSSProperties>();
  const maskStyle = ref<CSSProperties>();

  /**
   * 点击组件
   * @param event
   */
  const clickComponent = (event: MouseEvent) => {
    containerStyle.value = getMoveableStyle();
    states.isChecked = true;
    maskStyle.value = getCheckedStyle();

    if (!states.isHover) {
      states.isChecked = false;
      maskStyle.value = getDefaultStyle();
    }
  };

  const mouseEnter = (event: MouseEvent) => {
    states.isHover = true;
    maskStyle.value = getHoverStyle();
  };

  const mouseLeave = (event: MouseEvent) => {
    states.isHover = false;
    if (!states.isChecked) {
      maskStyle.value = getDefaultStyle();
    }
  };

  const mouseDown = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;

    states.clickPoint.x = event.clientX - target.offsetLeft;
    states.clickPoint.y = event.clientY - target.offsetTop;
    states.isDown = true;
  };

  const removeFocusStyle = () => {
    maskStyle.value = {};
  };

  /**
   * 可移动状态的样式
   * @returns
   */
  const getMoveableStyle = (): CSSProperties => {
    return {
      cursor: "move",
    };
  };

  const getHoverStyle = (): CSSProperties => {
    return {
      backgroundColor: "rgba(0,0,0,0.05)",
      border: "2px solid #44aaff",
    };
  };

  const getCheckedStyle = (): CSSProperties => {
    return {
      ...getHoverStyle(),
    };
  };

  const getDefaultStyle = (): CSSProperties => {
    return {};
  };

  return {
    containerStyle,
    maskStyle,
    clickComponent,
    getDefaultStyle,
    mouseEnter,
    mouseLeave,
    mouseDown,
    removeFocusStyle,
  };
};
