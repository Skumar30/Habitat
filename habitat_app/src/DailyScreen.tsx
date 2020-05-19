<<<<<<< HEAD
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
            <Text style={styles.textBox}> Dailies </Text>
        </View>

        <View style={[styles.container]}>

            <ScrollView>
                        <View style={[styles.body]}>
                            <Text style={styles.card}> Sample Card </Text>
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
    backgroundColor: '#aaeeff',

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
    backgroundColor: '#7799FF',
  },

  body:{
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    marginVertical: 20,
    marginHorizontal: 20,
      borderColor: '#000000',
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

=======
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

class DailyScreen extends Component {
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
              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, borderWidth: 5, borderLeftWidth: 0}}>
                  <Image source={require ('./assets/back.png') } style={styles.TouchableOpacityStyle}/>
                </TouchableOpacity>
                <View style={{flex: 4, opacity: 0}}>
                </View>
                <TouchableOpacity style={{flex: 1, borderWidth: 5, borderRightWidth: 0}}>
                  <Image source={require ('./assets/plus.png') } style={styles.TouchableOpacityStyle}/>
                </TouchableOpacity>
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
    borderWidth: 5,
    borderTopWidth: 0
  },
    textBox: {
        fontSize:40,
        fontFamily: "serif",
    },
    card: {
        fontSize:30,
        fontFamily: "serif",
    },
  header: {
    flex: 1,
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
    borderWidth: 5,
    flexDirection: 'row'
  },

TouchableOpacityStyle: {
  flex: 1,
  resizeMode: 'stretch',
  width: 'auto',
  height: 'auto'
}


});

>>>>>>> 2c63460c046f8698b0dae5bdba4c3adb18170385
export default DailyScreen;