
import React from 'react';
import {
  App,
  Panel,
  View,
  Statusbar,
  Popup,
  Page,
  Navbar,
  NavRight,
  Link,
  Block,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  Label,
  Input,
  ListButton,
  BlockFooter
} from 'framework7-react';

import routes from '../routes';

export default function (props) {

  // Framework7 parameters here
  const f7params = {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Hello', // App name
    theme: 'auto', // Automatic theme detection
    // App routes
    routes,
  };

  return (
    <App params={f7params}>
      <View url="/" />
    </App>
  );
};