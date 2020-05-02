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
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, Modal } from "react-native";

class PendingCard extends Component {

  constructor(props){

    super(props);

    //acceptModalVisible and rejectModalVisible initialized to false
    this.state = {acceptModalVisible: false, rejectModalVisible: false};
  }

  //method which toggles acceptModalVisible
  handleAcceptModalVisible = () => {

    this.setState({acceptModalVisible: !this.state.acceptModalVisible});
  }

  //method which toggles rejectModalVisible
  handleRejectModalVisible = () => {

    this.setState({rejectModalVisible: !this.state.rejectModalVisible});
  }

  render() {

    return(

      <TouchableWithoutFeedback onPress={() => alert("popup with wellness contract info")}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 4,
            borderColor: '#CCCCCC',
            flexDirection: 'row',
            margin: 5
        }}>
          
          {/* View for pending contract title */}
          <View
            style={{
              flex: 0.7,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>
              {this.props.message}
            </Text>
          </View>
          
          {/* View for checkmark region */}
          <View
            style={{
              flex:0.15,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                margin: 5
              }}
              onPress={this.handleAcceptModalVisible}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/checkmark.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          
          {/* View for x mark region */}
          <View
            style={{
              flex:0.15,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                margin: 5
              }}
              onPress={this.handleRejectModalVisible}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/x.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          
          {/* Modal for confirming accept invitation */}
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.acceptModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 4,
                    borderColor: '#CCCCCC',
                    width: 300,
                    height: 200
                  }}>
                  <Text
                    style={{
                      fontSize: 20
                    }}>
                      Are you sure you want to accept the invitation?
                  </Text>
                  <Button
                    title="Accept Invitation"
                    onPress={this.handleAcceptModalVisible}>
                  </Button>
                  <Button
                    title="Cancel"
                    onPress={this.handleAcceptModalVisible}>
                  </Button>
                </View>
            </View>
          </Modal>

          {/* Modal for confirming reject invitation */}
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.rejectModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderWidth: 4,
                    borderColor: '#CCCCCC',
                    width: 300,
                    height: 200
                  }}>
                  <Text
                    style={{
                      fontSize: 20
                    }}>
                      Are you sure you want to reject the invitation?
                  </Text>
                  <Button
                    title="Reject Invitation"
                    onPress={this.handleRejectModalVisible}>
                  </Button>
                  <Button
                    title="Cancel"
                    onPress={this.handleRejectModalVisible}>
                  </Button>
                </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
      
    );
  }
          
}


export default PendingCard;
