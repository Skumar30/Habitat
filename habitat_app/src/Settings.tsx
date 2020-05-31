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
            height: 100,
            backgroundColor: 'rgb(250, 225, 125)',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 4,
            flexDirection: 'row',
            paddingHorizontal: 15
          }}>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.logoutModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to logout?</Text>
              <View style={styles.buttonSeparation}>
                <TouchableOpacity
                  style={[styles.confirmationButton, { backgroundColor: '#556' }]}
                  onPress={() => {
                    this.toggleModal(!this.state.logoutModal);
                  }}
                >
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                  onPress={() => {
                    this.toggleModal(!this.state.logoutModal);
                    this.props.routeTo(Screens.Login)
                  }}
                >
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>

              </View>
            </View>
            {/* </View> */}
          </Modal>


          <View style={{ alignSelf: 'center', flex: 1, }}>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.routeTo(Screens.Home)}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }}
                source={require('./assets/back.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.screenTitle}>Settings</Text>
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
    backgroundColor: 'blanchedalmond',
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
    backgroundColor: 'slategray',
    borderRadius: 50,
    paddingHorizontal: 80,
    paddingVertical: 12,
    elevation: 5,
    borderWidth: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    alignItems: 'center',
    backgroundColor: 'blanchedalmond',
    flex: 1,
  },
  modalView: {
    margin: 20,
    marginTop: 230,
    width: 375,
    backgroundColor: 'white',
    borderWidth: 4,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    shadowColor: 'black',
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
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  modalButton: {
    color: 'white',
    textAlign: "center",
    fontSize: 16,
    fontWeight: '500'
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(110, 192, 178)',
    borderRadius: 15,
    borderWidth: 4,
    height: 60,
    width: 60,
  },
  screenTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 5,
    flex: 2.1
  },
  confirmationButton: {
    borderRadius: 60,
    marginTop: 20,
    height: 50,
    width: 90,
    elevation: 2,
    justifyContent: 'center',
    borderWidth: 3
  },
  buttonSeparation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },

});