import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTradesSelector } from '../../selectors/trades';
import { tradesWsRequest, TTrade } from '../../actions/trades';
import Loader from '../../shared/Loader';
import {
  getSymbolFromPair,
  formatNumber,
  getCurrenciesFromPair,
  getTimeFromTimestamp
} from '../../helpers';
import {
  FlexTable,
  FlexTableHead,
  FlexTableBody,
  FlexTableRow,
  FlexTableCell
} from '../../shared/FlexTable';

type TProps = {
  pair: string;
};

const TradesContent: FunctionComponent<TProps> = ({ pair }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(getTradesSelector);

  useEffect(() => {
    const symbol = getSymbolFromPair(pair);
    dispatch(tradesWsRequest(symbol));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  const [, curr2] = getCurrenciesFromPair(pair);

  return (
    <FlexTable>
      <FlexTableHead>
        <FlexTableCell width='33%'>Time</FlexTableCell>
        <FlexTableCell width='33%'>Price</FlexTableCell>
        <FlexTableCell width='33%'>Amount</FlexTableCell>
      </FlexTableHead>
      <FlexTableBody>
        {data.map(({ ID, MTS, AMOUNT, PRICE }: TTrade) => {
          return (
            <FlexTableRow key={ID}>
              <FlexTableCell width='33%'>
                {getTimeFromTimestamp(MTS)}
              </FlexTableCell>
              <FlexTableCell width='33%'>
                {formatNumber({ number: PRICE, currency: curr2 })}
              </FlexTableCell>
              <FlexTableCell width='33%'>
                {formatNumber({ number: Math.abs(AMOUNT), decimals: 4 })}
              </FlexTableCell>
            </FlexTableRow>
          );
        })}
      </FlexTableBody>
    </FlexTable>
  );
};

export default TradesContent;
