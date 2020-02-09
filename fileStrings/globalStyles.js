module.exports = `import { createGlobalStyle } from 'styled-components';

// set up personal fonts
// https://google-webfonts-helper.herokuapp.com/fonts

const mainFont = '';
const subFont = '';

export const theme = {
  display: {
    desktop: 960,
    tablet: 600,
    phone: 480,
  },
  colors: {
    link: '#ff8396',
    black: '#000000',
    gray: '#808080',
  },
  // text: {
  //   title: {
  //     type: 'h2',
  //     style: {
  //       fontSize: '1.5rem',
  //       fontFamily: mainFont,
  //     },
  //   },
  //   subtitle: {
  //     type: 'h3',
  //     style: {
  //       fontSize: '1.1rem',
  //       fontFamily: mainFont,
  //     },
  //   },
  //   body: {
  //     type: 'p',
  //     style: {
  //       fontSize: '0.9rem',
  //       fontFamily: subFont,
  //     },
  //   },
  //   subscript: {
  //     type: 'span',
  //     style: {
  //       fontSize: '0.7rem',
  //       fontFamily: subFont,
  //     },
  //   },
  // },
};

export const GlobalStyle = createGlobalStyle\`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
\`;
`;