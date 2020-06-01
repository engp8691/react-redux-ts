export const addZero = (x: number): string => {
    return x < 10 ? `0${x}` : `${x}`;
};
