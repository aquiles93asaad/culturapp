import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { CursosScreen, ProfileScreen, SplashScreen, LoginScreen, RegisterScreen, OpportunityListScreen, SaleOpportunityScreen, SaleOpportunityScreen2, SaleOpportunityScreen3, NewClientScreen } from '../screens/index';
import { AuthService } from '../services';

const authService = new AuthService(false);

class NavigationDrawerStructure extends React.Component {
    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('../../assets/images/drawer.png')}
                        style={{ width: 25, height: 25, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const AuthStack = createStackNavigator({
    Login: { screen: LoginScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } },
    // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
}, {
    headerMode: 'none',
});

const carteleraStack = createStackNavigator(
    {
        Cursos: {
            screen: CursosScreen,
        },
        Curso: {
            screen: SaleOpportunityScreen2,
        }
    },
    {
        initialRouteName: 'Cursos',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 220, height: 35, marginBottom: 10, resizeMode: 'contain' }} source={require('../../assets/images/logo_home.png')} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={() => {
                    authService.logout().then(logoutSuccess => navigation.navigate('Login')).catch(error => { console.log(error) })
                }}>
                    <Image style={{
                        alignSelf: 'center',
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                        marginRight: 10
                    }} source={require('../../assets/images/logout_icon.png')} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3176af',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        })
    }
);

const cursosInscriptosStack = createStackNavigator(
    {
        Miscursos: {
            screen: SaleOpportunityScreen,
        },
        Micurso: {
            screen: SaleOpportunityScreen2,
        }
    },
    {
        initialRouteName: 'Miscursos',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 220, height: 35, marginBottom: 10, resizeMode: 'contain' }} source={require('../../assets/images/logo_home.png')} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={() => {
                    authService.logout().then(logoutSuccess => navigation.navigate('Login')).catch(error => { console.log(error) })
                }}>
                    <Image style={{
                        alignSelf: 'center',
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                        marginRight: 10
                    }} source={require('../../assets/images/logout_icon.png')} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3176af',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        })
    }
);

const miPerfilStack = createStackNavigator(
    {
        Perfil: {
            screen: ProfileScreen,
        }
    },
    {
        initialRouteName: 'Perfil',
        defaultNavigationOptions: ({ navigation }) => ({
            headerTitle: (
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image style={{ width: 220, height: 35, marginBottom: 10, resizeMode: 'contain' }} source={require('../../assets/images/logo_home.png')} />
                </TouchableOpacity>
            ),
            headerRight: (
                <TouchableOpacity onPress={() => {
                    authService.logout().then(logoutSuccess => navigation.navigate('Login')).catch(error => { console.log(error) })
                }}>
                    <Image style={{
                        alignSelf: 'center',
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                        marginRight: 10
                    }} source={require('../../assets/images/logout_icon.png')} />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: '#3176af',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        })
    }
);

const Drawer = createDrawerNavigator(
    {
        Cartelera: {
            screen: carteleraStack,
            navigationOptions: {
                drawerLabel: 'Cartelera',
            },
        },
        Mycursos: {
            screen: cursosInscriptosStack,
            navigationOptions: {
                drawerLabel: 'Mis cursos',
            },
        },
        Profile: {
            screen: miPerfilStack,
            navigationOptions: {
                drawerLabel: 'Mi perfil',
            },
        },
    }, {
        initialRouteName: 'Cartelera',
    }
);

const DrawerNavigatorExample = createStackNavigator({
    Drawer: { screen: Drawer,  navigationOptions: { header: null }},
    Auth: { screen: AuthStack, navigationOptions: { header: null } },
    Splash: { screen: SplashScreen, navigationOptions: { header: null }}
}, { 
    initialRouteName: 'Splash',
});

export default createAppContainer(DrawerNavigatorExample);