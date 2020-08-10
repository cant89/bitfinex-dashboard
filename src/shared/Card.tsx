import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { themeColors } from '../theme';

const Section = styled.section`
  position: relative;
  border: 1px solid ${themeColors.secondary};
  padding: 24px;
  border-radius: 8px;
`;

const Card: FunctionComponent = ({ children }) => {
  return <Section>{children}</Section>;
};

export default Card;
