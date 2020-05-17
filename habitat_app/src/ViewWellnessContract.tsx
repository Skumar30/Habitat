import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase, StyleSheet } from "react-native";
import PendingCard from "./PendingCard";
import TaskCard from "./TaskCard";
import { createConfigItem } from "@babel/core";

class ViewWellnessContract extends Component {

  constructor(props){

    super(props);
    this.state = {
 
      viewMyTasks:true,
      deleteMode:false,
      deleteTaskModalVisible: false,
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
      ]
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

  deleteTask = (taskId: number) => {

    const newMyTasks = this.state.myTasks.filter(item => item.id !== taskId);
    this.setState({myTasks: newMyTasks});
    Alert.alert("Task Delete Confirmation", "Task has been deleted.");
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
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            {/* back button to get out of wellness contract home screen */}
            <View
              style={{flex:0.1}}>
              <TouchableOpacity onPress={() => this.props.onBack(false)}>
                <Image
                  source={require('./assets/backArrow.png')}>
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
                onPress={this.toggleDeleteMode}>
                <Image
                  source={require('./assets/trash.png')}>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView 
            style={styles.scrollViewStyle}
          >
            <FlatList
              data={this.state.myTasks}
              renderItem={({ item, index }) => <TaskCard message={item.message} deleteMode={this.state.deleteMode} viewMyTasks={this.state.viewMyTasks} id={item.id} handleDeleteTask={this.deleteTask} />}
            />
          </ScrollView>
          <Button
            title="View their tasks"
            onPress={this.toggleViewMyTasks}></Button>
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
              backgroundColor: 'white',
              flexDirection: 'row'
            }}
          >
            {/* back button to get out of wellness contract home screen */}
            <View
              style={{flex:0.1}}>
              <TouchableOpacity onPress={() => this.props.onBack(false)}>
                <Image
                  source={require('./assets/backArrow.png')}>
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
              renderItem={({ item, index }) => <TaskCard message={item.message} deleteMode={this.state.deleteMode} viewMyTasks={this.state.viewMyTasks} />}
            />
          </ScrollView>
          <Button
            title="View my tasks"
            onPress={this.toggleViewMyTasks}></Button>
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
    padding: 20
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
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
    borderColor: '#DDDDDD',
    borderWidth: 5
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
    borderWidth: 4,
    borderColor: '#CCCCCC',
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
