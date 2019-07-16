import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { TextInput, Button, Snackbar, RadioButton } from 'react-native-paper';
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-material-dropdown';
import { CompanyService } from '../services';
import { IndustryService } from '../services/IndustryService';


export class NewClientScreen extends React.Component {

    state = {
        name: '',
        cuit: '',
        country: '',
        phone: '',
        employeesCount: null,
        branchesNumber: '',
        industry: '',
        anualBilling: null,
        type: '',
        origin: '',
        address: '',
        webSite: '',
        hasStandard: false,
        visible : false,
        industries: [],
        checked: '',
        clients: []
    }

    companyService = null;

    componentWillMount = async() => {
        await this.createCompanyService();
        await this.getIndustries();
    }

    createCompanyService = async() => {
        this.companyService = new CompanyService(true);
        this.industryService = new IndustryService(true);
    }

    getCompanies = async() => {
		const filters = {
            isClient: true
        }
		
		await this.companyService.getCompanies(filters)
		.then(companies => {
			this.setState({ clients: [...companies] });
            return companies;
        })
        .catch(error => {
            console.log(error);
        });
    };

    getIndustries = async() => {
		const filters = {
        }
		
		await this.industryService.getIndustries(filters)
		.then(industries => {
            this.setState({ industries: [...industries ] });
            return industries;
        })
        .catch(error => {
            console.log(error);
        });
    };

	createClient = async() => {
        let company = {...this.state}
        company['type'] = 'medium'
        company['origin'] = 'national'
        company['isClient'] = true;

		await this.companyService.create(company)
		.then(company => {
            const { navigation } = this.props;
            navigation.goBack();
            navigation.state.params.onSelect({ name: company.name, _id: company._id});
            // return company;
        })
        .catch(error => {
            console.log(error);
        });

        // await this.getCompanies();
        // for (let i = 0; i < this.state.clients.length; i++) {
        //     if( company.name == this.state.clients[i].name){
        //         this.setState({ companyComeback: {name: this.state.clients[i].name, _id: this.state.clients[i]._id}});
        //     }
        // }
    };

    onChangeCompany = (args, index, data) => {
		this.setState({industry: this.state.industries[index]._id});
    }

    showList = () => {
		let data = [];
		for (let i = 0; i < this.state.industries.length; i++) {
			data.push( {"value" : this.state.industries[i].name, "id" :  this.state.industries[i]._id })
        }
        
		return ( 
			<Dropdown
				label='Tipo de industria'
				data={data}
				containerStyle={styles.picker}
				onChangeText={this.onChangeCompany}
			/>
		)
	}

    renderClientForm = () => {
        return (
            <React.Fragment>
                <TextInput
                    label='Nombre'
                    value={this.state.name}
                    style={{backgroundColor:'white'}}
                    onChangeText={(name) => this.setState({ name: name })}
                />
                <TextInput
                    label='Cuit/Ruc'
                    value={this.state.cuit}
                    style={{backgroundColor:'white'}}
                    onChangeText={(cuit) => this.setState({ cuit: cuit })}
                />
                <TextInput
                    label='País'
                    value={this.state.country}
                    style={{backgroundColor:'white'}}
                    onChangeText={(country) => this.setState({ country: country })}
                />
                <TextInput
                    label='Télefono de contacto'
                    value={this.state.phone}
                    style={{backgroundColor:'white'}}
                    onChangeText={(phone) => this.setState({ phone: phone })}
                />
                <TextInput
                    label='Cantidad de empleados'
                    value={this.state.employeesCount}
                    style={{backgroundColor:'white'}}
                    onChangeText={(employeesCount) => this.setState({ employeesCount: employeesCount })}
                    keyboardType='number-pad'
                />
                <TextInput
                    label='Cantidad de sucursales'
                    value={this.state.branchesNumber}
                    style={{backgroundColor:'white'}}
                    onChangeText={(branchesNumber) => this.setState({ branchesNumber: branchesNumber })}
                    keyboardType='number-pad'
                />
                {/* {<TextInput
                    label='Industria'
                    value={this.state.industry}
                    style={{backgroundColor:'white'}}
                    onChangeText={(industry) => this.setState({ industry: industry })}
                />} */}
                {this.showList()}
                <TextInput
                    label='Facturación Anual'
                    value={this.state.anualBilling}
                    style={{backgroundColor:'white'}}
                    onChangeText={(anualBilling) => this.setState({ anualBilling: anualBilling })}
                    keyboardType='number-pad'
                />
                <TextInput
                    label='Dirección'
                    value={this.state.address}
                    style={{backgroundColor:'white'}}
                    onChangeText={(address) => this.setState({ address: address })}
                />
                <TextInput
                    label='Website'
                    value={this.state.webSite}
                    style={{backgroundColor:'white'}}
                    onChangeText={(webSite) => this.setState({ webSite: webSite })}
                />
                <View>
                    <RadioButton
                    value="Pequeña"
                    status={this.state.checked === 'small' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'small' }); }}
                    />
                    <RadioButton
                    value="Mediana"
                    status={this.state.checked === 'medium' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'medium' }); }}
                    />
                    <RadioButton
                    value="Grande"
                    status={this.state.checked === 'big' ? 'checked' : 'unchecked'}
                    onPress={() => { this.setState({ checked: 'big' }); }}
                    />
                </View>
            </React.Fragment>
		)
    }

	render() {
		return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Text style={styles.paragraph}>
                        Agregar Cliente
                    </Text>
                    <ScrollView contentContainerStyle={styles.formContainer}>
                    {this.renderClientForm()}
                    </ScrollView>
                    <ScrollView contentContainerStyle={styles.btnContainer}>
                        <Button style={styles.nextBtn} contentStyle={{height: 50}} mode="contained" uppercase={false} color='#333366' onPress={this.createClient}>
                            Crear
                        </Button>
                    </ScrollView>
                </ScrollView>
                <Snackbar
                    visible={this.state.visible}
                    onDismiss={() => this.setState({ visible: false })}
                    action={{
                    label: 'OK',
                    onPress: () => {
                        // Do something
                    },
                    }}
                >
                    Alguno de los datos ingresados es erroneo o se encuentra incompleto.
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
		marginTop: 24,
		fontSize: 20,
		textAlign: 'center',
		color: '#4e3a59',
	},
    formContainer: {
        flexGrow: 1,
    },
    input: {
        marginBottom: 20,
    },
    checkBox: {
        marginBottom: 20,
    },
    formBtn: {
        marginBottom: 20,
        borderRadius: 30,
        textTransform: 'capitalize'
    },
});