import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import * as Screens from './Screens';

interface State {
  logoutModal: boolean
}

export default class Settings extends React.Component<{}, State> {

  constructor(props) {
    super(props);
    this.state = { logoutModal: false }
  }

  toggleModal(visible: boolean) {
    this.setState({ logoutModal: visible })
  }

  render() {

    return (
      <>
        <View
          style={{
            height: 60,
            backgroundColor: '#485EEC',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.logoutModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Are you sure you want to logout?</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    this.toggleModal(!this.state.logoutModal);
                    this.props.routeTo(Screens.Login)
                  }}
                >
                  <Text style={styles.modalButton}>Yes</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{ ...styles.openButton, marginTop: 10 }}
                  onPress={() => {
                    this.toggleModal(!this.state.logoutModal);
                  }}
                >
                  <Text style={styles.modalButton}>No</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>


          <View
            style={{ paddingRight: 380, flex: 0.1 }}>
            <TouchableOpacity onPress={() => this.props.routeTo(Screens.Home)}>
              <Image
                source={require('./assets/backsmall.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Settings</Text>
        </View>
        <View style={styles.buttonGroup}>
          <SafeAreaView>
            <TouchableHighlight
              style={{
                ...styles.buttonStyle,
                marginVertical: 30
              }}
              onPress={() => this.props.routeTo(Screens.ChangePassword)}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={() => this.toggleModal(true)}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableHighlight>
          </SafeAreaView>
        </View>
      </>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: '#0094FF',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonSpacing: {
    paddingVertical: 20,
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: '#485EEC',
    borderRadius: 7,
    paddingHorizontal: 80,
    paddingVertical: 12,
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    alignItems: 'center',
    backgroundColor: '#0094FF',
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    paddingHorizontal: 80,
    paddingVertical: 12,
    elevation: 2
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center"
  },
  modalButton: {
    color: 'white',
    textAlign: "center"
  }
});