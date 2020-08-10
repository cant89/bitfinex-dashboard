export const getSymbolFromPair = (pair: string) => {
  return `t${pair}`;
};

type TFormatNumber = (data: {
  number: number;
  decimals?: number;
  currency?: string;
}) => string;

export const formatNumber: TFormatNumber = ({
  number,
  decimals = 0,
  currency
}) => {
  return new Intl.NumberFormat('en-US', {
    ...(currency && {
      style: 'currency',
      currency
    }),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

const splitAt = (x: string, index: number): [string, string] => [
  x.slice(0, index),
  x.slice(index)
];

export const getCurrenciesFromPair = (pair: string) => {
  return splitAt(pair, 3);
};

export const getTimeFromTimestamp = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString();
