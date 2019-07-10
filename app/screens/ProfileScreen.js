import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Keyboard } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    user = this.props.navigation.getParam('user')

    state = {
        email: this.user.email,
        name: this.user.name,
        lastName: this.user.lastName,
        phone: this.user.phone,
        password: '',
        repeatPassword: ''
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
                        value={this.state.phone}
                        onChangeText={(phone) => this.setState({ phone: phone })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <TextInput
                        label='Nueva contraseña'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password: password })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <TextInput
                        label='Confrimar nueva contraseña'
                        secureTextEntry={true}
                        value={this.state.repeatPassword}
                        onChangeText={(repeatPassword) => this.setState({ repeatPassword: repeatPassword })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <TextInput
                        label='Email'
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email: email })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <TextInput
                        label='Nombre'
                        value={this.state.name}
                        onChangeText={(name) => this.setState({ name: name })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <TextInput
                        label='Apellido'
                        value={this.state.lastName}
                        onChangeText={(lastName) => this.setState({ lastName: lastName })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        disabled={true}
                        theme={{ dark: true, colors: { primary: '#333366' } }}
                    />
                    <Button style={styles.formBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#333366' onPress={this.onUpdateProfile}>
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
