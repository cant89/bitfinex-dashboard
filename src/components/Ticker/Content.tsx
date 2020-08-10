import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TrendingUpIcon from '../../assets/trending_up.svg';
import TrendingDownIcon from '../../assets/trending_down.svg';
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

const TickerContent: FunctionComponent<TProps> = ({ pair }) => {
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
      <Line big>{formatNumber({ number: LAST_PRICE, currency: curr2 })}</Line>
      <Line
        color={isDailyChangePositive ? themeColors.success : themeColors.alert}
      >
        {formatNumber({ number: Math.abs(DAILY_CHANGE), decimals: 2 })} (
        {formatNumber({
          number: Math.abs(DAILY_CHANGE_RELATIVE * 100),
          decimals: 2
        })}
        %){' '}
        {isDailyChangePositive ? (
          <Icon
            component={<TrendingUpIcon />}
            width='24px'
            color={themeColors.success}
          />
        ) : (
          <Icon
            component={<TrendingDownIcon />}
            width='24px'
            color={themeColors.alert}
          />
        )}
      </Line>
      <Line>
        <LineTitle>VOL.</LineTitle>
        {formatNumber({
          number: VOLUME * LAST_PRICE,
          currency: curr2
        })}
      </Line>
      <Line>
        <LineTitle>LOW</LineTitle>
        {formatNumber({ number: LOW, currency: curr2 })}
      </Line>
      <Line>
        <LineTitle>HIGH</LineTitle>
        {formatNumber({ number: HIGH, currency: curr2 })}
      </Line>
    </>
  );
};

export default TickerContent;
