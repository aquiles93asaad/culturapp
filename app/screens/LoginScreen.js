import React from 'react';
import { View, Image, Keyboard, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { scaleVertical } from '../utils/scale';
import { AuthService } from '../services';

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        email: '',
        password: ''
    }

    authService = new AuthService(false);

    onLoginButtonPressed = () => {
        const params = { ...this.state };

        this.authService.login(params)
            .then(user => {
                console.log(user);
                this.props.navigation.navigate('App');
            })
            .catch(error => {
                console.log(error);
            });
    };

    render = () => (
        <View style={styles.screen} onStartShouldSetResponder={() => true} onResponderRelease={() => Keyboard.dismiss()} nativeID="loginContainer">
            <View style={styles.header} nativeID="loginHeader">
                <Image resizeMode="contain" style={styles.image} source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.content}>
                <TextInput
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Contraseña'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <Button
                    style={styles.save}
                    text='LOGIN'
                    onPress={this.onLoginButtonPressed}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        padding: 50
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        height: undefined,
        width: undefined
    },
    input: {
        marginBottom: 10
    },
    content: {
        justifyContent: 'space-between',
        flex: 1,
    },
    save: {
        marginVertical: 20,
    },
});
