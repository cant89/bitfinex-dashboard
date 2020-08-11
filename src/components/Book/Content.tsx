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
import DepthBars from './DepthBars';
import { themeColors } from '../../theme';

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

  const bidsData = Object.keys(bids)
    .sort((a, b) => Number(a) - Number(b))
    .map(price => ({
      name: price,
      count: bids[price].COUNT
    }));

  const asksData = Object.keys(asks)
    .sort((a, b) => Number(a) - Number(b))
    .map(price => ({
      name: price,
      count: asks[price].COUNT
    }));

  return (
    <FlexContainer>
      <FlexBox size='m'>
        <DepthBars data={bidsData} color={themeColors.success} />
      </FlexBox>
      <FlexBox size='m'>
        <DepthBars data={asksData} color={themeColors.alert} />
      </FlexBox>

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
