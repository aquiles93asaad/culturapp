import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  Alert,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    let data = [{
      value: 'Santander Rio',
    }, {
      value: 'BBVA',
    }, {
      value: 'Galicia',
    }];
    return (
      // <ScrollView style={styles.container}>
      //   {/* Go ahead and delete ExpoLinksView and replace it with your
      //      * content, we just wanted to provide you with some helpful links */}
      //   <ExpoLinksView />
      // </ScrollView>
      <View style={styles.container}>
      <Text style={styles.paragraph}>
        Datos del potencial cliente
      </Text>
      <Dropdown
        label='Nombre de la empresa *'
        data={data}
        containerStyle={styles.picker}
      />
      {/* <Button
        onPress={this.onItemPressed}
        title="Siguiente"
        color="#4e3a59"
        accessibilityLabel="Learn more about this purple button"
      /> */}
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
  add:{
    marginTop: 15,
    fontSize:60,
    color: '#4e3a59',
  },
  steps:{
    marginTop: 15,
    marginBottom: 15,
  }
});
