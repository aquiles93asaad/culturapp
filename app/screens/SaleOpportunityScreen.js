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
		companies: [],
    }
    
    companyService = null;

    componentWillMount = async() => {
        console.log('componentWillMount SaleOpportunityScreen');
        await this.createServiceInstance();
        await this.getCompanies();
    }

    createServiceInstance = async() => {
        this.companyService = new CompanyService(true);
    }

	getCompanies = async() => {
        console.log('getCompanies SaleOpportunityScreen');
		const filters = {
            isClient: true
        }
		
		await this.companyService.getCompanies(filters)
		.then(companies => {
            console.log(companies);
			this.setState({ companies: [...companies ] });
            return companies;
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    showList = () => {
		this.state.allCompanies.map((data) => {
			return ( 
				console.log(data.name)
			)
		})
	}

	goStep1 = () => {
        this.props.navigation.navigate('SaleOpportunity2');
    };

	render() {
		let data = [{
			value: 'Santander Rio',
		}, {
			value: 'BBVA',
		}, {
			value: 'Galicia',
		}];
		return (
			<View style={styles.container}>
				<Text style={styles.paragraph}>
					Datos del potencial cliente
      			</Text>
				<Dropdown
					label='Nombre de la empresa *'
					data={data}
					containerStyle={styles.picker}
				/>
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
