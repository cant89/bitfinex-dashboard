import React, { useEffect, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookSelector } from '../selectors/book';
import { bookWsRequest, bookWsClose } from '../actions/book';
import Loader from '../shared/Loader';
import { PRECISION_TYPES } from '../constants/book';
import { getSymbolFromPair } from '../helpers';
import FlexBox from '../shared/FlexBox';
import FlexContainer from '../shared/FlexContainer';

type TProps = {
  pair: string;
};

const Book: FunctionComponent<TProps> = ({ pair }) => {
  const dispatch = useDispatch();
  const {
    data: { asks, bids },
    isLoading,
    error
  } = useSelector(getBookSelector);
  const [precisionTypeIndex, setPrecisionTypeIndex] = useState(0);

  useEffect(() => {
    dispatch(bookWsClose());

    dispatch(
      bookWsRequest({
        symbol: getSymbolFromPair(pair),
        precision: PRECISION_TYPES[precisionTypeIndex]
      })
    );
  }, [precisionTypeIndex]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <section>
      <h2>ORDER BOOK</h2>
      <span>{precisionTypeIndex}</span>
      <button
        onClick={() =>
          setPrecisionTypeIndex(Math.max(0, precisionTypeIndex - 1))
        }
      >
        -
      </button>
      <button
        onClick={() =>
          setPrecisionTypeIndex(
            Math.min(PRECISION_TYPES.length, precisionTypeIndex + 1)
          )
        }
      >
        +
      </button>
      <FlexContainer>
        <FlexBox size='m'>
          {asks.map(({ PRICE, COUNT, AMOUNT }, i) => {
            return (
              <div key={i}>
                {COUNT} - {PRICE} - {AMOUNT}
              </div>
            );
          })}
        </FlexBox>

        <FlexBox size='m'>
          {bids.map(({ PRICE, COUNT, AMOUNT }, i) => {
            return (
              <div key={i}>
                {COUNT} - {PRICE} - {AMOUNT}
              </div>
            );
          })}
        </FlexBox>
      </FlexContainer>
    </section>
  );
};

export default Book;
