import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Card, Button, IconButton, Dialog, Portal, Paragraph, Provider } from 'react-native-paper';
import { CursosService } from '../services';
import moment from "moment";

export class CursoScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        curso: {},
        showDialog: false,
        visibleLoader: false,
    }

    componentWillMount = async () => {
        this.setState({ curso: this.props.navigation.getParam('curso') })
        await this.createServiceInstance();
    }

    createServiceInstance = async () => {
        this.cursosService = new CursosService(true);
    }

    _showdialog = () => {
        this.setState({ showDialog: true })
    };

    _hideDialog = () => {
        this.setState({ showDialog: false })
    }

    showHorarios(horarios) {
        return (
            horarios.map((data, index) => {
                return (
                    <Text key={data._id}>{data.dia} de {data.horarioDesde} a {data.horarioHasta}</Text>
                )
            })
        )
    }

    _confirmDialog = async() => {
        this.setState({ visibleLoader: true });
        await this.cursosService.addUserToCurso(this.state.curso._id)
		.then(curso => {
			this.props.navigation.navigate('Miscursos')
            return;
        })
        .catch(error => {
            console.log(error);
        }).finally(() =>
            this.setState({ visibleLoader: true })
        );
    };

    renderDialog = (curso) => {
        if (this.state.showDialog) {
            return (
                <Provider>
                    <Portal>
                        <Dialog
                            visible={this.state.showDialog}
                            onDismiss={this._hideDialog}>
                            <Dialog.Content>
                                <Text>Inscribirse a {curso.nombre}</Text>
                                <Text>Días y horarios:</Text>
                                {this.showHorarios(curso.diasYHorarios)}
                                <Text>${curso.precio}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button color='#3176af' onPress={this._hideDialog}>Cancelar</Button>
                                <Button color='#3176af' onPress={this._confirmDialog}>Confirmar</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>
            )
        }
    }

    render() {
        const curso = { ...this.state.curso }
        const fechaInicio = moment(curso.fechaInicio).format("DD/MM/YYYY");
        const fechaFin = moment(curso.fechaFin).format("DD/MM/YYYY");
        return (
            <View style={styles.container}>
                {this.state.visibleLoader == true ? <ActivityIndicator style={{marginTop:300}} size="large" color="#3176af" /> : null}
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.topContainer}>
                        <Image style={styles.image} source={require('../../assets/images/logo_login.png')} />
                        <View style={styles.iconTextConainer}>
                            <Text style={styles.nombre}>{curso.nombre}</Text>
                            <Text>{curso.centro.nombre}</Text>
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="location-city" color='#000' size={45}></IconButton>
                                <Text>{curso.sede.localidad} - {curso.sede.nombre}</Text>
                            </View>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="location-on" color='#000' size={45}></IconButton>
                                <Text>{curso.sede.direccion}</Text>
                            </View>
                        </View>
                        <View style={styles.topContainer}>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="date-range" color='#000' size={45}></IconButton>
                                <Text>{fechaInicio} - {fechaFin}</Text>
                            </View>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="access-time" color='#000' size={45}></IconButton>
                                {this.showHorarios(curso.diasYHorarios)}
                            </View>
                        </View>
                        <View style={styles.topContainer}>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="attach-money" color='#000' size={45}></IconButton>
                                <Text>${curso.precio}</Text>
                            </View>
                            <View style={styles.iconTextConainer}>
                                <IconButton style={styles.iconButtonStyle} icon="people" color='#000' size={45}></IconButton>
                                <Text>Vacantes: {curso.vacantes}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Card style={styles.card} elevation={2}>
                            <Card.Content>
                                <Paragraph>{curso.descripcion}</Paragraph>
                            </Card.Content>
                        </Card>
                    </View>
                    <Button contentStyle={{ height: 50 }} mode="contained" uppercase={false} color='#3176af' onPress={this._showdialog}>
                        Inscribirse
                    </Button>
                </ScrollView>
                {this.renderDialog(curso)}
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
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    bottomContainer: {
        marginBottom: 20
    },
    iconTextConainer: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 71,
        alignSelf: 'center'
    },
    nombre: {
        fontSize: 20,
        textAlign: 'center',
        color: '#3176af',
    },
    iconButtonStyle: {
        alignSelf: 'center',
        borderRadius: 30,
        height: 50,
        width: 50,
    }
});
