import React from 'react';
import {
	View,
	StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import CheckBox from 'react-native-check-box'
import { OpportunityService } from '../services';

export class SaleOpportunityScreen2 extends React.Component {
	// static navigationOptions = {
	// 	title: 'Generar oportunidad',
    // };
    
    state = {
        nameOpportunity: '',
        descOpportunity: '',
        digitization: false,
        docManager: false,
        hardware: false,
        automation: false,
        firstStepData: '',
        visible : false,
    }

    componentWillMount = async() => {
        await this.createServiceInstance();
        const { navigation } = this.props;
        const idCompany = navigation.getParam('data', 'NO-ID');
        this.setState({firstStepData: idCompany})
        console.log(this.state.firstStepData);
        return this.state.firstStepData;
    }

    createServiceInstance = async() => {
        this.opportunityService = new OpportunityService(true);
    }

	goStep2 = () => {
        if(this.state.nameOpportunity != '' && this.state.descOpportunity != '' && (this.state.docManager == true || this.state.digitization == true)){
            let opportunity = [];
            opportunity.push({
                "name": this.state.nameOpportunity,
                "description": this.state.descOpportunity,
                "companyClient": this.state.firstStepData,
                "automation": this.state.automation,
                "docManager": this.state.docManager,
                "digitization": this.state.digitization,
                "hardware": this.state.hardware,
            });
            this.opportunityService.create(opportunity[0])
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
            this.props.navigation.navigate('SaleOpportunity3');
        } else {
            this.setState(state => ({ visible: !state.visible }))
        }
    };

	render() {
        const { visible } = this.state;
		return (
			<ScrollView>
                <Text style={styles.paragraph}>
					Datos de la oportunidad
      			</Text>
                <View 
                style={styles.padding}>
                    <TextInput
                        label='Nombre de la oportunidad'
                        value={this.state.nameOpportunity}
                        style={{backgroundColor:'white'}}
                        onChangeText={(nameOpportunity) => this.setState({nameOpportunity})}
                    />
                    <TextInput
                        label='Descripción'
                        multiline={true}
                        numberOfLines={4}
                        style={{backgroundColor:'white'}}
                        onChangeText={(descOpportunity) => this.setState({descOpportunity})}
                        value={this.state.descOpportunity}/>
                    <CheckBox
                        style={styles.checkBox}
                        onClick={()=>{
                        this.setState({
                            digitization:!this.state.digitization
                        })
                        }}
                        isChecked={this.state.digitization}
                        rightText={"Digitalización"}
                    />
                    <CheckBox
                        style={styles.checkBox}
                        onClick={()=>{
                        this.setState({
                            docManager:!this.state.docManager
                        })
                        }}
                        isChecked={this.state.docManager}
                        rightText={"Gestor documental"}
                    />
                    <CheckBox
                        style={styles.checkBox}
                        onClick={()=>{
                        this.setState({
                            hardware:!this.state.hardware
                        })
                        }}
                        isChecked={this.state.hardware}
                        rightText={"Hardware"}
                    />
                    <CheckBox
                        style={styles.checkBox}
                        onClick={()=>{
                        this.setState({
                            automation:!this.state.automation
                        })
                        }}
                        isChecked={this.state.automation}
                        rightText={"Automatización de procesos"}
                    />
                    <Button style={styles.mt15} mode="contained" onPress={this.goStep2} theme={{ dark: true, colors: { primary: '#333366' } }}>
					    Siguiente
				    </Button>
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
	paragraph: {
		marginTop: 24,
		fontSize: 20,
		textAlign: 'center',
		color: '#4e3a59',
	},
	padding: {
		padding: 25,
	},
    textCheckbox:{
        marginTop: 10,
    },
    itemList:{
		borderBottomColor: '#dbdcdd',
		borderBottomWidth: 1,
		borderTopColor: '#f4f6f7',
		borderTopWidth: 1,
		marginBottom: 10,
    },
    mt15:{
        marginTop: 15,
        borderRadius: 20,
        borderWidth: 1,
    },
    checkBox:{
        flex: 1,
        padding: 10,
    }

});