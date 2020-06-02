import React, { useState, Component } from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import ViewWellnessContract from "./ViewWellnessContract";
import * as Screens from './Screens';
import { IP_ADDRESS } from './IP_Address';
class WellnessContractHome extends Component {

  constructor(props) {

    super(props);
    this.state = {
      viewMyTasks: true,
      hasContract: true,
      leaveModalVisible: false,

      //user task data
      myTasks: [],

      //other user in wellness contract task data
      theirTasks: [],

      //pending contract invitations for the user
      pendingContracts: [],
      currentContractId: {}
    }
  }

  setHasContract = (val: boolean) => {

    this.setState({ hasContract: val });
  }

  updateInvites = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/updateInvites?id=${encodeURIComponent(this.state.currentContractId)}`);
    const invitesToRemove = await response.json();

  }

  rejectInvitation = async (contractId) => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/removeContract`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: contractId
      })
    });

    const newPendingContracts = this.state.pendingContracts.filter(item => item.id !== contractId);
    this.setState({ pendingContracts: newPendingContracts });
    Alert.alert("Inviation Reject Confirmation",
      "Invitation has been rejected.",
      [{ text: "Cancel", style: "cancel" }]);
  }

  acceptInvitation = async (contractId) => {

    if (this.state.hasContract) {

      Alert.alert("Exiting Wellness Contract",
        "Please leave current wellness contract before accepting invitation.",
        [{ text: "Cancel", style: "cancel" }]);
    }
    else {

      //update hasContract state
      this.setState({ hasContract: true });

      //switch pending field from true to false
      fetch(`http://${IP_ADDRESS}:3000/wellnessContract/acceptContract`, {
        method: 'POST',
        headers: {
          Accept: 'application/json', //expects a JSON
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contractId: contractId
        })
      })
        .then((response) => response.json()) //gets response body
        .then((output) => {

        });

      //refresh list of pending contracts
      const newPendingContracts = this.state.pendingContracts.filter(item => item.id !== contractId);
      this.setState({ pendingContracts: newPendingContracts });

      //update currentContractId
      this.state.currentContractId = contractId;

      //update invitations
      var result1 = await this.updateInvites();
      var result2 = await this.getPendingContracts();

      //call checkCurrentContract
      Alert.alert("Invitation Accept Confirmation",
        "Invitation has been accepted.",
        [{ text: "Cancel", style: "cancel" }]);
    }
  }

  //method which toggles leaveModalVisible
  handleLeaveModalVisible = () => {

    this.setState({ leaveModalVisible: !this.state.leaveModalVisible });
  }

  handleRemoveConfirm = () => {

    this.removeContract(this.state.currentContractId);
    this.handleLeaveModalVisible();
    Alert.alert("Leave Contract Confirmation",
      "You have left the current contract.",
      [{ text: "Cancel", style: "cancel" }]);
  }

  removeContract = async (contractId) => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/removeContract`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: contractId
      })
    });

    var result = await response.json(); //gets response body

    this.setState({ hasContract: false });
    this.setState({ currentContractId: null });
  }

  handleRemoveContract = () => {

    if (this.state.hasContract) {

      this.handleLeaveModalVisible();
    }
    else {

      Alert.alert("No Existing Wellness Contract",
        "You do not have a current contract.",
        [{ text: "Cancel", style: "cancel" }]);
    }
  }

  createContract = () => {

    //redirect to michael's create contract screen
    this.props.routeTo(Screens.CreateContract, { date: new Date(), tasks: [], friend: 'Not Selected', friendID: '', post: false });
  }

  handleCreateContract = () => {

    if (this.state.hasContract) {

      Alert.alert("Existing Wellness Contract",
        "You are already in a wellness contract. Please leave the current contract before creating a new one.",
        [{ text: "Cancel", style: "cancel" }]);
    }
    else {

      this.createContract();
    }
  }

  handleViewContract = () => {

    if (this.state.hasContract) {

      //redirect screen
      this.props.routeTo(Screens.ViewWellnessContract, { currentContractId: this.state.currentContractId });
    }
    else {

      Alert.alert("No Existing Wellness Contract",
        "Please wait for an invited user to accept the contract or accept a wellness contract invitation in order to view it.",
        [{ text: "Cancel", style: "cancel" }]);
    }
  }

  getPendingContracts = async () => {

    const response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/getPendingContracts`);
    const body = await response.json();
    var pendingContractData = body;
    this.setState({ pendingContracts: pendingContractData });
  }

  checkCurrentContract = async () => {

    const response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/checkCurrentContract`);
    const body = await response.json();
    if (body.length > 0) {
      this.setState({ hasContract: true });
      this.setState({ currentContractId: body[0] })
    }
    else
      this.setState({ hasContract: false });
  }

  updateContracts = async () => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/updateContracts`, {
      method: 'POST'
    });
  }


  componentDidMount = async () => {

    //first thing is update contracts which still apply to the user
    var result1 = await this.updateContracts();

    //get pending contracts which are still valid
    var result2 = await this.getPendingContracts();

    //to see if the user is currently in a contract
    var result3 = await this.checkCurrentContract();
  }

  render() {

    return (
      <View
        style={styles.entireScreenContainer}
      >
        <View
          style={{
            height: 100,
            backgroundColor: 'rgb(235, 150, 90)',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 4,
            flexDirection: 'row',
            paddingHorizontal: 15
          }}>
          {/* back button to get out of wellness contract home screen */}
          <View
            style={{ flex: 1, alignSelf: 'center' }}>
            <TouchableOpacity style={styles.backButton} onPress={() => this.props.routeTo(Screens.Home)}>
              <Image style={{ width: 50, height: 50, borderRadius: 25 }}
                source={require('./assets/back.png')}>
              </Image>
            </TouchableOpacity>
          </View>

          <Text style={styles.screenTitle}>Wellness Contract</Text>
        </View>


        {/* View which holds top three buttons */}
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            // width: 370,
            // height: 150,
            // margin: 19
          }}>

          {/* button which allows user to view existing wellness contract */}
          <TouchableOpacity onPress={this.handleViewContract} style={styles.iconButtonContainer}>
            {/* <View
              
            > */}
            <Image
              style={{ borderRadius: 15, height: 132, width: 107 }}
              source={require('./assets/view.png')}
            >
            </Image>

            {/* </View> */}
          </TouchableOpacity>

          {/* button which allows user to leave existing wellness contract */}
          <TouchableOpacity onPress={this.handleRemoveContract}>
            <View
              style={styles.iconButtonContainer}
            >

              <Image
                style={{ borderRadius: 15, height: 132, width: 107 }}
                source={require('./assets/leave.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          {/* Modal for confirming leave current wellness contract */}
          <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.leaveModalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Are you sure you want to leave the current wellness contract?</Text>
              <View style={styles.buttonSeparation}>
                <TouchableOpacity style={[styles.confirmationButton, { backgroundColor: '#556' }]}
                  onPress={this.handleLeaveModalVisible}>
                  <Text style={styles.modalButton}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                  onPress={this.handleRemoveConfirm}>
                  <Text style={styles.modalButton}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* button which allows user to create new wellness contract */}
          <TouchableOpacity onPress={this.handleCreateContract}>
            <View
              style={styles.iconButtonContainer}
            >

              <Image
                style={{ borderRadius: 15, height: 132, width: 107 }}
                source={require('./assets/create.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 18,
            paddingTop: 10
          }}>
          PENDING WELLNESS CONTRACTS:
        </Text>
        <ScrollView>
          <FlatList
            data={this.state.pendingContracts}
            renderItem={({ item }) => <PendingCard owner={item.owner} handleReject={this.rejectInvitation} handleAccept={this.acceptInvitation} id={item.id} due_date={item.due_date} />}
          />
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  entireScreenContainer: {
    flexDirection: "column",
    height: 900,
    // width: 410,
    // padding: 20,
    backgroundColor: 'blanchedalmond',
    alignItems: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32
  },

  subtitleText: {
    textAlign: 'left',
    fontSize: 20,
    padding: 10
  },

  iconButtonContainer: {
    width: 115,
    height: 140,
    borderWidth: 4,
    borderRadius: 15,
    margin: 8
  },

  popupModalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  popupModalContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#CCCCCC',
    width: 300,
    height: 130
  },

  scrollViewStyle: {
    flexDirection: "column",
    backgroundColor: "#DDDDDD"
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 5,
    flexDirection: 'row',
    margin: 5
  },

  cardTextContainer: {
    flex: 0.7,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },

  taskCardCheckboxContainer: {
    flex: 0.3,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },

  taskCardInteract: {
    alignSelf: 'center',
    width: 30,
    height: 30,
    margin: 6
  },

  pendingCardInteractContainer: {
    flex: 0.15,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },

  pendingCardInteract: {
    height: 35,
    width: 35,
    margin: 5
  },

  pendingCardImage: {
    height: 35,
    width: 35
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
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 5,
    flex: 3.7
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
});

export default WellnessContractHome;
