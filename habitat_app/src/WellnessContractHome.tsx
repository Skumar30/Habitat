import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import ViewWellnessContract from "./ViewWellnessContract";

class WellnessContractHome extends Component {

  constructor(props){

    super(props);
    this.state = {
      viewingContract:false,
      viewMyTasks:true,
      hasContract:true,
      leaveModalVisible: false,

      //user task data
      myTasks: [
        {
          id: '1',
          message: 'My task #1',
        },
        {
          id: '2',
          message: 'My task #2',
        },
        {
          id: '3',
          message: 'My task #3',
        },
        {
          id: '4',
          message: 'My task #4',
        },
        {
          id: '5',
          message: 'My task #5',
        },
        {
          id: '6',
          message: 'My task #6',
        },
        {
          id: '7',
          message: 'My task #7',
        },
        {
          id: '8',
          message: 'My task #8',
        },
        {
          id: '9',
          message: 'My task #9',
        }
      ],

      //other user in wellness contract task data
      theirTasks: [

        {
          id: '1',
          message: 'Their task #1',
        },
        {
          id: '2',
          message: 'Their task #2',
        },
        {
          id: '3',
          message: 'Their task #3',
        },
        {
          id: '4',
          message: 'Their task #4',
        },
        {
          id: '5',
          message: 'Their task #5',
        },
        {
          id: '6',
          message: 'Their task #6',
        },
        {
          id: '7',
          message: 'Their task #7',
        },
        {
          id: '8',
          message: 'Their task #8',
        },
        {
          id: '9',
          message: 'Their task #9',
        }
      ],

      //pending contract invitations for the user
      pendingContracts: [


      ],
      currentContractId: {}
    }
  }

  setViewingContract = (val: boolean) => {
    this.setState({viewingContract: val});
  }

  setHasContract = (val: boolean) => {

    this.setState({hasContract: val});
  }

  removeInvitation = (contractId: number) => {

    const newPendingContracts = this.state.pendingContracts.filter(item => item.id !== contractId);
    this.setState({pendingContracts: newPendingContracts});
    Alert.alert("Inviation Reject Confirmation", "Invitation has been rejected.");
  }

  acceptInvitation = (contractId: number) => {

    const newPendingContracts = this.state.pendingContracts.filter(item => item.id !== contractId);
    this.setState({pendingContracts: newPendingContracts});
    Alert.alert("Invitation Accept Confirmation", "Invitation has been accepted.");
  }

  //method which toggles leaveModalVisible
  handleLeaveModalVisible = () => {

    this.setState({leaveModalVisible: !this.state.leaveModalVisible});
  }

  removeContract = async(contractId) => {

    var response = await fetch('http://172.17.59.113:3000/removeContract', {
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
    this.handleLeaveModalVisible();
    Alert.alert("Leave Contract Confirmation", "You have left the current contract.");
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

    this.setState({hasContract: true});
    Alert.alert("New Contract Confirmation", "You have created a new contract.");
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

    console.log("enter");
    if(this.state.hasContract) {

      this.setState({viewingContract: true});
      console.log("should be viewing contract");
    }
    else {

      console.log("should be viewing alert");
      this.setViewingContract(false);
      Alert.alert("No Existing Wellness Contract", "Please create or accept a wellness contract in order to view it.");
    }
  }

  getPendingContracts =async() => {

      const response = await fetch('http://172.17.59.113:3000/getPendingContracts');
      const body = await response.json();
      var pendingContractData = body;
      this.setState({pendingContracts: pendingContractData});
  }

  checkCurrentContract = async() => {

    const response = await fetch('http://172.17.59.113:3000/checkCurrentContract');
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

    var response = await fetch('http://172.17.59.113:3000/updateContracts');
    var contractsToRemove= await response.json(); //gets response body
    console.log(contractsToRemove);
    for(var i = 0; i < contractsToRemove.length; i++) {

      this.removeContract(contractsToRemove[i]);
    }
  }


  componentDidMount(){

    this.getPendingContracts();
    this.checkCurrentContract();
    this.updateContracts();
  }

  render() {

    //if user is viewing their wellness contract
    if(this.state.viewingContract) {

      return(<ViewWellnessContract onBack={this.setViewingContract} currentContractId={this.state.currentContractId}/>);
    }
    else { //if the user is in the wellness contract home screen
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
              <TouchableOpacity onPress={() => this.props.onBack(false)}>
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
                      onPress={() => this.removeContract(this.state.currentContractId)}>
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
                renderItem={({ item }) => <PendingCard owner={item.owner} handleReject={this.removeInvitation} handleAccept={this.acceptInvitation} id={item.id} due_date={item.due_date} />}
              />
          </ScrollView>

        </View>
      );
    }
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
