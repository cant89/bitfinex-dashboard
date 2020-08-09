import React from 'react';
import Header from './Header';
import styled from 'styled-components';

type TProps = {
  children?: object;
};

const Wrapper = styled.section`
  padding: 12px;
`;

const Layout: React.FunctionComponent<TProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <Wrapper>{children}</Wrapper>
    </div>
  );
};

export default Layout;
