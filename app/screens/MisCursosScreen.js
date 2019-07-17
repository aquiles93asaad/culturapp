import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { CursosService } from '../services';
import moment from "moment";

export class MisCursosScreen extends React.Component {

    constructor(props) {
		super(props);
    }

    state = {
        cursos: [],
        visibleLoader: true,
    }

    componentWillMount = async() => {
		await this.createServiceInstance();
        await this.getCursos({});
    }

    signOut() {
        this.authService.logout()
        .then(logoutSuccess => this.props.navigation.navigate('Login'))
        .catch(error => { console.log(error) })
    }

	createServiceInstance = async() => {
        this.cursosService = new CursosService(true);
    }
    
    getCursos = async(filters) => {
		await this.cursosService.get(filters, true)
		.then(cursos => {
			this.setState({ cursos: [...cursos ] });
        })
        .catch(error => {
            console.log(error);
        }).finally(() => {
			this.setState({visibleLoader: false});
		});
	};

    redirectToCurso = (cursoData) => {
        this.props.navigation.navigate('Micurso', {curso: cursoData});
    };

    showHorarios(horarios) {
        return (
            horarios.map((data, index) => {
                return (
                    <Text key={data._id}>{data.dia} de {data.horarioDesde} a {data.horarioHasta}</Text>
                )
            })
        )
    }

    showList() {
        return (
            this.state.cursos.map((data, index) => {
                var fechaInicio = moment(data.fechaInicio).format("DD/MM/YYYY");
                var fechaFin = moment(data.fechaFin).format("DD/MM/YYYY");
                return (
                    <TouchableOpacity onPress={() => this.redirectToCurso(data)} key={data._id}>
                        <Card style={styles.card} elevation={4}>
                            <Card.Content>
                                <Title>{data.nombre}</Title>
                                <Text>{data.centro.nombre}</Text>
                                <Text>{fechaInicio} - {fechaFin}</Text>
                                {this.showHorarios(data.diasYHorarios)}
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )
			})
		)
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.state.visibleLoader == true ? <ActivityIndicator style={{marginTop:300}} size="large" color="#3176af" /> : null}
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View contentContainerStyle={styles.rootContainer}>
                        {this.showList()}
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
        paddingBottom: 20
    },
    rootContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        marginBottom: 20,
    },
    filterBtn: {
        backgroundColor: '#3176af',
        borderRadius: 30,
        height: 50,
        width: 50,
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
    cancelButton: {
        
    }
});
