import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, SettingsScreen, ProfileScreen,  SplashScreen, LoginScreen, ReportScreen, OpportunityListScreen, SaleOpportunityScreen , SaleOpportunityScreen2, SaleOpportunityScreen3 } from '../screens/index';
import { AuthService } from '../services';

const authService = new AuthService(false);

const AppStack = createStackNavigator(
    {
        Splash: {screen: SplashScreen, navigationOptions: { header: null } } ,
        Login: {screen: LoginScreen, navigationOptions: { header: null } },
        Home: HomeScreen,
        Profile: ProfileScreen,
        SaleOpportunity: SaleOpportunityScreen,
        Settings: SettingsScreen,
        Reports: ReportScreen,
        OpportunityList: OpportunityListScreen,
        SaleOpportunity2: SaleOpportunityScreen2,
        SaleOpportunity3: SaleOpportunityScreen3,
    },
    {
        initialRouteName: 'Splash',
        /* The header config from HomeScreen is now here */
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{width: 220, height: 35, marginBottom: 10, resizeMode:'contain'}} source={require('../../assets/images/logo_home.png')}/>
                </TouchableOpacity>
            ),
            // headerLeft:(
            //     <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            //         <Image style={{alignSelf: 'center', width:30, height:30 , resizeMode:'contain', marginLeft: 10}} source={require('../../assets/images/profile_icon.png')}/>
            //     </TouchableOpacity>
            // ),
            headerRight:(
                <TouchableOpacity onPress={() => {
                    authService.logout().then(logoutSuccess => navigation.navigate('Login')).catch(error => { console.log(error) })
                }}>
                    <Image style={{alignSelf: 'center',
                    height: 30,
                    width: 30,
                    resizeMode:'contain',
                    marginRight: 10}} source={require('../../assets/images/logout_icon.png')}/>
                </TouchableOpacity>
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

export default createAppContainer(AppStack);