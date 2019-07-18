import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthService } from '../services';

export class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        user: {},
        password: '',
        repeatPassword: '',
        telefono: ''
    }

    componentWillMount = async() => {
        await this.createServiceInstance();
        await this.getUser();
    }

    createServiceInstance = async() => {
        this.authService = new AuthService(true);
    }

    getUser = async() => {
        await this.authService.me()
        .then(user => {
            this.setState({ user: user })
            this.setState({ telefono: user.telefono })
        }).catch(error => {
            console.log(error);
        });
    }

    onUpdateProfile = () => {
        const params = { ...this.state };

        if(params.phone != this.user.phone || params.password != '' || params.repeatPassword != '') {
            if(params.password != params.repeatPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            alert('actualizar');
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding':null} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} onStartShouldSetResponder={() => true} onResponderRelease={() => Keyboard.dismiss()}>
                    <TextInput
                        label='Teléfono/Celular'
                        value={this.state.telefono}
                        onChangeText={(phone) => this.setState({ telefono: phone })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Nueva contraseña'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Confrimar nueva contraseña'
                        secureTextEntry={true}
                        value={this.state.repeatPassword}
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword: repeatPassword })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Email'
                        value={this.state.user.email}
                        onChangeText={(email) => this.setState({ email: email })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Nombre'
                        value={this.state.user.nombre}
                        onChangeText={(name) => this.setState({ name: name })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Apellido'
                        value={this.state.user.apellido}
                        onChangeText={(lastName) => this.setState({ lastName: lastName })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <Button style={styles.formBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#3176af' onPress={this.onUpdateProfile}>
                        Actualizar
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingTop: 15,
        justifyContent: 'space-between',
        flex: 1,
    },
    input: {
        marginBottom: 10
    },
    formBtn:{
        borderRadius: 30,
        textTransform: 'capitalize'
    },
});
