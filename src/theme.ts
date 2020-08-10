import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    background: #0c1317;
    color: #fff;
  }
`;

const themeColors = {
  primary: '#273640',
  secondary: '#6f6f6f',
  tertiary: '#16b157',
  alert: '#e88585',
  success: '#88e28b',
  text: {
    primary: '#fff',
    secondary: '#9c9c9c'
  }
};

export { themeColors };

export default GlobalStyle;
