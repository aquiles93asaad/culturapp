import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { Card, Title, Modal, TextInput, Button, IconButton } from 'react-native-paper';
import { CursosService, AuthService } from '../services';
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

    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <React.Fragment>
                <TouchableOpacity onPress={navigation.getParam('signOut')}>
                    <Image style={{
                        // alignSelf: 'center',
                        height: 25,
                        width: 25,
                        resizeMode: 'contain',
                        marginRight: 5
                    }} source={require('../../assets/images/logout_icon.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigation.getParam('showFiltersModal')}>
                    <IconButton
                        style={styles.filterBtn}
                        icon="search"
                        color='#fff'
                        size={30}
                    />
                </TouchableOpacity>
            </React.Fragment>
        )
    });

    constructor(props) {
		super(props);
    }

    state = {
        cursos: [],
        visibleLoader: true,
        filtroCurso: '',
        centros: [],
        centro: '',
        centroId: '',
        localidades: localidades,
        localidad: '',
        precioDesde: '',
        precioHasta: '',
        showFiltersModal: false,
        isFocused: false,
    }

    componentDidMount = async() => {
        this.props.navigation.setParams({ 
            showFiltersModal: this._showFiltersModal.bind(this) 
        });
        this.props.navigation.setParams({ 
            signOut: this.signOut.bind(this) 
        });
        this.subs = [
            this.props.navigation.addListener("didFocus", async() => {
                this.setState({ isFocused: false })
                await this.getCursos({}, false);
                console.log('se ejecutó didFocus');
                this.setState({ isFocused: true })
            }),
            // this.props.navigation.addListener("willFocus", async() => {
            //     await this.getCursos({}, false);
            //     console.log('se ejecutó willFocus');
            //     this.setState({ isFocused: true })
            // }),
            this.props.navigation.addListener("willBlur", () => {
                this.setState({ isFocused: false })
            })
        ];
    }

    componentWillMount = async() => {
        await this.createServiceInstance();
        // await this.getCursos({}, false);
        this.props.navigation.setParams({
            showFiltersModal: this._showFiltersModal.bind(this) 
        });
        this.props.navigation.setParams({ 
            signOut: this.signOut.bind(this) 
        });
		// await this.getUsers();
    }

    // componentWillUnmount() {
    //     this.subs.forEach(sub => sub.remove());
    // }

    signOut() {
        this.authService.logout()
        .then(logoutSuccess => this.props.navigation.navigate('Login'))
        .catch(error => { console.log(error) })
    }

	createServiceInstance = async() => {
        this.authService = new AuthService(true);
        this.cursosService = new CursosService(true);
    }
    
    getCursos = async(filters) => {
		await this.cursosService.get(filters, false)
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
        this.props.navigation.navigate('Curso', {curso: cursoData});
    };

    _showFiltersModal() {
        this.setState({ showFiltersModal: true })
    };
    
    _hideFiltersModal = () => {
        this.setState({ showFiltersModal: false })
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
                                <Text>${data.precio}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )
			})
		)
    }

    onChangeLocalidad = (value, index, data) => {
		this.setState({ localidad: value });
    }

    onChangeCentro = (value, index, data) => {
		if (this.state.centro._id != this.state.centros[index]._id){
            this.setState({ centro: value.nombre });
            this.setState({ centroId: value._id });
		}
    }

    filter = async() => {
        let filters = {};
        if(this.state.centro != '') {
            filters['$text'] = { $search: this.state.centro}
        }

        if(this.state.localidad != '') {
            filters['sede.localidad'] = this.state.localidad;
        }

        if(this.state.precioDesde != '') {
            if(typeof filters['precio'] ==='undefined') {
                filters['precio'] = { $gte: '' };
            }
            filters['precio']['$gte'] = this.state.precioDesde;
        }

        if(this.state.precioHasta != '') {
            if(typeof filters['precio'] ==='undefined') {
                filters['precio'] = { $lte: '' };
            }
            filters['precio']['$lte'] = this.state.precioHasta;
        }

        this.setState({visibleLoader: true});
        await this.getCursos(filters);
        this._hideFiltersModal();
    }
    
    renderFilterModal = () => {
		if(this.state.showFiltersModal) {
			let localidadesData = [];
			for (let i = 0; i < this.state.localidades.length; i++) {
				localidadesData.push({"value": this.state.localidades[i] })
            }
            
			return ( 
				<View style={styles.innerModal}>
					<Text style={styles.title}>Filtros de búsqueda</Text>
                    <TextInput
						label='Nombre de curso'
						value={this.state.filtroCurso}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
						onChangeText={(curso) => this.setState({ filtroCurso: curso })}
					/>
					<Dropdown
						label='Localidad'
						data={localidadesData}
						value={this.state.localidad}
                        onChangeText={this.onChangeCompany} 
					/>
                    <TextInput
                        label='Precio Desde'
                        value={this.state.precioDesde}
                        onChangeText={desde => this.setState({ precioDesde: desde })}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label='Precio Hasta'
                        value={this.state.precioHasta}
                        onChangeText={hasta => this.setState({ precioHasta: hasta })}
                        padding='none'
                        dense={true}
                        theme={{ dark: true, colors: { primary: '#3176af' } }}
                        keyboardType='number-pad'
                    />
					<Button style={styles.searchBtn} mode="contained" onPress={this.filter} theme={{ dark: true, colors: { primary: '#3176af' } }}>
						Buscar
					</Button>

                    <Button style={styles.cancelButton} mode="text" uppercase={false} contentStyle={{height: 20}} color='#3176af' compact={true} onPress={this._hideFiltersModal} >
                        <Text>Cancelar</Text>
                    </Button>
				</View>
			)
		}
	}

    render() {
        const { isFocused } = this.state;

        return (
            <View style={styles.container}>
                {this.state.visibleLoader == true ? <ActivityIndicator style={{marginTop:300}} size="large" color="#3176af" /> : null}
                <ScrollView visible={isFocused} style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View contentContainerStyle={styles.rootContainer}>
                        {this.showList()}
                    </View>
                </ScrollView>
                <Modal visible={this.state.showFiltersModal} contentContainerStyle={styles.modal} onDismiss={this._hideFiltersModal}>
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
