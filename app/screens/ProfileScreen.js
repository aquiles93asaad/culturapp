import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export class ProfileScreen extends React.Component {

    state = {
        user: this.props.navigation.getParam('user'),
        password: '',
        repeatPassword: ''
    }

    render() {
        return (
            <View style={styles.content} onStartShouldSetResponder={() => true} onResponderRelease={() => Keyboard.dismiss()}>
                <TextInput
                    label='Email'
                    value={this.state.user.email}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Nombre'
                    value={this.state.user.name}
                    onChangeText={password => this.setState({ password })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Apellido'
                    value={this.state.user.lastName}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Teléfono/Celular'
                    value={this.state.user.phone}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Nueva contraseña'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <TextInput
                    label='Confrimar nueva contraseña'
                    secureTextEntry={true}
                    value={this.state.repeatPassword}
                    onChangeText={email => this.setState({ email })}
                    style={styles.input}
                    theme={{ dark: true, colors: { primary: '#333366' } }}
                />
                <Button style={styles.mt15} mode="contained" onPress={this.onLoginButtonPressed} theme={{ dark: true, colors: { primary: '#333366' } }}>
                    Actualizar
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    },
    content: {
        justifyContent: 'space-between',
        flex: 1,
        padding: 30
    },
    mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
});
