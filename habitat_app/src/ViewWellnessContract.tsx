import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import { createConfigItem } from "@babel/core";
import * as Screens from './Screens';
import {IP_ADDRESS} from './IP_Address';
class ViewWellnessContract extends Component {

  constructor(props){

    super(props);
    this.state = {

      viewMyTasks:true,
      deleteMode:false,
      deleteTaskModalVisible: false,
      //user task data
      myTasks: [],

      //other user in wellness contract task data
      theirTasks: []
    }
  }

  toggleViewMyTasks = () => {

    //if we are about to switch away from viewing user's own tasks
    if(this.state.viewMyTasks) {

      this.setState({deleteMode: false});
    }

    this.setState({viewMyTasks: !this.state.viewMyTasks});
  }

  toggleDeleteMode = () => {

    this.setState({deleteMode: !this.state.deleteMode});
  }

  getMyTasks = async() => {

    fetch(`http://${IP_ADDRESS}:3000/wellnessContract/getMyTasks?id=${encodeURIComponent(this.props.props.currentContractId)}`)
      .then((response) => response.json()) //gets response body
      .then((output) => {
        this.setState({myTasks: output});
      });

      return true;
  }

  getTheirTasks = async() => {

    fetch(`http://${IP_ADDRESS}:3000/wellnessContract/getTheirTasks?id=${encodeURIComponent(this.props.props.currentContractId)}`)
      .then((response) => response.json()) //gets response body
      .then((output) => {
        this.setState({theirTasks: output});
      });

      return true;
  }

  updateTasks = async() => {

    console.log("props contractId is: " + this.props.props.currentContractId);
    var response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/updateTasks`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: this.props.props.currentContractId
      })
    });

    return true;
  }

  componentDidMount = async() =>  {

    console.log("current contractId is: " + this.props.props.currentContractId);
    //update list of tasks
    this.updateTasks().then(result => {
      this.getMyTasks();
      this.getTheirTasks();
    });

  }

  render() {

    //if user is viewing their wellness contract
    if(this.state.viewMyTasks) {
      return (
        <View
          style={styles.entireScreenContainer}
        >
          <View
            style={{
              backgroundColor: 'blanchedalmond',
              flexDirection: 'row',
            }}
          >
            {/* back button to get out of wellness contract home screen */}
            <View
              style={{flex:0.15}}>
              <TouchableOpacity onPress={() => this.props.routeTo(Screens.WellnessContractHome)}>
                <Image
                  source={require('./assets/backsmall.png')}>
                </Image>
              </TouchableOpacity>
            </View>

            <View
              style={{flex:0.9}}>
              <Text
                style={styles.titleText}
              >
                Wellness Contracts
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row'
            }}>
            <View
              style={{
                flex: 0.9
              }}>
              <Text
                style={styles.subtitleText}
              >
                My tasks:
              </Text>
            </View>
          </View>

          <ScrollView
            style={styles.scrollViewStyle}
          >
            <FlatList
              data={this.state.myTasks}
              renderItem={({ item, index }) =>
                <TaskCard task={item}
                  viewMyTasks={this.state.viewMyTasks}
                  currentContractId={this.props.props.currentContractId}
                  routeTo = {this.props.routeTo}
                />
              }
            />
          </ScrollView>
          <View style={{borderWidth: 5, backgroundColor: 'powderblue', borderRadius: 50, alignContent: 'center'}}>
            <TouchableOpacity onPress={() => {
              var taskIds = [];
              for(var i = 0; i < this.state.myTasks.length; i++) {

                taskIds.push(this.state.myTasks[i]._id);
              }
              console.log("this.state.myTasks: " + this.state.myTasks);
              console.log("taskIds: " + taskIds);
              this.props.routeTo(Screens.EditWellnessContract, {
                  date: new Date(),
                  tasks: taskIds,
                  friend: 'Not Selected',
                  friendID:'',
                  screen: Screens.ViewWellnessContract,
                  contractId: this.props.props.currentContractId,
                  post: true
                }
              );}} style={{alignContent: 'center'}}>
              <Text style={{alignContent: 'center', fontSize: 20, textAlign: 'center'}}>
                Edit Contract
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{borderWidth: 5, backgroundColor: 'powderblue', borderRadius: 50, alignContent: 'center'}}>
            <TouchableOpacity onPress={this.toggleViewMyTasks} style={{alignContent: 'center'}}>
              <Text style={{alignContent: 'center', fontSize: 20, textAlign: 'center'}}>
                View Their Tasks
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
    else{

      return (
        <View
          style={styles.entireScreenContainer}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'blanchedalmond'
            }}
          >
            {/* back button to get out of wellness contract home screen */}
            <View
              style={{flex:0.15, backgroundColor: 'blanchedalmond'}}>
              <TouchableOpacity onPress={() => this.props.routeTo(Screens.WellnessContractHome)}>
                <Image
                  source={require('./assets/backsmall.png')}>
                </Image>
              </TouchableOpacity>
            </View>

            <View
              style={{flex:0.9, backgroundColor: 'blanchedalmond'}}>
              <Text
                style={styles.titleText}
              >
                Wellness Contracts
              </Text>
            </View>
          </View>


          <Text
              style={styles.subtitleText}
          >
            Their tasks:
          </Text>
          <ScrollView
            style={styles.scrollViewStyle}
          >

            <FlatList
              data={this.state.theirTasks}
              renderItem={({ item, index }) =>
                <TaskCard
                  task={item}
                  viewMyTasks={this.state.viewMyTasks}
                  currentContractId={this.props.props.currentContractId}
                  routeTo={this.props.routeTo}
                />
              }
            />
          </ScrollView>
          <View style={{borderWidth: 5, backgroundColor: 'powderblue', borderRadius: 50, alignContent: 'center'}}>
            <TouchableOpacity onPress={() => {
              var taskIds = [];
              for(var i = 0; i < this.state.myTasks.length; i++) {

                taskIds.push(this.state.myTasks[i]._id);
              }
              console.log("passing contractId: " + this.props.props.currentContractId);
              this.props.routeTo(Screens.EditWellnessContract, {
                  date: new Date(),
                  tasks: taskIds,
                  friend: 'Not Selected',
                  friendID:'',
                  screen: Screens.ViewWellnessContract,
                  contractId: this.props.props.currentContractId,
                  post: true
                }
              );}} style={{alignContent: 'center'}}>
              <Text style={{alignContent: 'center', fontSize: 20, textAlign: 'center'}}>
                Edit Contract
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{borderWidth: 5, backgroundColor: 'powderblue', borderRadius: 50, alignContent: 'center'}}>
            <TouchableOpacity onPress={this.toggleViewMyTasks} style={{alignContent: 'center'}}>
              <Text style={{alignContent: 'center', fontSize: 20, textAlign: 'center'}}>
                View My Tasks
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }


}

const styles = StyleSheet.create({
  entireScreenContainer: {
    flexDirection: "column",
    backgroundColor: 'blanchedalmond',
    height: 660,
    width: 410,
    padding: 20
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
    borderWidth: 5
  },

  popupModalScreen: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blanchedalmond'
  },

  popupModalContainer: {
    backgroundColor: 'blanchedalmond',
    borderWidth: 5,
    width: 300,
    height: 130
  },

  scrollViewStyle: {
    flexDirection: "column",
    backgroundColor: "blanchedalmond"
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

export default ViewWellnessContract;
