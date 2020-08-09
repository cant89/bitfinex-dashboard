import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const SIZES = {
  s: '22%',
  m: '47%',
  l: '97%'
};

const Box = styled.div<Required<TProps>>`
  width: ${({ size }) => SIZES[size]};
  padding: 24px;
  margin: 1.5%;
`;

interface TProps {
  size?: keyof typeof SIZES;
}

const FlexBox: FunctionComponent<TProps> = ({ children, size = 's' }) => {
  return <Box size={size}>{children}</Box>;
};

export default FlexBox;
