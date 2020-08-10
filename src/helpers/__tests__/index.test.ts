import { getCurrenciesFromPair, formatNumber } from '../';

describe('Helpers', () => {
  it('getCurrenciesFromPair should return USD and BTC from USDBTC', () => {
    const result = getCurrenciesFromPair('USDBTC');
    expect(result).toEqual(['USD', 'BTC']);
  });

  it('formatNumber should return proper value when number has comma & decimal = 0', () => {
    const result = formatNumber({ number: 11.3445523232323 });
    expect(result).toEqual('11');
  });

  it('formatNumber should return proper value when number has comma & decimal = 2', () => {
    const result = formatNumber({ number: 11.22322323, decimals: 2 });
    expect(result).toEqual('11.22');
  });

  it('formatNumber should return proper value when its a very long number with comma & decimal 2', () => {
    const result = formatNumber({ number: 11222333.22132321, decimals: 2 });
    expect(result).toEqual('11,222,333.22');
  });

  it('formatNumber should return proper value when its a long number with comma & decimal 2 & decimal is one digit', () => {
    const result = formatNumber({ number: 1222.2, decimals: 3 });
    expect(result).toEqual('1,222.200');
  });

  it('formatNumber should return proper value when its a long number with comma & decimal 2 & decimal is one digit', () => {
    const result = formatNumber({ number: 0.00565855, decimals: 4 });
    expect(result).toEqual('0.0057');
  });

  it('formatNumber should return proper value when its a number with comma & decimal 2 & is a currency', () => {
    const result = formatNumber({
      number: 1222333.3456,
      decimals: 3,
      currency: 'USD'
    });
    expect(result).toEqual('$1,222,333.346');
  });
});
