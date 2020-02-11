const indexHTML = `<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
  <script src="build/bundle.js" type="text/javascript"></script>
</body>
</html>
`;

const indexJS = `import React from 'react';
import ReactDom from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'sanitize.css';

import App from 'containers/App';

import { GlobalStyle, theme } from './global-styles';

const render = Component =>
  ReactDom.render(
    <ThemeProvider theme={theme}>
      <Component />
      <GlobalStyle />
    </ThemeProvider>,
    document.querySelector('#root'),
  );

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(App);
  });
}
`;

const appJS = `import React from 'react';

const App = () => {
	return <div>My React App</div>;
}

export default App;
`;

module.exports = {
  indexHTML,
  indexJS,
  appJS,
};
