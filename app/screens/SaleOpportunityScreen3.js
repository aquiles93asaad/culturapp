import React from 'react';
import {
	View,
	StyleSheet,
    Text,
    Image
} from 'react-native';
import { Button } from 'react-native-paper';

export class SaleOpportunityScreen3 extends React.Component {
	// static navigationOptions = {
	// 	title: 'Something',
    // };

	goStep2 = () => {
        this.props.navigation.navigate('OpportunityList');
	}; 

	render() {
		return (
			<View
            style={styles.container}>
                <Text style={styles.paragraph}>
					Datos de la oportunidad
      			</Text>
                <Image style={styles.image} source={require('../../assets/images/saleopportunity_final.png')} />
                <Button style={styles.mt15} mode="contained" onPress={this.goStep2} theme={{ dark: true, colors: { primary: '#3176af' } }}>
                    Ver oportunidad
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
    textCheckbox:{
        marginTop: 10,
    },
    itemList:{
		borderBottomColor: '#dbdcdd',
		borderBottomWidth: 1,
		borderTopColor: '#f4f6f7',
		borderTopWidth: 1,
		marginBottom: 10,
    },
    image: {
        height: 200,
        width: 200,
    },
    mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
    paragraph: {
        marginTop: 24,
        marginTop: 12,
        fontSize: 20,
        textAlign: 'center',
        color: '#4e3a59',
	},
});