import React from 'react';
import ReactDOM from 'react-dom';

import {Header} from './components/Header';
import {Form} from './components/Form';

// Required by material-ui
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(
  <div>
    <Header />
    <Form />
  </div>,
  document.getElementById('app')
);

