import React from 'react';
import {
	View,
	StyleSheet,
    Text,
    ScrollView,
} from 'react-native';
import { TextInput, Checkbox, Button } from 'react-native-paper';

export class SaleOpportunityScreen2 extends React.Component {
	static navigationOptions = {
		title: 'Generar oportunidad',
    };
    
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
                    <View style={styles.flexDirectionColumn}>
                        <View style={styles.flexDirectionRow}>
                            <Checkbox
                                status={this.state.digitization ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ digitization: !this.state.digitization }); }}
                            />
                            <Text style={styles.textCheckbox}> Digitalización</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <Checkbox
                                status={this.state.docManager ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ docManager: !this.state.docManager }); }}
                            />
                            <Text style={styles.textCheckbox}> Gestor documental</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <Checkbox
                                status={this.state.hardware ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ hardware: !this.state.hardware }); }}
                            />
                            <Text style={styles.textCheckbox}> Hardware</Text>
                        </View>
                        <View style={styles.flexDirectionRow}>
                            <Checkbox
                                status={this.state.automation ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ automation: !this.state.automation }); }}
                            />
                            <Text style={styles.textCheckbox}> Automatización de procesos</Text>
                        </View>
                    </View>
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
    },
    flexDirectionRow:{
        flexDirection: 'row'
    },
    flexDirectionColumn:{
        flexDirection: 'column'
    }
});