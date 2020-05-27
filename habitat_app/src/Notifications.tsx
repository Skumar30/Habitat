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
import * as Screens from './Screens';

interface State {
  isEnabled: boolean;
  setIsEnabled: any;
}

export default class Notifications extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
    }
  }

  toggleSwitch = (value: boolean) => {
    this.setState({ isEnabled: value });
    console.log('Notifications Enabled:' + value)
    if (value === true) {
      Alert.alert("You have enabled notifications.");
    }
    else {
      Alert.alert("You have disabled notifications.")
    }
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
            style={{
              paddingRight: 365,
              flex: 0.1
            }}>
            <TouchableOpacity onPress={() => this.props.routeTo(Screens.Settings)}>
              <Image
                source={require('./assets/backArrowTransparent.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Notifications</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.buttonText}>Enable Push Notifications </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={this.state.isEnabled ? "#77E2FF" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
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
  title: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
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