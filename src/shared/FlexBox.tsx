import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const DEFAULT_MARGIN = 12;

const SIZES = {
  s: `
    width: calc(25% - 24px);

    @media (max-width: 1200px) {
      width: calc(50% - ${DEFAULT_MARGIN * 2}px);
    }

    @media (max-width: 768px) {
      width: calc(100% - ${DEFAULT_MARGIN * 2}px);
    }
  `,
  m: `
    width: calc(50% - ${DEFAULT_MARGIN * 2}px);

    @media (max-width: 1200px) {
      width: calc(100% - ${DEFAULT_MARGIN * 2}px);
    }

    @media (max-width: 768px) {
      width: calc(100% - ${DEFAULT_MARGIN * 2}px);
    }
  `,
  l: `
    width: calc(100% - ${DEFAULT_MARGIN * 2}px);
  `
};

const Box = styled.div<Required<TProps>>(({ size }) => {
  return `
    ${SIZES[size]}
    margin: ${DEFAULT_MARGIN}px;
  `;
});

interface TProps {
  size?: keyof typeof SIZES;
}

const FlexBox: FunctionComponent<TProps> = ({ children, size = 's' }) => {
  return <Box size={size}>{children}</Box>;
};

export default FlexBox;
