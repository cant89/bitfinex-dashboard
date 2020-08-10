import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookSelector } from '../../selectors/book';
import { bookWsRequest, TBookOrder, bookWsClose } from '../../actions/book';
import Loader from '../../shared/Loader';
import {
  getSymbolFromPair,
  formatNumber,
  getCurrenciesFromPair
} from '../../helpers';
import FlexBox from '../../shared/FlexBox';
import FlexContainer from '../../shared/FlexContainer';
import { PRECISION_TYPES } from '../../constants/book';
import {
  FlexTable,
  FlexTableHead,
  FlexTableCell,
  FlexTableBody,
  FlexTableRow
} from '../../shared/FlexTable';

type TProps = {
  pair: string;
  precision: valueof<typeof PRECISION_TYPES>;
};

const BookContent: FunctionComponent<TProps> = ({ pair, precision = 0 }) => {
  const dispatch = useDispatch();
  const {
    data: { asks, bids },
    isLoading,
    error
  } = useSelector(getBookSelector);

  useEffect(() => {
    dispatch(bookWsClose());

    const symbol = getSymbolFromPair(pair);

    dispatch(
      bookWsRequest({
        symbol,
        precision
      })
    );
  }, [precision]);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <Loader />;
  }

  const [, curr2] = getCurrenciesFromPair(pair);

  return (
    <FlexContainer>
      <FlexBox size='m'>
        <FlexTable>
          <FlexTableHead>
            <FlexTableCell width='33.33%'>Count</FlexTableCell>
            <FlexTableCell width='33.33%'>Amount</FlexTableCell>
            <FlexTableCell width='33.33%'>Price</FlexTableCell>
          </FlexTableHead>
          <FlexTableBody>
            {bids.map(({ PRICE, COUNT, AMOUNT }: TBookOrder) => {
              return (
                <FlexTableRow key={Math.random()}>
                  <FlexTableCell width='33.33%'>{COUNT}</FlexTableCell>
                  <FlexTableCell width='33.33%'>
                    {formatNumber({ number: AMOUNT, decimals: 4 })}
                  </FlexTableCell>
                  <FlexTableCell width='33.33%'>
                    {formatNumber({ number: PRICE, currency: curr2 })}
                  </FlexTableCell>
                </FlexTableRow>
              );
            })}
          </FlexTableBody>
        </FlexTable>
      </FlexBox>

      <FlexBox size='m'>
        <FlexTable>
          <FlexTableHead>
            <FlexTableCell width='33.33%'>Price</FlexTableCell>
            <FlexTableCell width='33.33%'>Amount</FlexTableCell>
            <FlexTableCell width='33.33%'>Count</FlexTableCell>
          </FlexTableHead>
          <FlexTableBody>
            {asks.map(({ PRICE, COUNT, AMOUNT }: TBookOrder) => {
              return (
                <FlexTableRow key={Math.random()}>
                  <FlexTableCell width='33.33%'>
                    {formatNumber({ number: PRICE, currency: curr2 })}
                  </FlexTableCell>
                  <FlexTableCell width='33.33%'>
                    {formatNumber({ number: Math.abs(AMOUNT), decimals: 4 })}
                  </FlexTableCell>
                  <FlexTableCell width='33.33%'>{COUNT}</FlexTableCell>
                </FlexTableRow>
              );
            })}
          </FlexTableBody>
        </FlexTable>
      </FlexBox>
    </FlexContainer>
  );
};

export default BookContent;
