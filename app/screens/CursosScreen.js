import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Card, Title, Modal, TextInput, Button, IconButton } from 'react-native-paper';
import { CursosService } from '../services';
import moment from "moment";
import { Dropdown } from 'react-native-material-dropdown';

const localidades = [
    'Abasto',
    'Agronomía',
    'Almagro',
    'Balvanera',
    'Barracas',
    'Barrio Norte',
    'Belgrano',
    'Boedo',
    'Caballito',
    'Chacarita',
    'Ciudad Autónoma De Buenos Aires',
    'Coghlan',
    'Colegiales',
    'Constitución',
    'Flores',
    'Floresta',
    'La Boca',
    'Liniers',
    'Mataderos',
    'Microcentro',
    'Monte Castro',
    'Montserrat',
    'Nueva Pompeya',
    'Núñez',
    'Palermo',
    'Palermo Viejo',
    'Parque Avellaneda',
    'Parque Chacabuco',
    'Parque Patricios',
    'Paternal',
    'Puerto Madero',
    'Recoleta',
    'Retiro',
    'Saavedra',
    'San Cristobal',
    'San Nicolás',
    'San Telmo',
    'Velez Sarsfield',
    'Versalles',
    'Villa Crespo',
    'Villa del Parque',
    'Villa Devoto',
    'Villa General Mitre',
    'Villa Lugano',
    'Villa Luro',
    'Villa Ortúzar',
    'Villa Pueyrredón',
    'Villa Real',
    'Villa Riachuelo',
    'Villa Santa Rita',
    'Villa Soldati',
    'Villa Urquiza' 
];

export class CursosScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {user: navigation.getParam('user')})}>
                    <IconButton
                        style={styles.filterBtn}
                        icon="search"
                        color='#fff'
                        size={30}
                        onPress={this._showFiltersModal}
                    />
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
		super(props);
    }

    state = {
        // user: this.props.navigation.getParam('user')
        cursos: [],
        visibleLoader: true,
        filtroCurso: '',
        centros: [],
        centro: '',
        localidades: localidades,
        localidad: '',
        precioDesde: '',
        precioHasta: '',
        showFiltersModal: false,
    }

    componentWillMount = async() => {
		await this.createServiceInstance();
		await this.getCursos({});
		// await this.getUsers();
    }

	createServiceInstance = async() => {
        // this.opportunityService = new OpportunityService(true);
        this.cursosService = new CursosService(true);
    }
    
    getCursos = async(filters) => {
		await this.cursosService.get(filters)
		.then(cursos => {
			this.setState({ cursos: [...cursos ] });
        })
        .catch(error => {
            console.log(error);
        }).finally(() => {
			this.setState({visibleLoader: false});
		});
	};

    _showFiltersModal = () => this.setState({ showFiltersModal: true });

    redirectToCurso = (cursoId) => {
        this.props.navigation.navigate('Curso', {cursoId: cursoId});
    };


    showList() {
        return (
            this.state.cursos.map((data, index) => {
                var fechaInicio = moment(data.fechaInicio).format("DD/MM/YYYY");
                var fechaFin = moment(data.fechaFin).format("DD/MM/YYYY");
                return (
                    <TouchableOpacity onPress={() => this.redirectToCurso(data._id)} key={data._id}>
                        <Card style={styles.card} elevation={4}>
                            <Card.Content>
                                <Title>{data.nombre}</Title>
                                <Text>{data.centro.nombre}</Text>
                                <Text>{fechaInicio} - {fechaFin}</Text>
                                <Text>${data.precio}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )
			})
		)
    }
    
    renderFilterModal = () => {
		if(this.state.showFiltersModal) {
			let data = [];
			for (let i = 0; i < this.state.clients.length; i++) {
				data.push( {"value" : this.state.clients[i].name, "id" :  this.state.clients[i]._id })
			}
			return ( 
				<View>
					<Text style={styles.title}>Filtros de búsqueda</Text>
					<Dropdown
						label='Cliente'
						data={data}
						value={this.state.chosenOpportunity.companyClient.name}
						containerStyle={styles.picker}
						onChangeText={this.onChangeCompany}
					/>
					<TextInput
						label='Nombre de la oportunidad'
						value={this.state.chosenOpportunity.name}
						style={styles.inputEdit}
						onChangeText={(newName) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, name: newName} })}
					/>
					<TextInput
						label='Descripción'
						multiline={true}
						numberOfLines={4}
						style={styles.inputEdit}
						onChangeText={(newDescription) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, description: newDescription} })}
						value={this.state.chosenOpportunity.description}/>
					<Button style={styles.mt15} mode="contained" onPress={() => this.editOpportunity(this.state.chosenOpportunity)} theme={{ dark: true, colors: { primary: '#3176af' } }}>
						Siguiente
					</Button>
					<TouchableOpacity 
						activeOpacity={0.5}
						onPress={this._hideModalEdit}
						>
						<Text style={styles.cancelButton}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			)
		}
	}

    render() {
        return (
            <View style={styles.container}>
                {this.state.visibleLoader == true ? <ActivityIndicator style={{marginTop:300}} size="large" color="#3176af" /> : null}
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    {/* <Text style={styles.helloText}>Hola</Text>
                    <Text style={styles.userText}>{this.state.user.nombre} {this.state.user.apellido}</Text> */}
                    <View contentContainerStyle={styles.rootContainer}>
                        {this.showList()}
                    </View>
                </ScrollView>
                <Modal visible={this.state.showFiltersModal} contentContainerStyle={styles.modal}>
					{this.renderFilterModal()}
				</Modal>
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
    helloText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#3176af',
    },
    userText: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#3176af',
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
		justifyContent: 'center',
		alignItems: 'center',
	},
});
