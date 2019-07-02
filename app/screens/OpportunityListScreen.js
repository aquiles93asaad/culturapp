import React from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { List, Button } from 'react-native-paper';
import { OpportunityService } from '../services';
import moment from "moment";

export class OpportunityListScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Seguimiento de oportunidades',
	// };

	constructor(props) {
        super(props);
    }

	state = {
		allOpportunities: [],
		chosenOpportunity: {},
		showFooter: false,
		won: 'won',
		lost: 'lost',
		dismissed: 'dismissed',
		lost: 'lost',
	}

	opportunityService = null;

	componentWillMount = async() => {
		await this.createServiceInstance();
		await this.getOpportunities();
    }

	createServiceInstance = async() => {
        this.opportunityService = new OpportunityService(true);
	}

	getOpportunities = async() => {
		await this.opportunityService.get({}, true)
		.then(opportunities => {
			this.setState({ allOpportunities: [...opportunities ] });
            return opportunities;
        })
        .catch(error => {
            console.log(error);
        });
	}
	
	updateOpportunities(id, state)  {
		for (let i = 0; i < this.state.allOpportunities; i++) {
			if (this.state.allOpportunities[i]._id = id ){
				return i;
			}
		}
		console.log(id);
		console.log(state);
		// this.setState({allOpportunities[i]: {state: state , _id: id}})
		// this.opportunityService.update(allOpportunities[i])
        //     .then(result => {
        //         return result;
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }
    
    renderStateIcon = (state) => {
        switch (state) {
            case 'won':
                return require('../../assets/images/opportunity_won.png')
            case 'lost':
                return require('../../assets/images/opportunity_lost.png')
            case 'dismissed':
                return require('../../assets/images/opportunity_dismissed.png')
            default:
                return require('../../assets/images/opportunity_active.png')
        }
    }
	
	showList() {
        return (
            this.state.allOpportunities.map((data) => {
				var date = moment(data.createdAt).format("DD/MM/YYYY");
                return (
                    <List.Accordion
                        key={data._id}
                        title={data.name}
                        style={data.itemList}
						description={data.companyClient.name + ' ' + date}
						onPress={() => this.chooseOpportunity(data)}
                        left={() => <Image style={{width:24, height:24}} source={this.renderStateIcon(data.state)}/>}>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Creación" description={date} />
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Cliente" description={data.companyClient.name}/>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Creado por" description={data.createdBy.name + ' ' + data.createdBy.lastName}/>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Canal de venta" description={data.createdBy.userCompany.name}/>
                    </List.Accordion>
                )
            })
        )
	}
	
	chooseOpportunity(opportunity) {
		this.setState({chosenOpportunity: opportunity});
		this.setState({showFooter: true});
	}



	renderFooter() {
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={styles.bottomView}>
					<View style={{marginRight:15}}>
						<TouchableOpacity 
							activeOpacity={0.5}
							>
							<Image
							source={require('../../assets/images/opportunity-demo.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginRight:15}}>
						<TouchableOpacity activeOpacity={0.5}>
							<Image
							source={require('../../assets/images/opportunity-edit.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginRight:15}}>
						<TouchableOpacity activeOpacity={0.5}>
							<Image
							source={require('../../assets/images/opportunity-asing-user.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginRight:15}}>
						<TouchableOpacity activeOpacity={0.5}>
							<Image
							source={require('../../assets/images/opportunity-refresh.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginRight:15}}>
						<TouchableOpacity activeOpacity={0.5}>
							<Image
							source={require('../../assets/images/opportunity_won.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View style={{marginRight:15}}>
						<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id,this.state.lost)}>
							<Image
							source={require('../../assets/images/opportunity_lost.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity activeOpacity={0.5}>
							<Image
							source={require('../../assets/images/opportunity_dismissed.png')}
							style={{width:35, height:35}}
							/>
						</TouchableOpacity>
					</View>
				</View>
			)
		} else if (this.state.chosenOpportunity.state == 'active' && this.state.showFooter == true) {
		}
    }
	
	render() {
		return (
			<View>
				<ScrollView  
					style={styles.padding}>
					<List.Section
						style={styles.shadow}>
							{this.showList()}
					</List.Section>
				</ScrollView>
				{this.renderFooter()}
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
	itemList:{
		borderBottomColor: '#dbdcdd',
		borderBottomWidth: 1,
		borderTopColor: '#f4f6f7',
		borderTopWidth: 1,
	},
	padding:{
		padding: 15,
		// marginBottom: 71,
	},
	mt15:{
		marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
	},
	shadow:{
		shadowColor: "#000000",
		shadowOpacity: 0.8,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 1
		}
	},
	bottomView:{
		flexDirection: 'row',
		width: '100%', 
		height: 70, 
		backgroundColor: '#333366', 
		justifyContent: 'center', 
		alignItems: 'center',
		position: 'absolute',
		bottom: 0
	  },
});