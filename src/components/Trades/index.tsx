import React, { FunctionComponent } from 'react';
import Card from '../../shared/Card';
import Title from '../../shared/Typography/Title';
import Content from './Content';

type TProps = {
  pair: string;
};

const Trades: FunctionComponent<TProps> = props => (
  <Card>
    <Title type='h2'>Trades</Title>
    <Content {...props} />
  </Card>
);

export default Trades;
