import React from 'react';
import { Image, Keyboard, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthService } from '../services';
import { Dropdown } from 'react-native-material-dropdown';

const initialState = {
    nombre: '',
    apellido: '',
    dni: '',
    sexo: '',
    email: '',
    password: '',
    repeatPassword: '',
};

export class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    authService = new AuthService(false);

    onRegisterButtonPressed = () => {
        let user = { ...this.state };
        
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                if(user[key] == '') {
                    alert('Complete todos los campos ');
                    return;
                }
            }
        }

        if(user.password != user.repeatPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        this.authService.check(user.email, user.dni)
        .then(userExists => {
            if(userExists) {
                alert('Un usuario con este email y/o DNI ya existe');
                return;
            }

            return this.authService.register(user)
        })
        .then(user => {
            this.setState(initialState);
            this.props.navigation.navigate('Home', { user: user });
        })
        .catch(error => {
            alert(error);
            console.log(error);
        });
    };

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    onChangeSexo = (value, index, data) => {
		this.setState({sexo: value});
    }

    showSexoDrop = () => {
		let data = [
            {value: 'Masculino'},
            {value: 'Femenino'}
        ];
        
		return ( 
			<Dropdown
				label='Sexo *'
				data={data}
				containerStyle={styles.picker}
                onChangeText={this.onChangeSexo}
                value={this.state.sexo}
			/>
		)
	}

    render = () => (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* <Image style={styles.image} source={require('../../assets/images/logo_login.png')} /> */}
                <ScrollView contentContainerStyle={styles.formContainer}>
                    <TextInput
                        label='Nombre *'
                        value={this.state.nombre}
                        onChangeText={nombre => this.setState({ nombre })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Apellido *'
                        value={this.state.apellido}
                        onChangeText={apellido => this.setState({ apellido })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='DNI *'
                        value={this.state.dni}
                        onChangeText={dni => this.setState({ dni })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                        keyboardType='number-pad'
                    />
                    {this.showSexoDrop()}
                    <TextInput
                        label='Email *'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Contraseña *'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                    <TextInput
                        label='Repetir contraseña *'
                        secureTextEntry={true}
                        value={this.state.repeatPassword}
                        onChangeText={repeatPassword => this.setState({ repeatPassword })}
                        style={styles.input}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                    />
                </ScrollView>

                <ScrollView contentContainerStyle={styles.btnContainer}>
                    <Button style={styles.loginBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#3176af' onPress={this.onRegisterButtonPressed}>
                        Registrarse
                    </Button>

                    <View style={styles.changeAuth}>
                        <Text>¿Ya tenes una cuenta?</Text>
                        <Button style={styles.changeAuthBtn} mode="text" uppercase={false} contentStyle={{height: 20}} color='#3176af' compact={true} onPress={this.goToLogin} >
                            <Text>Ingresar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        padding: 30,
        paddingBottom: 0,
        flex: 1,
    },
    formContainer: {
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10,
    },
    // btnContainer: {
    //     flexGrow: 1,
    // },
    image: {
        height: 140,
        width: 101,
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
    changeAuth: {
        flexDirection: 'row'
    },
    changeAuthBtn: {
        padding: 0,
        margin: 0
    }
});
