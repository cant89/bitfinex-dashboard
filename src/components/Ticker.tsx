import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickerSelector } from '../selectors/ticker';
import { tickerWsRequest } from '../actions/ticker';
import Loader from '../shared/Loader';
import { getSymbolFromPair } from '../helpers';

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
    BID,
    BID_SIZE,
    ASK,
    ASK_SIZE,
    DAILY_CHANGE,
    DAILY_CHANGE_RELATIVE,
    LAST_PRICE,
    VOLUME,
    HIGH,
    LOW
  } = data;

  return (
    <section>
      <h2>TICKER</h2>
      <div>
        <p>BTC/USD</p>
        <p>VOL. {VOLUME}</p>
        <p>LOW {LOW}</p>
      </div>
      <div>
        <p>
          {DAILY_CHANGE} ({DAILY_CHANGE_RELATIVE * 100}%)
        </p>
        <p>{LAST_PRICE}</p>
      </div>
    </section>
  );
};

export default Ticker;
