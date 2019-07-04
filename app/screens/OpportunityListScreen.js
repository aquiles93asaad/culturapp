import React from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { List, Button, Snackbar, Modal, TextInput } from 'react-native-paper';
import CheckBox from 'react-native-check-box'
import { Dropdown } from 'react-native-material-dropdown';
import { OpportunityService } from '../services';
import moment from "moment";

export class OpportunityListScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Seguimiento de oportunidades',
	// };

	constructor(props) {
		super(props);
		this.chooseOpportunity = this.chooseOpportunity.bind(this);
    }

	state = {
		allOpportunities: [],
		chosenOpportunity: {},
		showFooter: false,
		visible : false,
		showModalAsing: false,
		showModalEdit: false,
		nameOpportunity: '',
        descOpportunity: '',
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
		this.opportunityService.update({_id: id,state: state})
		.then(result => {
			return result;
		})
		.catch(error => {
			console.log(error);
		});
		this.getOpportunities();
		this.setState(state => ({ visible: !state.visible }));
		this.setState({showFooter: false});
	}
	
	_showModalAsing = () => this.setState({ showModalAsing: true });
  	_hideModalAsing = () => this.setState({ showModalAsing: false });
	_showModalEdit = () => this.setState({ showModalEdit: true });
  	_hideModalEdit = () => this.setState({ showModalEdit: false });
    
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
						description={data.companyClient.name + '   ' + date}
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

	showData(){
		this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, digitization: !this.state.chosenOpportunity.digitization} });
	}

	demoButton(){
		if(this.state.chosenOpportunity.state == 'active'){
			return (
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
			)
		}
	}

	editButton(){
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={{marginRight:15}}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._showModalEdit()}>
						<Image
						source={require('../../assets/images/opportunity-edit.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	asingUserButton(){
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={{marginRight:15}}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._showModalAsing()}>
						<Image
						source={require('../../assets/images/opportunity-asing-user.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	refreshButton(){
		const active = 'active';
		if(this.state.chosenOpportunity.state == 'lost' || this.state.chosenOpportunity.state == 'dismissed' ){
			return (
				<View style={{marginRight:15}}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, active)}>
						<Image
						source={require('../../assets/images/opportunity-refresh.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	wonButton(){
		const won = 'won';
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={{marginRight:15}}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, won)}>
						<Image
						source={require('../../assets/images/opportunity_won.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	lostButton(){
		const lost = 'lost';
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={{marginRight:15}}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, lost)}>
						<Image
						source={require('../../assets/images/opportunity_lost.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}
	
	dismissedButton(){
		const dismissed = 'dismissed';
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, dismissed)}>
						<Image
						source={require('../../assets/images/opportunity_dismissed.png')}
						style={{width:35, height:35}}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	renderFooter() {
		if(this.state.showFooter && (this.state.chosenOpportunity.state && this.state.chosenOpportunity.state != 'won')) {
			return (
				<View style={styles.bottomView}>
					{this.demoButton()}
					{this.editButton()}
					{this.asingUserButton()}
					{this.refreshButton()}
					{this.wonButton()}
					{this.lostButton()}
					{this.dismissedButton()}
				</View>
			)
		}
	}
	
	showAsing = () => {
		let data = [{
			value: 'Banana',
		  }, {
			value: 'Mango',
		  }, {
			value: 'Pear',
		  }];
		return ( 
			<View>
				<Text style={styles.title}>Asignar oportunidad a</Text>
				<Dropdown
					label='Participantes'
					data={data}
					containerStyle={styles.picker}
					// onChangeText={this.onChangeCompany}
				/>
				<Button 
				style={styles.mt15} 
				mode="contained" 
				// onPress={}
				theme={{ dark: true, colors: { primary: '#333366' } }}>
					Confirmar
				</Button>
			</View>
		)
	}

	showEdit = () => {
		let data = [{
			value: 'Banana',
		  }, {
			value: 'Mango',
		  }, {
			value: 'Pear',
		  }];
		return ( 
			<View>
				<Text style={styles.title}>Editar oportunidad</Text>
				<Dropdown
					label='Participantes'
					data={data}
					containerStyle={styles.picker}
					// onChangeText={this.onChangeCompany}
				/>
				<TextInput
					label='Nombre de la oportunidad'
					value={this.state.chosenOpportunity.name}
					style={{backgroundColor:'white', height: 50, width: 250}}
					onChangeText={(newName) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, name: newName} })}
				/>
				<TextInput
					label='Descripción'
					multiline={true}
					numberOfLines={4}
					style={{backgroundColor:'white', height: 50, width: 250}}
					onChangeText={(newDescription) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, description: newDescription} })}
					value={this.state.chosenOpportunity.description}/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
						this.showData(data.digitization)
					// this.setState({
					// 	chosenOpportunity:{digitization: !this.state.chosenOpportunity.digitization}
					// })
					}}
					isChecked={this.state.chosenOpportunity.digitization}
					rightText={"Digitalización"}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
					this.setState({
						chosenOpportunity:{docManager: !this.state.chosenOpportunity.docManager}
					})
					}}
					isChecked={this.state.chosenOpportunity.docManager}
					rightText={"Gestor documental"}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
					this.setState({
						chosenOpportunity:{hardware: !this.state.chosenOpportunity.hardware}
					})
					}}
					isChecked={this.state.chosenOpportunity.hardware}
					rightText={"Hardware"}
				/>
				<CheckBox
					style={styles.checkBox}
					onClick={()=>{
					this.setState({
						chosenOpportunity:{automation: !this.state.chosenOpportunity.automation}
					})
					}}
					isChecked={this.state.chosenOpportunity.automation}
					rightText={"Automatización de procesos"}
				/>
				<Button style={styles.mt15} mode="contained" onPress={this.goStep2} theme={{ dark: true, colors: { primary: '#333366' } }}>
					Siguiente
				</Button>
			</View>
		)
	}
	
	render() {
		const asignUser = this.state.showModalAsing;
		const editOpportunity = this.state.showModalEdit;
		return (
			<View>
				<ScrollView  
					style={styles.padding}>
					<List.Section>
						{this.showList()}
					</List.Section>
				</ScrollView>
				{this.renderFooter()}
				<Snackbar
					visible={this.state.visible}
					duration={14000}
					onDismiss={() => this.setState({ visible: false })}
					action={{
					label: 'OK',
					onPress: () => {
						// Do something
					},
					}}
				>
					Se actualizo la oportunidad
				</Snackbar>
				<Modal visible={asignUser} onDismiss={this._hideModalAsing} contentContainerStyle={{height: 300, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
					{this.showAsing()}
				</Modal>
				<Modal visible={editOpportunity} onDismiss={this._hideModalEdit} contentContainerStyle={{height: 450, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
					{this.showEdit()}
				</Modal>
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
		marginBottom: 70,
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
	picker: {
		width: 250,
	},
	title: {
		fontSize: 15,
		textAlign: 'center',
		color: '#333366',
		fontWeight: 'bold',
	},
	checkBox:{
        marginTop: 15,
    },
});