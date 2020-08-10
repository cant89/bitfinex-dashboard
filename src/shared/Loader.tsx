import React, { FunctionComponent } from 'react';
import Spinner from 'react-spinner-material';
import { themeColors } from '../theme';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: middle;
`;

const Loader: FunctionComponent = () => {
  return (
    <Div>
      <Spinner
        radius={40}
        color={themeColors.tertiary}
        stroke={5}
        visible={true}
      />
    </Div>
  );
};

export default Loader;
