import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { AuthService } from '../services';
import moment from "moment";

export class AsistenciasScreen extends React.Component {

    constructor(props) {
		super(props);
    }

    state = {
        curso: {},
        user: {}
    }

    componentWillMount = async() => {
        this.setState({ curso: this.props.navigation.getParam('curso') })
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
        }).catch(error => {
            console.log(error);
        });
    }

    showAsistencias = () => {
        
        return (
            this.state.curso.asistencias.map((asistencia, index) => {
                var fecha = moment(asistencia.fechaClase).format("DD/MM/YYYY");
                console.log(asistencia);
                if(asistencia.estado == 'Sin cargar' || !asistencia.estado) {
                    return (
                        <Text key={asistencia._id} style={{ color: '#ccc', fontSize: 20, marginBottom: 10 }}>{fecha} - Sin cargar</Text>
                    )
                }

                
                // for (let i = 0; i < asistencia.length; i++) {
                //     const element = array[i];
                    
                // }
                // return (
                //     <Text key={data._id}>{data.dia} de {data.horarioDesde} a {data.horarioHasta}</Text>
                // )
            })
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainText}>Asistencia de {this.state.curso.nombre}</Text>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {this.showAsistencias()}
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
        padding: 20
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        marginBottom: 20,
    },
    mainText: {
        color: '#3176af',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    modal: {
        height: 450,
        backgroundColor:'white',
        justifyContent: 'flex-start',
    },
    innerModal: {
        flex: 1,
        padding: 15,
    },
    searchBtn: {
        marginBottom: 20,
        marginTop: 20
    },
    mainText: {
        color: '#3176af',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
});
