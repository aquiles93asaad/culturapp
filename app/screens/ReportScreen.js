import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Echarts from 'native-echarts';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { OpportunityService } from '../services'

export class ReportScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Reports',
	// };

	state = {
		wonPie: 0,
		lostPie: 1,
		dismissedPie: 2,
		activePie: 0,
		wonBar: 1,
		lostBar: 2,
		dismissedBar: 3,
		activeBar: 4,
		dateBar: '',
		selectedStartDate: null,
      	selectedEndDate: null,
		allOpportunities: [],
	}

	opportunityService = null;

	componentWillMount = async() => {
		await this.createServiceInstance();
    }

	createServiceInstance = async() => {
        this.opportunityService = new OpportunityService(true);
	}

	renderBar = () => { 
		const bar = {
			title: {
                text: 'Precio total oportunidades',
                left: 'center',
                top: 20,
                textStyle: {
                    color: '#000000'
                }
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: [
						{ value: this.state.wonBar, name: 'Ganadas' },
						{ value: this.state.lostBar, name: 'Perdidas' },
						{ value: this.state.dismissedBar, name: 'Desechadas' },
						{ value: this.state.activeBar, name: 'En progreso' }
					],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'Valor total',
                type: 'bar',
                barWidth: '60%',
                data: [
					{ value: this.state.wonBar, name: 'Ganadas' },
					{ value: this.state.lostBar, name: 'Perdidas' },
					{ value: this.state.dismissedBar, name: 'Desechadas' },
					{ value: this.state.activeBar, name: 'En progreso' }
				]
            }]
		};
	}

	renderPie = () => {
		const pie = {
			title: {
				text: 'Cantidad de oportunidades',
				left: 'center',
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
					{ value: this.state.wonPie, name: 'Ganadas' },
					{ value: this.state.lostPie, name: 'Perdidas' },
					{ value: this.state.dismissedPie, name: 'Desechadas' },
					{ value: this.state.activePie, name: 'En progreso' }
				]
			}]
		};

		if (this.state.activePie == 0 && this.state.dismissedPie == 0 && this.state.lostPie == 0 && this.state.wonPie == 0){
		} else {
			return (
				<Echarts option={pie} height={300} />
			)
		}
	}

	getOpportunities = async() => {
		console.log(new Date());
		const filters = { createdAt: {} };
		if(this.state.selectedStartDate) {
			filters.createdAt['$gte'] = new Date(this.state.selectedStartDate)
		}
		if(this.state.selectedEndDate) {
			filters.createdAt['$lte'] = new Date(this.state.selectedEndDate)
		}

		console.log(filters);

		await this.opportunityService.get(filters, false)
		.then(opportunities => {
			this.setState({ allOpportunities: [...opportunities ] });
			console.log(this.state.allOpportunities);
			// console.log(typeof filters.createdAt);
            return opportunities;
        })
        .catch(error => {
            console.log(error);
		});
		
		console.log(this.state.allOpportunities);
	}

	onDateChange(date) {
		  this.setState({
			selectedStartDate: new Date (date),
		  });
	  }

	render() {
		const { selectedStartDate, selectedEndDate } = this.state;
		const minDate = new Date(); // Today
		const maxDate = new Date(2017, 6, 3);
		const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
		const endDate = selectedEndDate ? selectedEndDate.toString() : '';
		return (
			<View>
				{/* <CalendarPicker
					startFromMonday={true}
					allowRangeSelection={true}
					minDate={minDate}
					maxDate={maxDate}
					todayBackgroundColor="#f2e6ff"
					selectedDayColor="#7300e6"
					selectedDayTextColor="#FFFFFF"
					onDateChange={this.onDateChange}
				/>
				<Text>SELECTED START DATE:{ startDate }</Text>
				<Text>SELECTED END DATE:{ endDate }</Text> */}
				<View
				style={{alignItems: 'center'}}
				>
					<DatePicker
						style={{marginTop: 5, width: 300}}
						date=''
						mode="date"
						placeholder="seleccionar día"
						// format="DD-MM-YYYY"
						minDate="2019-01-01"
						maxDate={new Date()}
						confirmBtnText="Confirmar"
						cancelBtnText="Cancelar"
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
						onDateChange={(date) => this.onDateChange(date)}
					/>
					<DatePicker
						style={{marginTop: 15, marginBottom: 10, width: 300}}
						date={this.state.date}
						mode="date"
						placeholder="seleccionar día"
						format="DD-MM-YYYY"
						minDate="2019-01-01"
						maxDate={new Date()}
						confirmBtnText="Confirmar"
						cancelBtnText="Cancelar"
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
				</View>
				{this.renderPie()}
				<Button 
				style={styles.mt15} 
				mode="contained" 
				onPress={ () => this.getOpportunities() }
				theme={{ dark: true, colors: { primary: '#333366' } }}>
					Confirmar
				</Button>
				{/* <Echarts option={bar} height={300} /> */}
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