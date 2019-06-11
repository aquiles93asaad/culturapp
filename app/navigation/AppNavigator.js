import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
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
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{width: 250, height: 40, marginBottom: 10, resizeMode:'contain'}} source={require('../../assets/images/logohome.png')}/>
                </TouchableOpacity>
            ),
            headerLeft:(
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{alignSelf: 'center', width:30, height:30 , resizeMode:'contain', marginLeft: 10}} source={require('../../assets/images/perfil.png')}/>
                </TouchableOpacity>
            ),
            headerRight:(
                <Image style={{alignSelf: 'center',
                height: 30,
                width: 30,
                resizeMode:'contain',
                marginRight: 10}} source={require('../../assets/images/salir.png')}/>
            ),
            headerStyle: {
                backgroundColor: '#333366',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        })
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