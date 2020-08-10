import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TrendingUpIcon from '../../assets/trending_up.svg';
import Icon from '../../shared/Icon';
import { getTickerSelector } from '../../selectors/ticker';
import { tickerWsRequest, TTicker } from '../../actions/ticker';
import Loader from '../../shared/Loader';
import {
  getSymbolFromPair,
  formatNumber,
  getCurrenciesFromPair
} from '../../helpers';
import { themeColors } from '../../theme';
import { CURRENCIES } from '../../constants/app';

type TProps = {
  pair: string;
};

type TLineProps = {
  big?: boolean;
  color?: string;
};

const Line = styled.div<TLineProps>`
  margin-bottom: 8px;
  font-size: ${({ big }) => (big ? '20px' : '14px')};
  font-weight: ${({ big }) => (big ? '700' : '400')};
  color: ${({ color = themeColors.text.primary }) => color};
`;

const LineTitle = styled.span`
  color: ${themeColors.text.secondary};
  display: inline-block;
  width: 50px;
`;

const Ticker: FunctionComponent<TProps> = ({ pair }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(getTickerSelector);

  useEffect(() => {
    const symbol = getSymbolFromPair(pair);
    dispatch(tickerWsRequest(symbol));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  const {
    DAILY_CHANGE,
    DAILY_CHANGE_RELATIVE,
    LAST_PRICE,
    VOLUME,
    LOW,
    HIGH
  } = data as TTicker;

  const [, curr2] = getCurrenciesFromPair(pair);
  const isDailyChangePositive = DAILY_CHANGE > 0;

  return (
    <>
      <Line big>
        {CURRENCIES[curr2]} {formatNumber(LAST_PRICE)}
      </Line>
      <Line
        color={isDailyChangePositive ? themeColors.success : themeColors.alert}
      >
        {formatNumber(Math.abs(DAILY_CHANGE), 2)} (
        {formatNumber(Math.abs(DAILY_CHANGE_RELATIVE * 100), 2)}%){' '}
        {isDailyChangePositive ? (
          <Icon
            component={<TrendingUpIcon />}
            width={20}
            color={themeColors.success}
          />
        ) : (
          <Icon
            component={<TrendingDownIcon />}
            width={20}
            color={themeColors.alert}
          />
        )}
      </Line>
      <Line>
        <LineTitle>VOL.</LineTitle>
        {CURRENCIES[curr2]} {formatNumber(VOLUME * LAST_PRICE)}
      </Line>
      <Line>
        <LineTitle>LOW</LineTitle>
        {CURRENCIES[curr2]} {formatNumber(LOW)}
      </Line>
      <Line>
        <LineTitle>HIGH</LineTitle>
        {CURRENCIES[curr2]} {formatNumber(HIGH)}
      </Line>
    </>
  );
};

export default Ticker;
