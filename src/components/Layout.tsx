import React, { useEffect } from 'react';
import Header from './Header';
import styled from 'styled-components';
import { useSnackbar } from 'notistack';
import { getAppSelector } from '../selectors/app';
import { usePrevious } from '../hooks/';
import { useSelector } from 'react-redux';

type TProps = {
  children?: object;
};

const Wrapper = styled.section`
  padding: 12px;
`;

const Layout: React.FunctionComponent<TProps> = ({ children }) => {
  const { offline } = useSelector(getAppSelector);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const prevOfflineStatus = usePrevious(offline);

  useEffect(() => {
    if (prevOfflineStatus === undefined) {
      return;
    }

    const key = enqueueSnackbar(
      offline ? 'You are offline' : 'You are back online!',
      {
        variant: offline ? 'error' : 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      }
    );

    setTimeout(() => {
      closeSnackbar(key as string);
    }, 5000);
  }, [offline]);

  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
