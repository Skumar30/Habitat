import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  CheckBox,
  Header,
  ScrollView,
  Container,
  Card,
  CardItem,
  Platform,
  Animated,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export class DailyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] }
    }


    render() {

        return (
        <>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={[styles.header]}>
              <Text style={styles.textBox}>Dailies</Text>
          </View>
          <View style={[styles.container]}>
              <ScrollView style={{flex: 1}}>
                <View style={[styles.body]}>
                    <Text style={styles.card}> Sample Card </Text>
                    <CheckBox checkedIcon='dot-circle-o' uncheckedIcon='circle-o'/>
                </View>
              </ScrollView>
              <View style={{flex: 0.2, flexDirection: 'row'}}>
                <View style={{flex: 8}}></View>
                <View style={{flex: 2, borderWidth: 5, margin: 5}}>
                  <TouchableOpacity style={{flex: 3}}>
                    <Image source={require ('./assets/plus.png') } style={styles.TouchableOpacityStyle}/>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </View>
        </>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: 'blanchedalmond',

  },
    textBox: {
        fontSize:40,
        fontFamily: "serif",
    },
    card: {
        fontSize:25,
        fontFamily: "serif",
    },
  header: {
    flex: 1,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#b4ecb4',
    borderWidth: 5
  },

  body:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: '#000000',
    borderWidth: 5
  },

TouchableOpacityStyle: {
  flex: 1,
  resizeMode: 'stretch',
  width: 'auto',
  height: 'auto'
}


});

export default DailyScreen;