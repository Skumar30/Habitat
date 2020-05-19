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
        <View style={[styles.header]}>
            <Text style={{fontSize:40}}> Dailies </Text>
        </View>

        <View style={[styles.container]}>

            <ScrollView>
                        <View style={[styles.body]}>
                            <Text style={{fontSize:28}}> Sample Card </Text>
                            <CheckBox
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'

                            />
                        </View>
            </ScrollView>

            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.TouchableOpacityStyle]}>
                <Image
                    source={require ('./DailyComponent/add-trimmy.png') }
                    style={[styles.FloatingButtonStyle]}
                />
            </TouchableOpacity>

        </View>
        </>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#DDDDDD',
  },
  header: {
    flex: 1,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#AAAAAA',
    borderRadius: 6,
    marginVertical: 2,
    marginHorizontal: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  body:{
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#f7bf86',
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },


});

export default DailyScreen;