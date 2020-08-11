import React, { useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookSelector } from '../../selectors/book';
import { bookWsRequest, bookWsClose } from '../../actions/book';
import Loader from '../../shared/Loader';
import { getSymbolFromPair } from '../../helpers';
import FlexBox from '../../shared/FlexBox';
import FlexContainer from '../../shared/FlexContainer';
import { PRECISION_TYPES } from '../../constants/book';
import BookTable from './Table';

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

  return (
    <FlexContainer>
      <FlexBox size='m'>
        <BookTable data={bids} type='bids' pair={pair} />
      </FlexBox>
      <FlexBox size='m'>
        <BookTable data={asks} type='asks' pair={pair} />
      </FlexBox>
    </FlexContainer>
  );
};

export default BookContent;
