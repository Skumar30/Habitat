import React, {Component} from 'react';
import {
    Platform,
    Animated,
    TouchableOpacity,
    Button,
    UIManager, FlatList,
} from 'react-native';
import * as Screens from './Screens';
import TaskCard from "./TaskCard";
var mongoose = require('mongoose');

class Test extends Component {

    getTest = async() => {
        console.log('enter method');
        try {
            const response = await fetch('http://10.0.1.48:3000/test');
            const body = await response.json();
            console.log('help meee');
            console.log(body);
        } catch (e) {
            console.log(e)
        }
    }
        render() {
            return (
                    <Button onPress = {this.getTest} title="test">  </Button>
            );
        }
}

export default Test;