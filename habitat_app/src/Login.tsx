/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Image, 
  Dimensions,
  TextInput
} from 'react-native';

import  CustomButton  from './components/button';

declare const global: {HermesInternal: null | {}};

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 1 / 4);
const imageWidth = dimensions.width;


export default class Login extends React.Component {
  render(){
    return (
      <>
      <View style={styles.container}>
        <View>
          <Image source={require('./assets/bear.jpg')} style={styles.bearImage}/>
          {/*<Text style={styles.header}>Log-In</Text>*/}
          <TextInput 
            underlineColorAndroid={'transparent'} placeholder="Username"
            style={styles.input} placeholderTextColor={'black'} />
          <TextInput 
            underlineColorAndroid={'transparent'} placeholder="Password"
            style={styles.input} placeholderTextColor={'black'} secureTextEntry={true}/>
          <View style={styles.buttonGroup}>
            <CustomButton text="Submit" />
            <CustomButton text="Sign-up"/>
          </View>
        </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#0094FF',
  },
  bearImage: { 
    height: imageHeight, 
    width: imageWidth, 
    marginTop:70, 
    marginBottom: 50 }
  ,
  header: {
    fontFamily: 'italic',
    fontSize: 80,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  input: {
    borderWidth: 3,
    borderColor: "#000000",
    padding: 8,
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 18,
  },
  buttonGroup: {
   flexDirection: 'row',
   justifyContent: 'space-around'
  }
});

