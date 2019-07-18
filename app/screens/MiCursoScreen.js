import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Title } from 'react-native-paper';

export class MiCursoScreen extends React.Component {

    constructor(props) {
		super(props);
    }

    state = {
        curso: {},
    }

    componentWillMount = async () => {
        this.setState({ curso: this.props.navigation.getParam('curso') })
    }

    // redirectToNovedades = () => {
    //     this.props.navigation.navigate('Novedades', {curso: this.state.curso});
    // };

    redirectToAsistencia = () => {
        this.props.navigation.navigate('Asistencias', {curso: this.state.curso});
    };

    // redirectToCronograma = () => {
    //     this.props.navigation.navigate('Asistencia', {curso: this.state.curso});
    // };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View contentContainerStyle={styles.rootContainer}>
                        <Text style={styles.mainText}>{this.state.curso.nombre}</Text>
                        <TouchableOpacity onPress={() => this.redirectToAsistencia()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Content>
                                    <Title>Asistencia</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectToNovedades()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Content>
                                    <Title>Novedades</Title>
                                    <Text>Próximamente</Text>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.redirectToCronograma()}>
                            <Card style={styles.card} elevation={4}>
                                <Card.Content>
                                    <Title>Cronograma</Title>
                                    <Text>Próximamente</Text>
                                </Card.Content>
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
        paddingBottom: 20
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
    cancelButton: {
        
    }
});
