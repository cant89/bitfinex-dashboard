import React, { FunctionComponent } from 'react';
import Ticker from '../components/Ticker';
import Trades from '../components/Trades';
import Book from '../components/Book';
import FlexBox from '../shared/FlexBox';
import FlexContainer from '../shared/FlexContainer';

type TProps = {};

const Home: FunctionComponent<TProps> = () => {
  return (
    <>
      <FlexContainer>
        <FlexBox>
          <Ticker pair='BTCUSD' />
        </FlexBox>
        <FlexBox>
          <Trades pair='BTCUSD' />
        </FlexBox>
        <FlexBox size='m'>
          <Book pair='BTCUSD' />
        </FlexBox>
      </FlexContainer>
    </>
  );
};

export default Home;
