import styled from 'styled-components';
import { themeColors } from '../../theme';

const FlexTable = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FlexTableHead = styled.div`
  display: flex;
  width: 100%;
  color: ${themeColors.text.secondary};
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${themeColors.text.secondary};
`;

const FlexTableBody = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const FlexTableRow = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #4c4c4c;
`;

type TFlexTableCell = {
  width: string;
  noPadding?: boolean;
};

const FlexTableCell = styled.div<TFlexTableCell>`
  display: flex;
  padding: ${({ noPadding }) => (noPadding ? '0' : '0 16px')};
  width: ${({ width }) => width};
`;

export { FlexTable, FlexTableHead, FlexTableBody, FlexTableRow, FlexTableCell };
