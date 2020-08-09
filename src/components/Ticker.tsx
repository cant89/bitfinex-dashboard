import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickerSelector } from '../selectors/ticker';
import { tickerWsRequest, TTicker } from '../actions/ticker';
import Loader from '../shared/Loader';
import { getSymbolFromPair } from '../helpers';
import Card from '../shared/Card';
import Title from '../shared/Typography/Title';

type TProps = {
  pair: string;
};

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

  return (
    <Card>
      <Title type='h2'>Ticker</Title>
      <div>
        <p>BTC/USD</p>
        <p>VOL. {VOLUME * LAST_PRICE}</p>
        <p>LOW {LOW}</p>
        <p>HIGH {HIGH}</p>
      </div>
      <div>
        <p>
          {DAILY_CHANGE} ({DAILY_CHANGE_RELATIVE * 100}%)
        </p>
        <p>{LAST_PRICE}</p>
      </div>
    </Card>
  );
};

export default Ticker;
