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
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";

class ViewWellnessContract extends Component {

  constructor(props){

    super(props);
    this.state = {hasWellnessContract:false, viewYourTasks:true}
  }

  createWellnessContract = () => {

    this.setState({hasWellnessContract:true});
  }

  leaveWellnessContract = () => {

    this.setState({hasWellnessContract:false});
  }

  toggleViewYourTasks = () => {

    this.setState({viewYourTasks: !this.state.viewYourTasks});
  }

  render() {

    if(this.state.hasWellnessContract) {

      if(this.state.viewYourTasks) {
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
            <Text
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  padding: 10
                }}>
                Your tasks:
              </Text>
            <ScrollView style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
              <TaskCard message="Your task #1"/>
              <TaskCard message="Your task #2"/>
              <TaskCard message="Your task #3"/>
              <TaskCard message="Your task #4"/>
              <TaskCard message="Your task #5"/>
              <TaskCard message="Your task #6"/>
              <TaskCard message="Your task #7"/>
              <TaskCard message="Your task #8"/>
              <TaskCard message="Your task #9"/>
              <TaskCard message="Your task #10"/>
            </ScrollView>
            <Button
              title="View their tasks"
              onPress={this.toggleViewYourTasks}></Button>
            <Button
              title="Back"
              onPress={this.leaveWellnessContract}></Button>
          </View>
        );
      }
      else{

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
            <Text
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  padding: 10
                }}>
                Their tasks:
              </Text>
            <ScrollView style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
              <TaskCard message="Their task #1"/>
              <TaskCard message="Their task #2"/>
              <TaskCard message="Their task #3"/>
              <TaskCard message="Their task #4"/>
              <TaskCard message="Their task #5"/>
              <TaskCard message="Their task #6"/>
              <TaskCard message="Their task #7"/>
              <TaskCard message="Their task #8"/>
              <TaskCard message="Their task #9"/>
              <TaskCard message="Their task #10"/>
            </ScrollView>
            <Button
              title="View your tasks"
              onPress={this.toggleViewYourTasks}></Button>
            <Button
              title="Back"
              onPress={this.leaveWellnessContract}></Button>
          </View>
        );
      }
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
          <View
            style={{
              flexDirection:"row",
              width: 370,
              height: 150
            }}>
            <TouchableOpacity onPress={this.createWellnessContract}>
              <View
                style={{
                  width:125,
                  height:150,
                  borderColor: '#DDDDDD',
                  borderWidth: 5
                }}>
                  
                  <Image 
                    style={{
                      flex: 1
                    }}
                    source={require('./Assets/view.png')}
                  >
                  </Image>
              
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width:125,
                  height:150,
                  borderColor: '#DDDDDD',
                  borderWidth: 5
                }}>
                  
                  <Image 
                    style={{
                      flex: 1
                    }}
                    source={require('./Assets/leave.png')}
                  >
                  </Image>
              
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  width:125,
                  height:150,
                  borderColor: '#DDDDDD',
                  borderWidth: 5
                }}>
                  
                  <Image 
                    style={{
                      flex: 1
                    }}
                    source={require('./Assets/create.png')}
                  >
                  </Image>
              
              </View>
            </TouchableOpacity>
          </View>
          
          <Text 
            style={{
              fontSize: 16
            }}>
            Pending wellness contracts:
          </Text>
          <ScrollView>
            <PendingCard message='Pending Wellness Contract #1'/>
            <PendingCard message='Pending Wellness Contract #2'/>
            <PendingCard message='Pending Wellness Contract #3'/>
            <PendingCard message='Pending Wellness Contract #4'/>
            <PendingCard message='Pending Wellness Contract #5'/>
            <PendingCard message='Pending Wellness Contract #6'/>  
          </ScrollView>
  
        </View>
      );
    }
  }
}


export default ViewWellnessContract;

/*
            <TouchableOpacity
              style={{
                height: 35,
                width: 35
              }}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/checkmark.png')}>
              </Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35
              }}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/x.png')}>
              </Image>
            </TouchableOpacity>
            */