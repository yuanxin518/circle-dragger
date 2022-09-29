import { ref, type CSSProperties } from "vue";

export default () => {
  const containerStyle = ref<CSSProperties>();
  /**
   * 点击组件
   * @param event
   */
  const clickComponent = (event: MouseEvent) => {
    setStyleProperties(getMoveableStyle());
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
  };
};
