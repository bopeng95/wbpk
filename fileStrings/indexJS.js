module.exports = `import React from 'react';
import { render } from 'react-dom';

if (module.hot) module.hot.accept();

const App = () => {
    return (
        <div>My React App</div>
    )
};

render(<App/>, document.querySelector('#root'));`;