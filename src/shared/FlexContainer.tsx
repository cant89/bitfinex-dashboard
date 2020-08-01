import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
`;

const FlexContainer: FunctionComponent = ({ children }) => {
  return <Box>{children}</Box>;
};

export default FlexContainer;
