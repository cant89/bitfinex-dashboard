import React, { useEffect, FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookSelector } from '../selectors/book';
import { bookWsRequest, TBookOrder, bookWsClose } from '../actions/book';
import Loader from '../shared/Loader';
import { PRECISION_TYPES } from '../constants/book';
import { getSymbolFromPair } from '../helpers';
import FlexBox from '../shared/FlexBox';
import FlexContainer from '../shared/FlexContainer';
import Card from '../shared/Card';
import Title from '../shared/Typography/Title';

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

    const symbol = getSymbolFromPair(pair);

    dispatch(
      bookWsRequest({
        symbol,
        precision: PRECISION_TYPES[precisionTypeIndex]
      })
    );
  }, [precisionTypeIndex]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <Card>
      <Title type='h2'>Order Book</Title>
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
            Math.min(PRECISION_TYPES.length - 1, precisionTypeIndex + 1)
          )
        }
      >
        +
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <FlexContainer>
          <FlexBox size='m'>
            {asks.map(({ PRICE, COUNT, AMOUNT }: TBookOrder, i: number) => {
              return (
                <div key={i}>
                  {COUNT} - {PRICE} - {AMOUNT}
                </div>
              );
            })}
          </FlexBox>

          <FlexBox size='m'>
            {bids.map(({ PRICE, COUNT, AMOUNT }: TBookOrder, i: number) => {
              return (
                <div key={i}>
                  {COUNT} - {PRICE} - {AMOUNT}
                </div>
              );
            })}
          </FlexBox>
        </FlexContainer>
      )}
    </Card>
  );
};

export default Book;
