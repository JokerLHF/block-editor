let id = 100;

export const createBlockId = () => {
  return `${id++}`;
}