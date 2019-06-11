import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AuthService } from '../services';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    authService = new AuthService(false);

    onLogoutButtonPressed = () => {
        this.authService.logout()
        .then(user => {
            this.props.navigation.navigate('Auth');
        })
        .catch(error => {
            console.log(error);
        });
    };

    redirectSaleOpportunity = () => {
        this.props.navigation.navigate('SaleOpportunity');
    };

    redirectReports = () => {
        this.props.navigation.navigate('Reports');
    };

    redirectOpportunity = () => {
        this.props.navigation.navigate('OpportunityList');
    };

    render() {
        return (     
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.paragraph}>Bienvenido user</Text>
                    <View
                        contentContainerStyle={styles.rootContainer}>
                        <TouchableOpacity onPress={() => this.redirectSaleOpportunity()}>
                            <Card style={styles.card} >
                                <Card.Title style={styles.cardTitle} title="Generar oportunidad" left={() => <Image style={{width:48, height:48}} source={require('../../assets/images/sale-opportunity-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectOpportunity()}>
                            <Card style={styles.card}>
                                <Card.Title style={styles.cardTitle} title="Seguimiento de oportunidad" left={() => <Image style={{width:48, height:48}} source={require('../../assets/images/opportunities-list-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectReports()}>
                            <Card style={styles.card}>
                                <Card.Title style={styles.cardTitle} title="Reportes" left={() => <Image style={{width:48, height:48}} source={require('../../assets/images/reports-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
                        <Button style={styles.mt15} mode="contained" onPress={this.onLogoutButtonPressed} theme={{ dark: true, colors: { primary: '#333366' } }}>
                            Logout
                        </Button>
                    </View>
                </ScrollView>
            </View>                
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    root: {
        // backgroundColor: theme.colors.screen.scroll,
        // padding: paddingValue,
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card:{
        marginBottom: 20,
    },
    paragraph: {
        marginBottom: 10,
		fontSize: 20,
		textAlign: 'center',
		color: '#333366',
		fontWeight: 'bold',
    },
    cardTitle:{
        height: 150,
    },
    mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
});
