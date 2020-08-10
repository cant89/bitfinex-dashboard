import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Icon, { TIconProps } from './Icon';

const StyledIconButton = styled(Icon)`
  cursor: pointer;
`;

type TIconButtonProps = TIconProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: FunctionComponent<TIconButtonProps> = props => {
  return <StyledIconButton {...props} />;
};

export default IconButton;
