import React from 'react';
import {
	View,
	StyleSheet,
	Text,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-paper';

export class SaleOpportunityScreen extends React.Component {
	static navigationOptions = {
		title: 'Generar oportunidad',
	};

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
    }
});
