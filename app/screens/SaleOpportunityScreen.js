import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, IconButton, Snackbar } from 'react-native-paper';
import { CompanyService } from '../services';

export class SaleOpportunityScreen extends React.Component {
    state = {
		clients: [],
        selectedClientId: '',
        visible : false,
    }

    companyService = null;

    componentWillMount = async() => {
        await this.createCompanyService();
        await this.getCompanies();
    }

    createCompanyService = async() => {
        this.companyService = new CompanyService(true);
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

	create = async() => {
		
		await this.companyService.getCompanies(filters)
		.then(companies => {
			this.setState({ clients: [...companies ] });
            return companies;
        })
        .catch(error => {
            console.log(error);
        });
    };
    
    showList = () => {
		let data = [];
		for (let i = 0; i < this.state.clients.length; i++) {
			data.push( {"value" : this.state.clients[i].name, "id" :  this.state.clients[i]._id })
        }
        
		return ( 
			<Dropdown
				label='Nombre de la empresa *'
				data={data}
				containerStyle={styles.picker}
				onChangeText={this.onChangeCompany}
			/>
		)
	}

	onChangeCompany = (args, index, data) => {
		this.setState({selectedClientId: this.state.clients[index]._id});
    }
    
	goStep1 = () => {
        if (this.state.selectedClientId != ''){
            this.props.navigation.navigate('SaleOpportunity2', {data: this.state.selectedClientId});
        } else {
            this.setState(state => ({ visible: !state.visible }));
        }
    };

    goNewClient = () => {
		this.props.navigation.navigate('NewClient');
    };

	render() {
		return (
			<View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <ScrollView contentContainerStyle={styles.clientContainer}>
                        <Text style={styles.paragraph}>
                            Datos del potencial cliente
                        </Text>
                        {this.showList()}
                        <ScrollView contentContainerStyle={styles.newClientContainer}>
                            <IconButton
                                style={styles.newClientBtn}
                                icon="add"
                                color='#fff'
                                size={30}
                                onPress={this.goNewClient}
                            />
                            <Text style={styles.newClientText}>Nuevo cliente</Text>
                        </ScrollView>
                    </ScrollView>
                    <ScrollView contentContainerStyle={styles.btnContainer}>
                        <ScrollView contentContainerStyle={styles.linesContainer}>
                            <ScrollView style={styles.filledLine} ></ScrollView>
                            <ScrollView style={styles.emptyLine} ></ScrollView>
                            <ScrollView style={styles.emptyLine} ></ScrollView>
                        </ScrollView>
                        <Button style={styles.nextBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#333366' onPress={this.goStep1}>
                            Siguiente
                        </Button>
                    </ScrollView>
                </ScrollView>
                <Snackbar
					visible={this.state.visible}
					duration={20000}
					onDismiss={() => this.setState({ visible: false })}
					action={{
					label: 'OK',
					onPress: () => {
						// Do something
					},
					}}
				>
					Debe ingresar una empresa.
				</Snackbar>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    },
    contentContainer: {
        justifyContent: 'flex-start',
        padding: 30,
        paddingTop: 20,
        paddingBottom: 50,
        flex: 1,
    },
	paragraph: {
		marginBottom: 30,
		fontSize: 20,
		textAlign: 'center',
		color: '#4e3a59',
	},
	picker: {
		marginBottom: 70,
    },
    clientContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    newClientContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
	newClientBtn: {
        backgroundColor: '#333366',
        borderRadius: 30,
        height: 50,
        width: 50,
    },
    newClientText: {
        color: '#ccc',
    },
    btnContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    linesContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    filledLine: {
        height: 6,
        borderRadius: 5,
        maxWidth: 80,
        backgroundColor: '#333366'
    },
    emptyLine: {
        height: 6,
        borderRadius: 5,
        maxWidth: 80,
        backgroundColor: '#ccc'
    },
	nextBtn:{
        borderRadius: 30,
        textTransform: 'capitalize',
        // justifyContent: 'flex-end'
    },
});
