import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
enableScreens();
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
