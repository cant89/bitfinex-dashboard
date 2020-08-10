import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { themeColors } from '../../theme';

const titles = {
  H1: styled.h1`
    color: ${themeColors.text.primary};
    font-size: 32px;
    font-weight: 300;
    margin: 0 0 32px 0;
  `,

  H2: styled.h2`
    color: ${themeColors.text.primary};
    font-size: 28px;
    font-weight: 300;
    margin: 0 0 28px 0;
  `,

  H3: styled.h3`
    color: ${themeColors.text.primary};
    font-size: 24px;
    font-weight: 300;
    margin: 0 0 24px 0;
  `,

  H4: styled.h4`
    color: ${themeColors.text.primary};
    font-size: 20px;
    font-weight: 300;
    margin: 0 0 20px 0;
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
