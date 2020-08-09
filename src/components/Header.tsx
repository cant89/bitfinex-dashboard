import React, { FunctionComponent } from 'react';
import BitfinexLogo from '../assets/bitfinex-logo.svg';
import styled from 'styled-components';
import { themeColors } from '../theme';

const StyledHeader = styled.header`
  border-bottom: 1px solid ${themeColors.secondary};
  padding: 16px 32px;
`;

const Header: FunctionComponent = () => {
  return (
    <StyledHeader>
      <BitfinexLogo />
    </StyledHeader>
  );
};

export default Header;
