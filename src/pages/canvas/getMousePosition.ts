type MouseProperties = {
  offsetX: number;
  offsetY: number;
};

export default (event: MouseEvent) => {
  if (!event) return;

  return {
    offsetX: event.offsetX,
    offsetY: event.offsetY,
  } as MouseProperties;
};
