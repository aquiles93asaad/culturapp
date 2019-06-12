import React from 'react';
import {
	View,
	StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import CheckBox from 'react-native-check-box'

export class SaleOpportunityScreen2 extends React.Component {
	// static navigationOptions = {
	// 	title: 'Generar oportunidad',
    // };
    
    state = {
        text: '',
        digitization: false,
        docManager: false,
        hardware: false,
        automation: false,
    }

	goStep2 = () => {
        this.props.navigation.navigate('SaleOpportunity3');
    };

	render() {
		return (
			<ScrollView>
                <Text style={styles.paragraph}>
					Datos de la oportunidad
      			</Text>
                <View 
                style={styles.padding}>
                    <TextInput
                        label='Nombre de la oportunidad'
                        value={this.state.text}
                        style={{backgroundColor:'white'}}
                        onChangeText={text => this.setState({ text })}
                    />
                    <TextInput
                        label='Descripción'
                        multiline={true}
                        numberOfLines={4}
                        style={{backgroundColor:'white'}}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}/>
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