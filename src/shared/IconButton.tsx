import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Icon, { TIconProps } from './Icon';

const Button = styled.button`
  background: none;
  border: none;
  appearance: none;
  padding: 0;
  margin: 0;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
`;

type TIconButtonProps = TIconProps & {
  buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

const IconButton: FunctionComponent<TIconButtonProps> = ({
  buttonProps,
  ...rest
}) => {
  return (
    <Button {...buttonProps}>
      <Icon {...rest} />
    </Button>
  );
};

export default IconButton;
