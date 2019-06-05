import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, LinksScreen, SettingsScreen, SplashScreen, LoginScreen } from '../screens/index';
// import HomeScreen from '../screens/HomeScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, Links: LinksScreen, Settings: SettingsScreen });
const AuthStack = createStackNavigator({ Login: { screen: LoginScreen, navigationOptions: { header: null } }});

export default createAppContainer(
    createSwitchNavigator(
        {
            Splash: SplashScreen,
            App: AppStack,
            Auth: AuthStack,
        },
        {
            initialRouteName: 'Splash',
        }
    )
);