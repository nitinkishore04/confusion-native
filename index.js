import { registerRootComponent } from 'expo';

import App from './App';
import { YellowBox } from 'react-native';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
YellowBox.ignoreWarnings([
    'componentWillReceiveProps has been renamed',
    'DrawerLayoutAndroid drawerPosition',
    'VirtualizedLists should never be nested',
    'componentWillUpdate has been renamed',
    'componentWillMount has been renamed'
])
registerRootComponent(App);
