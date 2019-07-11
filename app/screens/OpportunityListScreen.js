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
import { OpportunityService, CompanyService , UserService} from '../services';
import moment from "moment";
import { TapGestureHandler } from 'react-native-gesture-handler';

export class OpportunityListScreen extends React.Component {
	// static navigationOptions = {
	// 	title: 'Seguimiento de oportunidades',
	// };

	constructor(props) {
		super(props);
		this.chooseOpportunity = this.chooseOpportunity.bind(this);
    }

	state = {
		user: this.props.navigation.getParam('user'),
		allOpportunities: [],
		chosenOpportunity: {},
		clients: [],
		usersCompany: [],
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
		await this.getCompanies();
		await this.getUsers();
    }

	createServiceInstance = async() => {
        this.opportunityService = new OpportunityService(true);
        this.companyService = new CompanyService(true);
        this.userService = new UserService(true);
	}

	getCompanies = async() => {
		const filters = {
            isClient: true
        }
		
		await this.companyService.getCompanies(filters)
		.then(companies => {
			this.setState({ clients: [...companies ] });
            return companies;
        })
        .catch(error => {
            console.log(error);
        });
	};

	getUsers = async() => {
		let filters = null;
		if (this.state.user.roles.includes('SUPERVISOR')) {
			filters = {
				supervisor: this.state.user._id
			}
		} else if (this.state.user.roles.includes('LIDER')) {
			filters = {
				userCompany: this.state.user.userCompany._id
			}
		}
		
		await this.userService.get(filters)
		.then(users => {
			this.setState({ usersCompany: [...users ] });
            return users;
        })
        .catch(error => {
            console.log(error);
        });
	};

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

	editOpportunity(opportunity)  {
		this.opportunityService.update(opportunity)
		.then(result => {
			return result;
		})
		.catch(error => {
			console.log(error);
		});
		this._hideModalEdit();
		this._hideModalAsing();
		this.getOpportunities();
		this.setState(state => ({ visible: !state.visible }));
	}
	
	_showModalAsing = () => this.setState({ showModalAsing: true });
	_hideModalAsing = () => {
		this.setState({ showModalAsing: false });
		this.setState({ showFooter: false });
	}
	_showModalEdit = () => this.setState({ showModalEdit: true });
  	_hideModalEdit = () => {
		  this.setState({ showModalEdit: false });
		  this.setState({ showFooter: false });
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
						description={data.companyClient.name + '   ' + date}
						onPress={() => this.chooseOpportunity(data)}
                        left={() => <Image style={styles.imageListOpp} source={this.renderStateIcon(data.state)}/>}>
                        <List.Item style={styles.backgroundListItem} title="Creación" description={date} />
                        <List.Item style={styles.backgroundListItem} title="Cliente" description={data.companyClient.name}/>
                        <List.Item style={styles.backgroundListItem} title="Creado por" description={data.createdBy.name + ' ' + data.createdBy.lastName}/>
                        <List.Item style={styles.backgroundListItem} title="Canal de venta" description={data.createdBy.userCompany.name}/>
                    </List.Accordion>
                )
            })
        )
	}
	
	chooseOpportunity(opportunity) {
		this.setState({chosenOpportunity: opportunity});
		this.setState({showFooter: true});
	}

	showData(checkBoxName){
		if (checkBoxName == 'digitization'){
			this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, digitization: !this.state.chosenOpportunity.digitization} });
		} 
		else if (checkBoxName == 'automation') {
			this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, automation: !this.state.chosenOpportunity.automation} });
		}
		else if (checkBoxName == 'hardware') {
			this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, hardware: !this.state.chosenOpportunity.hardware} });
		}
		else {
			this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, docManager: !this.state.chosenOpportunity.docManager} });
		}
	}

	demoButton(){
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={styles.viewButtons}>
					<TouchableOpacity 
						activeOpacity={0.5}
						>
						<Image
						source={require('../../assets/images/opportunity-demo.png')}
						style={styles.buttonFooter}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	editButton(){
		if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={styles.viewButtons}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._showModalEdit()}>
						<Image
						source={require('../../assets/images/opportunity-edit.png')}
						style={styles.buttonFooter}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	asingUserButton(){
		if(this.state.chosenOpportunity.state == 'active' && (this.state.user.roles.includes('LIDER') || this.state.user.roles.includes('SUPERVISOR'))){
		// if(this.state.chosenOpportunity.state == 'active'){
			return (
				<View style={styles.viewButtons}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this._showModalAsing()}>
						<Image
						source={require('../../assets/images/opportunity-asing-user.png')}
						style={styles.buttonFooter}
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
				<View style={styles.viewButtons}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, active)}>
						<Image
						source={require('../../assets/images/opportunity-refresh.png')}
						style={styles.buttonFooter}
						/>
					</TouchableOpacity>
				</View>
			)
		}
	}

	wonButton(){
		const won = 'won';
		if(this.state.chosenOpportunity.state == 'active' && this.state.chosenOpportunity.opportunityProposals[0]){
			return (
				<View style={styles.viewButtons}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, won)}>
						<Image
						source={require('../../assets/images/opportunity_won.png')}
						style={styles.buttonFooter}
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
				<View style={styles.viewButtons}>
					<TouchableOpacity activeOpacity={0.5} onPress={() => this.updateOpportunities(this.state.chosenOpportunity._id, lost)}>
						<Image
						source={require('../../assets/images/opportunity_lost.png')}
						style={styles.buttonFooter}
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
						style={styles.buttonFooter}
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

	onChangeCompany = (args, index, data) => {
		if (this.state.chosenOpportunity.companyClient._id != this.state.clients[index]._id){
			this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, companyClient:  { ...this.state.chosenOpportunity.companyClient, _id: this.state.clients[index]._id}} });
		}
	}

	onChangeUser = (args, index, data) => {
		this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, assignedTo: { ...this.state.chosenOpportunity.assignedTo, _id: this.state.usersCompany[index]._id} }});
    }
	
	showAsing = () => {
		let defaultData = null;
		let data = [];

		for (let i = 0; i < this.state.usersCompany.length; i++) {
			data.push( {"value" : this.state.usersCompany[i].name+' '+this.state.usersCompany[i].lastName, "id" :  this.state.usersCompany[i]._id })
		}

		if (this.state.chosenOpportunity.assignedTo) {
			defaultData = this.state.chosenOpportunity.assignedTo.name+' '+this.state.chosenOpportunity.assignedTo.lastName;
		} else {
			defaultData = '';
		}

		return ( 
			<View>
				<Text style={styles.title}>Asignar oportunidad a</Text>
				<Dropdown
					label='Participantes'
					data={data}
					containerStyle={styles.picker}
					value={defaultData}
					onChangeText={this.onChangeUser}
				/>
				<Button 
				style={styles.mt15} 
				mode="contained" 
				onPress={() => this.editOpportunity(this.state.chosenOpportunity)}
				theme={{ dark: true, colors: { primary: '#333366' } }}>
					Confirmar
				</Button>
				<TouchableOpacity 
					activeOpacity={0.5}
					onPress={this._hideModalAsing}
				>
					<Text style={styles.cancelButton}>Cancelar</Text>
				</TouchableOpacity>
			</View>
		)
	}

	showEdit = () => {
		if(this.state.showModalEdit) {
			let data = [];
			for (let i = 0; i < this.state.clients.length; i++) {
				data.push( {"value" : this.state.clients[i].name, "id" :  this.state.clients[i]._id })
			}
			return ( 
				<View>
					<Text style={styles.title}>Editar {this.state.chosenOpportunity.name}</Text>
					<Dropdown
						label='Cliente'
						data={data}
						value={this.state.chosenOpportunity.companyClient.name}
						containerStyle={styles.picker}
						onChangeText={this.onChangeCompany}
					/>
					<TextInput
						label='Nombre de la oportunidad'
						value={this.state.chosenOpportunity.name}
						style={styles.inputEdit}
						onChangeText={(newName) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, name: newName} })}
					/>
					<TextInput
						label='Descripción'
						multiline={true}
						numberOfLines={4}
						style={styles.inputEdit}
						onChangeText={(newDescription) => this.setState({ chosenOpportunity: { ...this.state.chosenOpportunity, description: newDescription} })}
						value={this.state.chosenOpportunity.description}/>
					<CheckBox
						style={styles.checkBox}
						onClick={()=>{
							const typeCheckBox = 'digitization';
							this.showData(typeCheckBox);
						}}
						isChecked={this.state.chosenOpportunity.digitization}
						rightText={"Digitalización"}
					/>
					<CheckBox
						style={styles.checkBox}
						onClick={()=>{
							const typeCheckBox = 'docManager';
							this.showData(typeCheckBox);
						}}
						isChecked={this.state.chosenOpportunity.docManager}
						rightText={"Gestor documental"}
					/>
					<CheckBox
						style={styles.checkBox}
						onClick={()=>{
							const typeCheckBox = 'hardware';
							this.showData(typeCheckBox);
						}}
						isChecked={this.state.chosenOpportunity.hardware}
						rightText={"Hardware"}
					/>
					<CheckBox
						style={styles.checkBox}
						onClick={()=>{
							const typeCheckBox = 'automation';
							this.showData(typeCheckBox);
						}}
						isChecked={this.state.chosenOpportunity.automation}
						rightText={"Automatización de procesos"}
					/>
					<Button style={styles.mt15} mode="contained" onPress={() => this.editOpportunity(this.state.chosenOpportunity)} theme={{ dark: true, colors: { primary: '#333366' } }}>
						Siguiente
					</Button>
					<TouchableOpacity 
						activeOpacity={0.5}
						onPress={this._hideModalEdit}
						>
						<Text style={styles.cancelButton}>Cancelar</Text>
					</TouchableOpacity>
				</View>
			)
		}
	}
	
	render() {
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
				<Modal visible={this.state.showModalAsing} contentContainerStyle={styles.modalAsign}>
					{this.showAsing()}
				</Modal>
				<Modal visible={this.state.showModalEdit} contentContainerStyle={styles.modalEdit}>
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
			width: 1,
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
		bottom: 0,
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
	cancelButton: {
		marginTop: 20,
		fontSize: 15,
		textAlign: 'center',
		color: 'grey',
	},
	modalAsign: {
		height: 300,
		backgroundColor:'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalEdit: {
		height: 450,
		backgroundColor:'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputEdit:{
		backgroundColor:'white',
		height: 50,
		width: 250,
	},
	buttonFooter:{
		height: 35,
		width: 35,
	},
	viewButtons:{
		marginRight:15
	},
	imageListOpp:{
		width:24,
		height:24,
	},
	backgroundListItem:{
		backgroundColor:'#f7f7f7'
	},
});