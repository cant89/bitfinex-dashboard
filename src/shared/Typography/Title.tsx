import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { themeColors } from '../../theme';

const titles = {
  H1: styled.h1`
    color: ${themeColors.text.primary};
    font-size: 32px;
    font-weight: 300;
  `,

  H2: styled.h1`
    color: ${themeColors.text.primary};
    font-size: 28px;
    font-weight: 300;
  `,

  H3: styled.h1`
    color: ${themeColors.text.primary};
    font-size: 24px;
    font-weight: 300;
  `,

  H4: styled.h1`
    color: ${themeColors.text.primary};
    font-size: 20px;
    font-weight: 300;
  `
};

type TProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4';
};

const Title: FunctionComponent<TProps> = ({ children, type }) => {
  const T = titles[type.toUpperCase()];
  return <T>{children}</T>;
};

export default Title;
