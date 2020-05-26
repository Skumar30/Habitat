import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import { createConfigItem } from "@babel/core";
import * as Screens from './Screens';

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

  removeTask = async(taskId) => {

    var response = await fetch('http://172.17.59.113:3000/removeTask', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId: taskId,
        contractId: this.props.props.currentContractId
      })
    });

    var result = await response.json(); //gets response body

    const newMyTasks = this.state.myTasks.filter(item => item.id !== taskId);
    this.setState({myTasks: newMyTasks});
  }

  getMyTasks = async() => {

    fetch(`http://172.17.59.113:3000/getMyTasks?id=${encodeURIComponent(this.props.props.currentContractId)}`)
      .then((response) => response.json()) //gets response body
      .then((output) => {
        this.setState({myTasks: output});
      });

  }

  getTheirTasks = async() => {

    fetch(`http://172.17.59.113:3000/getTheirTasks?id=${encodeURIComponent(this.props.props.currentContractId)}`)
      .then((response) => response.json()) //gets response body
      .then((output) => {
        this.setState({theirTasks: output});
      });

  }

  updateTasks = async() => {

    var response = await fetch('http://172.17.59.113:3000/updateTasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractId: this.props.props.currentContractId
      })
    });
    
    var tasksToRemove= await response.json(); //gets response body

    for(var i = 0; i < tasksToRemove.length; i++) {

      this.removeTask(tasksToRemove[i]);
    }
  }

  componentDidMount(){

    //update list of tasks
    this.updateTasks();

    //
    this.getMyTasks();
    this.getTheirTasks();
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
              style={{flex:0.1}}>
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
            <View
              style={{
                flex: 0.1,
                alignContent: 'center',
                justifyContent: 'center'
              }}>
              <TouchableOpacity
                onPress={this.toggleDeleteMode} style={{borderWidth: 4}}>
                <Image
                  source={require('./assets/delete.png')}>
                </Image>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={styles.scrollViewStyle}
          >
            <FlatList
              data={this.state.myTasks}
              renderItem={({ item, index }) =>
                <TaskCard title={item.title} due_date={item.due_date} deleteMode={this.state.deleteMode}
                  viewMyTasks={this.state.viewMyTasks} id={item.id} handleDeleteTask={this.deleteTask}
                  currentContractId={this.props.props.currentContractId}
                />
              }
            />
          </ScrollView>
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
                  title={item.title} due_date={item.due_date} deleteMode={this.state.deleteMode} viewMyTasks={this.state.viewMyTasks}
                />
              }
            />
          </ScrollView>
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
    height: 650,
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
    height: 200
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
