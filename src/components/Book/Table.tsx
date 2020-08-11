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

const Table: FunctionComponent<TProps> = ({ data, pair, type }) => {
  const [, curr2] = getCurrenciesFromPair(pair);

  const isBids = type === 'bids';

  const sortedRows = isBids ? getBidsArray(data) : getAsksArray(data);

  return (
    <FlexTable>
      <FlexTableHead>
        <FlexTableCell width='30%'>Count</FlexTableCell>
        <FlexTableCell width='30%'>Amount</FlexTableCell>
        <FlexTableCell width='30%'>Price</FlexTableCell>
      </FlexTableHead>
      <FlexTableBody>
        {sortedRows.map((price: string) => {
          const { PRICE, COUNT, AMOUNT } = data[price];

          return (
            <FlexTableRow key={PRICE}>
              <FlexTableCell width='30%'>
                <Icon
                  component={
                    isBids ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                  }
                  width='24px'
                  color={isBids ? themeColors.success : themeColors.alert}
                />
                {COUNT}
              </FlexTableCell>
              <FlexTableCell width='30%'>
                {formatNumber({ number: Math.abs(AMOUNT), decimals: 4 })}
              </FlexTableCell>
              <FlexTableCell width='30%'>
                {formatNumber({ number: PRICE, currency: curr2 })}
              </FlexTableCell>
            </FlexTableRow>
          );
        })}
      </FlexTableBody>
    </FlexTable>
  );
};

export default Table;
