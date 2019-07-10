import React from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';

export class HomeScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {user: navigation.getParam('user')})}>
                    <Image style={{alignSelf: 'center', width:30, height:30 , resizeMode:'contain', marginLeft: 10}} source={require('../../assets/images/profile_icon.png')}/>
                </TouchableOpacity>
            ),
        };
    };

    state = {
        user: this.props.navigation.getParam('user')
    }

    redirectSaleOpportunity = () => {
        this.props.navigation.navigate('SaleOpportunity');
    };

    redirectReports = () => {
        this.props.navigation.navigate('Reports');
    };

    redirectOpportunity = () => {
        this.props.navigation.navigate('OpportunityList', {user: this.state.user});
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.helloText}>Hola</Text>
                    <Text style={styles.userText}>{this.state.user.name}</Text>
                    <View
                        contentContainerStyle={styles.rootContainer}>
                        <TouchableOpacity onPress={() => this.redirectSaleOpportunity()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Title style={styles.cardTitle} title="Generar oportunidad" left={() => <Image style={{ width: 48, height: 48 }} source={require('../../assets/images/sale-opportunity-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectOpportunity()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Title style={styles.cardTitle} title="Seguimiento de oportunidad" left={() => <Image style={{ width: 48, height: 48 }} source={require('../../assets/images/opportunities-list-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectReports()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Title style={styles.cardTitle} title="Reportes" left={() => <Image style={{ width: 48, height: 48 }} source={require('../../assets/images/reports-blue.png')} />} />
                            </Card>
                        </TouchableOpacity>
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
    contentContainer: {
        paddingTop: 20,
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        marginBottom: 20,
    },
    helloText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333366',
    },
    userText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333366',
    },
    cardTitle: {
        height: 150,
    },
    mt15: {
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
});
