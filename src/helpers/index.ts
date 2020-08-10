export const getSymbolFromPair = (pair: string) => {
  return `t${pair}`;
};

export const formatNumber = (number: number, decimal: number = 0): string => {
  const withDecimalAsString = number.toFixed(decimal);
  const asNumber = parseFloat(withDecimalAsString);
  const decimalsOfNumber = asNumber.toString().split('.')[1] || '';
  const zerosAtTheEnd =
    decimal > 0 && decimalsOfNumber.length !== decimal
      ? `.${new Array(decimal + 1 - decimalsOfNumber.length).join('0')}`
      : '';
  return asNumber.toLocaleString() + zerosAtTheEnd;
};

const splitAt = (x: string, index: number): [string, string] => [
  x.slice(0, index),
  x.slice(index)
];

export const getCurrenciesFromPair = (pair: string) => {
  return splitAt(pair, 3);
};
