/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
/*
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
*/
import React, {useState, Component} from "react";
import { View, Text, Button } from "react-native";

class ViewWellnessContract extends Component {

  constructor(props){

    super(props);
    this.state = {hasWellnessContract:false}
  }

  createWellnessContract = () => {

    this.setState({hasWellnessContract:true});
  }

  render() {

    if(this.state.hasWellnessContract) {

      return (
        <View
          style={{
            flexDirection: "column",
            height: 650,
            width: 410,
            padding: 20
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              fontSize: 32
            }}>
            Wellness Contracts
          </Text>
          <View style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                padding: 10
              }}>
              Your tasks
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                padding: 10
              }}>
              Your task #1
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                padding: 10
              }}>
              Your task #2
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                padding: 10
              }}>
              Your task #3
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                padding: 10
              }}>
              Your task #4
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 16,
                padding: 10
              }}>
              Your task #5
            </Text>
          </View>
          <Button title="View their tasks"></Button>
        </View>
      );
    }
    else {
      return (
        <View
          style={{
            flexDirection: "column",
            height: 650,
            width: 410,
            padding: 20
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              fontSize: 32
            }}>
            Wellness Contracts
          </Text>
          <Button 
            title="Create a wellness contract"
            onPress={this.createWellnessContract}></Button>
        </View>
      );
    }
  }
}


export default ViewWellnessContract;