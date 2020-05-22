import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';

export default class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      reEntered: ""
    };
  }

  //temporary fix
  onTextInput = (val: string, stateID: number) => {
    if (stateID == 0) {
      this.setState({ oldPassword: val });
    }
    else if (stateID == 1) {
      this.setState({ newPassword: val });
    }
    else {
      this.setState({ reEntered: val });
    }

  };

  render() {
    return (
      <>
        <View style={{
          height: 60,
          backgroundColor: '#485EEC',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 0.1
        }}>
          <View
            style={{ flex: 0.1 }}>
            <TouchableOpacity onPress={() => this.props.onBack(false)}>
              <Image
                source={require('./assets/backsmall.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Change Password</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Enter Old Password</Text>
          <TextInput
            style={styles.textInput}
            //onChangeText={this.state.oldPassword => onChangeText(this.state.oldPassword)}
            value={this.state.oldPassword} />
          <Text style={styles.textStyle}>Enter New Password</Text>
          <TextInput
            style={styles.textInput}
            //onChangeText={text2 => onChangeText(text2)}
            value={this.state.newPassword} />
          <Text style={styles.textStyle}>Re-Enter New Password</Text>
          <TextInput
            style={styles.textInput}
            //onChangeText={text3 => onChangeText(text3)}
            value={this.state.reEntered} />
          <Text style={styles.textStyle}></Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => Alert.alert('Password Change logic here.')}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    flexDirection: 'column',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20
  },
  textInput: {
    height: 50,
    width: 300,
    borderRadius: 7,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 21
  },
  buttonStyle: {
    backgroundColor: '#485EEC',
    height: 45,
    width: 250,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },

});