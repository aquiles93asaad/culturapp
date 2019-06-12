import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	ScrollView,
} from 'react-native';
import { List } from 'react-native-paper';

export class OpportunityListScreen extends React.Component {
	static navigationOptions = {
		title: 'Seguimiento de oportunidades',
	};

	state = {
		data: 'Banco replay wachin',
		date: new Date(),
	}

	render() {
		return (
			<ScrollView
				style={styles.padding} >
				<List.Section
				// style={styles.data}
				>
					<List.Accordion
						title="Oportunidad 1"
						style={styles.itemList}
						description={this.state.data + ' ' + this.state.date.getDay() + '/' + this.state.date.getMonth() + '/' + this.state.date.getYear()}
						// left={() => <Image style={{width:24, height:24}} source={require('../../assets/images/opportunity_active.png')}/>}
					>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Creación" description='a' />
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Cliente" description='a'/>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Creado por" description='a'/>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Canal de venta" description='a'/>
					</List.Accordion>
					<List.Accordion
						title="Oportunidad 2"
						style={styles.itemList}
						description={this.state.data + ' ' + this.state.date.getDay() + '/' + this.state.date.getMonth() + '/' + this.state.date.getYear()}
					>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Creación" description='a' />
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Cliente" description='a'/>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Creado por" description='a'/>
						<List.Item style={{backgroundColor:'#f7f7f7'}} title="Canal de venta" description='a'/>
					</List.Accordion>
				</List.Section>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
	},
	itemList:{
		borderBottomColor: '#dbdcdd',
		borderBottomWidth: 1,
		borderTopColor: '#f4f6f7',
		borderTopWidth: 1,
	},
	padding:{
		padding: 15
	}
});