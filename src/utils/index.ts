const toKebabCase = (str: string): string =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map((x) => x.toLowerCase())
    .join("-");

const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};
const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export { toKebabCase, toCamelCase, capitalize };
