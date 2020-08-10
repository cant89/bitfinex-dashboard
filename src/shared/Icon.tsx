import React, { ReactElement } from 'react';
import styled from 'styled-components';

export type TIconProps = {
  component: ReactElement;
  color?: string;
  width: string;
};

const Icon = styled(({ component, color, ...props }: TIconProps) =>
  React.cloneElement(component, props)
)`
  margin-bottom: -6px;
  fill: ${({ color = '#fff ' }) => color};
  width: ${({ width }) => width};
`;

export default Icon;
