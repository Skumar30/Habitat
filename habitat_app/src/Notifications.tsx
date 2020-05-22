import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  Alert,
  TouchableOpacity,
  Image
} from 'react-native';
import Settings from './Settings';

export default class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEnabled: true
    };
  }

  toggleSwitch = (val: boolean) => {
    this.setState({ isEnabled: !val });
    /*
    if (this.state.isEnabled) {
      Alert.alert('Notifications are now disabled. Insert logic here.');
    }
    else {
      Alert.alert('Notifications are now enabled. Insert logic here.');
    }
    */
  }

  render() {
    return (
      <>
        <View style={{
          height: 60,
          backgroundColor: '#485EEC',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View
            style={{ flex: 0.1 }}>
            <TouchableOpacity onPress={() => this.props.onBack(false)}>
              <Image
                source={require('./assets/backsmall.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Notifications</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.buttonText}>Enable Push Notifications </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isEnabled ? "#77E2FF" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            //onValueChange={this.toggleSwitch(this.state.isEnabled)} TODO
            value={this.state.isEnabled}
          />
        </View>
        
      </>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0094FF',
    flexDirection: 'row',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20
  },
  buttonSpacing: {
    paddingTop: 70,
    paddingBottom: 70,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0094FF',
  },
  TO: {
    backgroundColor: '#485EEC',
    height: 45,
    width: 300,
    borderRadius: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});