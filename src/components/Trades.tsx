import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTradesSelector } from '../selectors/trades';
import { tradesWsRequest } from '../actions/trades';
import Loader from '../shared/Loader';
import { getSymbolFromPair } from '../helpers';

type TProps = {
  pair: string;
};

const Trades: FunctionComponent<TProps> = ({ pair }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(getTradesSelector);

  useEffect(() => {
    dispatch(tradesWsRequest(getSymbolFromPair(pair)));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <h2>TRADES</h2>
      <section style={{ overflow: 'auto', height: '300px' }}>
        {data.map(({ ID, MTS, AMOUNT, PRICE }) => {
          return (
            <div key={ID}>
              {AMOUNT} - {PRICE}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Trades;
