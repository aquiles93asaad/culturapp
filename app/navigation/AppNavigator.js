import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, LinksScreen, SettingsScreen, SplashScreen, LoginScreen } from '../screens/index';
// import HomeScreen from '../screens/HomeScreen';

const AuthStack = createStackNavigator({ Login: { screen: LoginScreen, navigationOptions: { header: null } } });
const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        Links: LinksScreen,
        Settings: SettingsScreen
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
);


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