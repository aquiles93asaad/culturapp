import React from 'react';
import {
	View,
	StyleSheet,
	Text,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-paper';
import { CompanyService } from '../services';

export class SaleOpportunityScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Generar oportunidad',
    // };
    
    state = {
		clients: [],
		// dataSelect: '',
		selectedClientId: '',
    }
    
    companyService = null;

    componentWillMount = async() => {
        await this.createServiceInstance();
        await this.getCompanies();
    }

    createServiceInstance = async() => {
        this.companyService = new CompanyService(true);
    }

	getCompanies = async() => {
		const filters = {
            isClient: true
        }
		
		await this.companyService.getCompanies(filters)
		.then(companies => {
			this.setState({ clients: [...companies ] });
            return companies;
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    showList = () => {
		let data = [];
		for (let i = 0; i < this.state.clients.length; i++) {
			// this.setState({ dataSelect: [...this.state.dataSelect , {"value" : this.state.companies[i].name, "id" :  this.state.companies[i]._id }]})
			data.push( {"value" : this.state.clients[i].name, "id" :  this.state.clients[i]._id })
		}
		// this.state.companies.map((data) => {
		// 	this.setState({ dataSelect: [...this.state.dataSelect , {"value" : data.name, "id" :  data._id }]})
		// })
		return ( 
			<Dropdown
				label='Nombre de la empresa *'
				data={data}
				containerStyle={styles.picker}
				onChangeText={this.onChangeCompany}
			/>
				
		)
	}

	onChangeCompany = (args, index, data) => {
		this.setState({selectedClientId: this.state.clients[index]._id});
	}
	goStep1 = () => {
		console.log(this.state.firstData);
		this.props.navigation.navigate('SaleOpportunity2', {data: this.state.selectedClientId});
    };

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>
					Datos del potencial cliente
      			</Text>
				{this.showList()}
				<Button style={styles.mt15} mode="contained" onPress={this.goStep1} theme={{ dark: true, colors: { primary: '#333366' } }}>
					Siguiente
				</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	paragraph: {
		marginTop: 24,
		fontSize: 20,
		textAlign: 'center',
		color: '#4e3a59',
	},
	itemStyle: {
		fontSize: 15,
		height: 75,
		color: 'black',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	picker: {
		width: 250
	},
	add: {
		marginTop: 15,
		fontSize: 60,
		color: '#4e3a59',
	},
	steps: {
		marginTop: 15,
		marginBottom: 15,
	},
	mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
});
