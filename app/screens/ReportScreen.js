import React from 'react';
import { View, StyleSheet,} from 'react-native';
import Echarts from 'native-echarts';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-datepicker';

export class ReportScreen extends React.Component {
	static navigationOptions = {
		title: 'Reports',
	};

	state = {
		won: 1,
		lost: 2,
		dismissed: 3,
		active: 4,
	}

	render() {
		const option = {
			title: {
				text: 'Cantidad de oportunidades',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			series: [{
				name: 'Oportunidades',
				type: 'pie',
				radius: '55%',
				center: ['50%', '50%'],
				data: [
					{ value: this.state.won, name: 'Ganadas' },
					{ value: this.state.lost, name: 'Perdidas' },
					{ value: this.state.dismissed, name: 'Desechadas' },
					{ value: this.state.active, name: 'En progreso' }
				]
			}]
		};
		return (
			<View>
				<DatePicker
					style={{width: 200, flex:1, textAlign:'center'}}
					date={this.state.date}
					mode="date"
					placeholder="select date"
					format="YYYY-MM-DD"
					minDate="2016-05-01"
					maxDate="2016-06-01"
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					customStyles={{
					dateIcon: {
						position: 'absolute',
						left: 0,
						top: 4,
						marginLeft: 0
					},
					dateInput: {
						marginLeft: 36
					}
					// ... You can check the source to find the other keys.
					}}
					onDateChange={(date) => {this.setState({date: date})}}
				/>
				<Echarts option={option} height={300} />
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
	}
});