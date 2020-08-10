import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { PRECISION_TYPES } from '../../constants/book';
import Card from '../../shared/Card';
import Title from '../../shared/Typography/Title';
import Content from './Content';
import IconButton from '../../shared/IconButton';
import AddIcon from '../../assets/add_circle_outline.svg';
import RemoveIcon from '../../assets/remove_circle_outline.svg';
import { themeColors } from '../../theme';

type TProps = {
  pair: string;
};

const PrecisionSelector = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  display: flex;
`;

const PrecisionTitle = styled.span`
  color: ${themeColors.text.secondary};
  align-self: center;
`;

const ButtonWrapper = styled.div`
  margin-left: 8px;
`;

const Book: FunctionComponent<TProps> = props => {
  const [precisionTypeIndex, setPrecisionTypeIndex] = useState(0);

  return (
    <Card>
      <Title type='h2'>Order Book</Title>
      <PrecisionSelector>
        <PrecisionTitle>Precision</PrecisionTitle>
        <ButtonWrapper>
          <IconButton
            component={<RemoveIcon />}
            width='25px'
            buttonProps={{
              disabled: precisionTypeIndex === 0,
              onClick: () =>
                setPrecisionTypeIndex(Math.max(0, precisionTypeIndex - 1))
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <IconButton
            component={<AddIcon />}
            width='25px'
            disabled={precisionTypeIndex === PRECISION_TYPES.length - 1}
            onClick={() =>
              setPrecisionTypeIndex(
                Math.min(PRECISION_TYPES.length - 1, precisionTypeIndex + 1)
              )
            }
          />
        </ButtonWrapper>
      </PrecisionSelector>

      <Content {...props} precision={PRECISION_TYPES[precisionTypeIndex]} />
    </Card>
  );
};

export default Book;
