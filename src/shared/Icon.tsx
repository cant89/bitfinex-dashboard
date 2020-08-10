import React from 'react';
import styled from 'styled-components';

const Icon = styled(({ component, color, ...props }) =>
  React.cloneElement(component, props)
)`
  margin-bottom: -6px;
  fill: ${({ color = '#fff ' }) => color};
  width: ${({ width }) => width};
`;

export default Icon;
