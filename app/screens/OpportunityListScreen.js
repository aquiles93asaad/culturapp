import React from 'react';
import {
	StyleSheet,
	Image,
	ScrollView,
} from 'react-native';
import { List, Button } from 'react-native-paper';
import { OpportunityService } from '../services';

export class OpportunityListScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Seguimiento de oportunidades',
	// };

	constructor(props) {
        super(props);
    }

	state = {
		data: 'Banco replay wachin',
		date: new Date(),
		allOpportunities: [],
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
                return (
                    <List.Accordion
                        key={data._id}
                        title={data.name}
                        style={data.itemList}
                        description={data.companyClient.name + ' ' + data.createdAt}
                        left={() => <Image style={{width:24, height:24}} source={this.renderStateIcon(data.state)}/>}>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Creación" description={data.companyClient.createdAt} />
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Cliente" description={data.companyClient.name}/>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Creado por" description={data.createdBy.name + ' ' + data.createdBy.lastName}/>
                        <List.Item style={{backgroundColor:'#f7f7f7'}} title="Canal de venta" description={data.createdBy.userCompany.name}/>
                    </List.Accordion>
                )
            })
        )
    }
	
	render() {
		return (
			<ScrollView
				style={styles.padding} >
				<List.Section>
					{this.showList()}
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
	},
	mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
});
