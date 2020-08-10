import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTradesSelector } from '../selectors/trades';
import { tradesWsRequest, TTrade } from '../actions/trades';
import Loader from '../shared/Loader';
import { getSymbolFromPair } from '../helpers';
import Card from '../shared/Card';
import Title from '../shared/Typography/Title';

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
    <Card>
      <Title type='h2'>Trades</Title>
      <section>
        {data.map(({ ID, AMOUNT, PRICE }: TTrade) => {
          return (
            <div key={ID}>
              {AMOUNT} - {PRICE}
            </div>
          );
        })}
      </section>
    </Card>
  );
};

export default Trades;
