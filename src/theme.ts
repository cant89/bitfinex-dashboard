import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: #0c1317;
    color: #fff;
  }
`;

const themeColors = {
  primary: '#273640',
  secondary: '#6f6f6f',
  text: {
    primary: '#fff'
  }
};

export { themeColors };

export default GlobalStyle;
