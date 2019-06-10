import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SettingsScreen, SplashScreen, LoginScreen, ReportScreen, OpportunityListScreen, SaleOpportunityScreen , SaleOpportunityScreen2, SaleOpportunityScreen3 } from '../screens/index';
// import HomeScreen from '../screens/HomeScreen';

const AuthStack = createStackNavigator({ Login: { screen: LoginScreen, navigationOptions: { header: null } } });
const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        SaleOpportunity: SaleOpportunityScreen,
        Settings: SettingsScreen,
        Reports: ReportScreen,
        OpportunityList: OpportunityListScreen,
        SaleOpportunity2: SaleOpportunityScreen2,
        SaleOpportunity3: SaleOpportunityScreen3,
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#333366',
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