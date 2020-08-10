import { getCurrenciesFromPair, formatNumber } from '../';

describe('Helpers', () => {
  it('getCurrenciesFromPair should return USD and BTC from USDBTC', () => {
    const result = getCurrenciesFromPair('USDBTC');
    expect(result).toEqual(['USD', 'BTC']);
  });

  it('formatNumber should return proper value when number has comma & decimal = 0', () => {
    const result = formatNumber(11.3445523232323, 0);
    expect(result).toEqual('11');
  });

  it('formatNumber should return proper value when number has comma & decimal = 2', () => {
    const result = formatNumber(11.22322323, 2);
    expect(result).toEqual('11.22');
  });

  it('formatNumber should return proper value when its a very long number with comma & decimal 2', () => {
    const result = formatNumber(11222333.22132321, 2);
    expect(result).toEqual('11,222,333.22');
  });

  it('formatNumber should return proper value when its a long number with comma & decimal 2 & decimal is one digit', () => {
    const result = formatNumber(1222.2, 3);
    expect(result).toEqual('1,222.200');
  });
});
