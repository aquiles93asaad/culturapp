import React from 'react';
import { Image, Keyboard, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthService } from '../services';
import CheckBox from 'react-native-check-box'

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        // this.imageHeight = new Animated.Value(100);
        // this.imageWidth = new Animated.Value(117);
    }

    state = {
        email: '',
        password: '',
        rememberMe: false
    }

    authService = new AuthService(false);

    onLoginButtonPressed = () => {
        const params = { ...this.state };

        if (params.email == '' || params.password == '') {
            alert('Complete los campos');
            return;
        }

        this.authService.login(params)
            .then(user => {
                this.state.email = '';
                this.state.password = '';
                this.props.navigation.navigate('Home', { user: user });
            })
            .catch(error => {
                alert(error);
                console.log(error);
            });
    };

    onForgotPassword = () => {
        alert('hola');
    };

    render = () => (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':null} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container} onStartShouldSetResponder={() => true} onResponderRelease={() => Keyboard.dismiss()}>
                <Image style={styles.image} source={require('../../assets/images/logo_login.png')} />
                <TextInput
                    label='Email'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    padding='none'
                    dense={true}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Contraseña'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    style={styles.input}
                    padding='none'
                    dense={true}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <CheckBox
                    style={styles.checkBox}
                    onClick={() => { this.setState({ rememberMe: !this.state.rememberMe }) }}
                    isChecked={this.state.rememberMe}
                    rightText={"Recordame"}
                />
                <Button style={styles.loginBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#333366' onPress={this.onLoginButtonPressed}>
                    Ingresar
                </Button>

                <Button style={styles.forgotBtn} mode="text" uppercase={false}  color='#ccc' compact={true} onPress={this.onForgotPassword} >
                    ¿Olvidaste tu constraseña?
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingBottom: 50,
        paddingTop: 50,
        justifyContent: 'space-evenly',
        flex: 1,
    },
    image: {
        height: 140,
        width: 164,
        alignSelf: 'center'
    },
    input: {
        marginBottom: 20,
    },
    checkBox: {
        marginBottom: 20,
    },
    loginBtn: {
        marginBottom: 20,
        borderRadius: 30,
        textTransform: 'capitalize'
    },
    forgotBtn: {

    }
});
