export const addZero = (x: number): string => {
  return x < 10 ? `0${x}` : `${x}`;
};

type asmdFunction = (a: number, b: number) => number;
const sumFunc: asmdFunction = (a, b) => a + b;
const multiplyFunc: asmdFunction = (a, b) => a * b;

export const sumValues = (...values: number[]): number => {
  return values.reduce(
    sumFunc,
    0
  );
};

export const multiplyValues = (...values: number[]): number => {
  return values.reduce(
    multiplyFunc,
    1
  );
};

const s = sumValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(s);

const m = multiplyValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log(m);
