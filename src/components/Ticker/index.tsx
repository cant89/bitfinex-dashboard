import React, { FunctionComponent } from 'react';
import Card from '../../shared/Card';
import Title from '../../shared/Typography/Title';
import Content from './Content';
import { getCurrenciesFromPair } from '../../helpers';

type TProps = {
  pair: string;
};

const Ticker: FunctionComponent<TProps> = props => {
  const [curr1, curr2] = getCurrenciesFromPair(props.pair);

  return (
    <Card>
      <Title type='h2'>
        {curr1}/{curr2}
      </Title>
      <Content {...props} />
    </Card>
  );
};

export default Ticker;
