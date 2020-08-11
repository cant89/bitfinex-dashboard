import React, { FunctionComponent } from 'react';
import { TBookOrdersList } from '../../reducers/book';
import { formatNumber, getCurrenciesFromPair } from '../../helpers';
import {
  FlexTable,
  FlexTableHead,
  FlexTableCell,
  FlexTableBody,
  FlexTableRow
} from '../../shared/FlexTable';
import Icon from '../../shared/Icon';
import { themeColors } from '../../theme';
import ArrowDropUpIcon from '../../assets/arrow_drop_up.svg';
import ArrowDropDownIcon from '../../assets/arrow_drop_down.svg';
import { TBookOrder } from '../../actions/book';

type TProps = {
  data: TBookOrdersList;
  pair: string;
  type: 'bids' | 'asks';
};

const getBidsArray = (bids: TProps['data']) =>
  Object.keys(bids)
    .sort((a, b) => Number(b) - Number(a))
    .slice(0, 20);

const getAsksArray = (asks: TProps['data']) =>
  Object.keys(asks)
    .sort((a, b) => Number(a) - Number(b))
    .slice(0, 20);

type TBodyCells = TBookOrder & {
  curr2: string;
  isBids: boolean;
};

const bodyCells = ({ COUNT, AMOUNT, PRICE, curr2, isBids }: TBodyCells) => [
  <FlexTableCell key={isBids.toString()} width='10%' noPadding>
    <Icon
      component={isBids ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      width='24px'
      color={isBids ? themeColors.success : themeColors.alert}
    />
  </FlexTableCell>,
  <FlexTableCell key={COUNT} width='30%'>
    {COUNT}
  </FlexTableCell>,
  <FlexTableCell key={AMOUNT} width='30%'>
    {formatNumber({ number: Math.abs(AMOUNT), decimals: 4 })}
  </FlexTableCell>,
  <FlexTableCell key={PRICE} width='30%'>
    {formatNumber({ number: PRICE, currency: curr2 })}
  </FlexTableCell>
];

const headCells = [
  <FlexTableCell key='icon' width='10%' noPadding />,
  <FlexTableCell key='count' width='30%'>
    Count
  </FlexTableCell>,
  <FlexTableCell key='amount' width='30%'>
    Amount
  </FlexTableCell>,
  <FlexTableCell key='price' width='30%'>
    Price
  </FlexTableCell>
];

const Table: FunctionComponent<TProps> = ({ data, pair, type }) => {
  const [, curr2] = getCurrenciesFromPair(pair);
  const isBids = type === 'bids';
  const sortedRows = isBids ? getBidsArray(data) : getAsksArray(data);
  const sortedHeadCells = isBids ? headCells : [...headCells].reverse();

  return (
    <FlexTable>
      <FlexTableHead>{sortedHeadCells.map(cell => cell)}</FlexTableHead>
      <FlexTableBody>
        {sortedRows.map((price: string) => {
          const { PRICE } = data[price];
          const bodyCellsOpts = { ...data[price], curr2, isBids };

          const sortedBodyCells = isBids
            ? bodyCells(bodyCellsOpts)
            : [...bodyCells(bodyCellsOpts)].reverse();

          return (
            <FlexTableRow key={PRICE}>
              {sortedBodyCells.map(cell => cell)}
            </FlexTableRow>
          );
        })}
      </FlexTableBody>
    </FlexTable>
  );
};

export default Table;
