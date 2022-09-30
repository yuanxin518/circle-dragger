import { reactive, ref, type CSSProperties } from "vue";

export const useComponentEventStates = (props: any) => {
  return reactive({
    isHover: false,
  });
};

type State = ReturnType<typeof useComponentEventStates>;

export const useRenderedComponent = (props: any, states: State) => {
  const containerStyle = ref<CSSProperties>();
  /**
   * 点击组件
   * @param event
   */
  const clickComponent = (event: MouseEvent) => {
    setStyleProperties(getMoveableStyle());
  };

  const mouseEnter = (event: MouseEvent) => {
    states.isHover = true;
  };
  const mouseLeave = (event: MouseEvent) => {
    states.isHover = false;
  };

  const setStyleProperties = (CSS: CSSProperties) => {
    containerStyle.value = CSS;
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

  const getDefaultStyle = (): CSSProperties => {
    return {};
  };

  return {
    containerStyle,
    clickComponent,
    getDefaultStyle,
    mouseEnter,
    mouseLeave,
  };
};
