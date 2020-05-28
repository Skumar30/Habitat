import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import ViewWellnessContract from "./ViewWellnessContract";
import * as Screens from './Screens';
import {IP_ADDRESS} from './App';
class WellnessContractHome extends Component {

  constructor(props){

    super(props);
    this.state = {
      viewMyTasks:true,
      hasContract:true,
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

    this.setState({hasContract: val});
  }

  updateInvites = async() => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/updateInvites?id=${encodeURIComponent(this.state.currentContractId)}`);
    const invitesToRemove = await response.json();

  }

  rejectInvitation = async(contractId) => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/removeContract`, {
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
    this.setState({pendingContracts: newPendingContracts});
    Alert.alert("Inviation Reject Confirmation", "Invitation has been rejected.");
  }

  acceptInvitation = async(contractId) => {

    if(this.state.hasContract) {

      Alert.alert("Exiting Wellness Contract", "Please leave current wellness contract before accepting invitation.");
    }
    else {

      //update hasContract state
      this.setState({hasContract: true});

      //switch pending field from true to false
      fetch(`http://${IP_ADDRESS}:3000/acceptContract`, {
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
          console.log(output);

        });

      //refresh list of pending contracts
      const newPendingContracts = this.state.pendingContracts.filter(item => item.id !== contractId);
      this.setState({pendingContracts: newPendingContracts});

      //update currentContractId
      this.state.currentContractId = contractId;

      //update invitations
      var result1 = await this.updateInvites();
      var result2 = await this.getPendingContracts();

      //call checkCurrentContract
      Alert.alert("Invitation Accept Confirmation", "Invitation has been accepted.");
    }
  }

  //method which toggles leaveModalVisible
  handleLeaveModalVisible = () => {

    this.setState({leaveModalVisible: !this.state.leaveModalVisible});
  }

  handleRemoveConfirm = () => {

    this.removeContract(this.state.currentContractId);
    this.handleLeaveModalVisible();
    Alert.alert("Leave Contract Confirmation", "You have left the current contract.");
  }

  removeContract = async(contractId) => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/removeContract`, {
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

    this.setState({hasContract: false});
    this.setState({currentContractId: null});
  }

  handleRemoveContract = () => {

    if(this.state.hasContract) {

      this.handleLeaveModalVisible();
    }
    else {

      Alert.alert("No Existing Wellness Contract", "You do not have a current contract.");
    }
  }

  createContract = () => {

    //redirect to michael's create contract screen

    this.props.routeTo(Screens.CreateContract, {
        date: new Date(),
        tasks: this.state.myTasks,
        friend: 'Not Selected', friendID:'',
        screen: Screens.CreateContract,
        contractId: this.state.currentContractId
      }
    );
  }

  handleCreateContract = () => {

    if(this.state.hasContract) {

      Alert.alert("Existing Wellness Contract","You are already in a wellness contract. Please leave the current contract before creating a new one.");
    }
    else {

      this.createContract();
    }
  }

  handleViewContract = () => {

    if(this.state.hasContract) {

      //redirect screen
      this.props.routeTo(Screens.ViewWellnessContract, {currentContractId: this.state.currentContractId});
    }
    else {

      Alert.alert("No Existing Wellness Contract", "Please create or accept a wellness contract in order to view it.");
    }
  }

  getPendingContracts =async() => {

      const response = await fetch(`http://${IP_ADDRESS}:3000/getPendingContracts`);
      const body = await response.json();
      var pendingContractData = body;
      console.log(pendingContractData);
      this.setState({pendingContracts: pendingContractData});
  }

  checkCurrentContract = async() => {

    const response = await fetch(`http://${IP_ADDRESS}:3000/checkCurrentContract`);
    const body = await response.json();
    if(body.length > 0) {
      this.setState({hasContract: true});
      this.setState({currentContractId: body[0]})
      console.log(this.state.currentContractId);
    }
    else
      this.setState({hasContract: false});
  }

  updateContracts = async() => {

    var response = await fetch(`http://${IP_ADDRESS}:3000/updateContracts`, {
      method: 'POST'
    });
  }


  componentDidMount = async() =>{

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
            backgroundColor: 'blanchedalmond',
            flexDirection: 'row'
          }}
        >
          {/* back button to get out of wellness contract home screen */}
          <View
            style={{flex:0.1}}>
            <TouchableOpacity onPress={() => this.props.routeTo(Screens.Home)}>
              <Image
                source={require('./assets/backsmall.png')}>
              </Image>
            </TouchableOpacity>
          </View>

          <View
            style={{flex:0.9}}>
            <Text
              style={styles.titleText}>
              Wellness Contracts
            </Text>
          </View>
        </View>


        {/* View which holds top three buttons */}
        <View
          style={{
            flexDirection:"row",
            width: 370,
            height: 150
          }}>

          {/* button which allows user to view existing wellness contract */}
          <TouchableOpacity onPress={this.handleViewContract}>
            <View
              style={styles.iconButtonContainer}
            >
              <Image
                style={{
                  flex: 1
                }}
                source={require('./assets/view.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          {/* button which allows user to leave existing wellness contract */}
          <TouchableOpacity onPress={this.handleRemoveContract}>
            <View
              style={styles.iconButtonContainer}
            >

              <Image
                style={{
                  flex: 1
                }}
                source={require('./assets/leave.png')}
              >
              </Image>

            </View>
          </TouchableOpacity>

          {/* Modal for confirming leave current wellness contract */}
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.leaveModalVisible}
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
                  style={styles.popupModalContainer}
                >
                  <Text
                    style={{
                      fontSize: 20
                    }}>
                      Are you sure you want to leave the current wellness contract?
                  </Text>
                  <Button
                    title="Leave contract"
                    onPress={this.handleRemoveConfirm}>
                  </Button>
                  <Button
                    title="Cancel"
                    onPress={this.handleLeaveModalVisible}>
                  </Button>
                </View>
            </View>
          </Modal>

          {/* button which allows user to create new wellness contract */}
          <TouchableOpacity onPress={this.handleCreateContract}>
            <View
              style={styles.iconButtonContainer}
            >

              <Image
                style={{
                  flex: 1
                }}
                source={require('./assets/create.png')}
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
    height: 650,
    width: 410,
    padding: 20,
    backgroundColor: 'blanchedalmond'
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
    width:125,
    height:150,
    borderWidth: 5,
  },

  popupModalScreen: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  popupModalContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#CCCCCC',
    width: 300,
    height: 200
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
    flex:0.3,
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
    flex:0.15,
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
    height:35,
    width:35
  }
});

export default WellnessContractHome;
