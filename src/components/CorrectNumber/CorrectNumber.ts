export const correctNumeral = (number: number, { one, two, plural }: {one:string, two: string, plural: string}) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return plural;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return plural;
};
