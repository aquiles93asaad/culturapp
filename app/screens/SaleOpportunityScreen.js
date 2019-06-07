import React from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
} from 'react-native';
import { List } from 'react-native-paper';

export class SaleOpportunityScreen extends React.Component {
	static navigationOptions = {
		title: 'Seguimiento de oportunidades',
	};

	state = {
		data: 'Banco replay wachin',
		date: new Date(),
	}

	render() {
		return (
			<View
				style={{ padding: 15 }} >
				<List.Section
				// style={styles.data}
				>
					<List.Accordion
						title="First Item"
						style={styles.data}
						description={this.state.data + ' ' + this.state.date.getDay() + '/' + this.state.date.getMonth() + '/' + this.state.date.getYear()}
					>
						<List.Item title="Creación" description='a' />
						<List.Item title="Cliente" description='a'/>
						<List.Item title="Creado por" description='a'/>
						<List.Item title="Canal de venta" description='a'/>
					</List.Accordion>
					<List.Accordion
						title="First Item"
						style={styles.data}
						description={this.state.data + ' ' + this.state.date.getDay() + '/' + this.state.date.getMonth() + '/' + this.state.date.getYear()}
					>
						<List.Item title="Creación" description='a' />
						<List.Item title="Cliente" description='a'/>
						<List.Item title="Creado por" description='a'/>
						<List.Item title="Canal de venta" description='a'/>
					</List.Accordion>
				</List.Section>
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
	data:{
		borderBottomColor: '#dbdcdd',
		borderBottomWidth: 1,
		borderTopColor: '#f4f6f7',
		borderTopWidth: 1,
		marginBottom: 10,
	}
});
