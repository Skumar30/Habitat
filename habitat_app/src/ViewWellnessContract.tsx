import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, Modal, FlatList, Alert, TouchableHighlightBase } from "react-native";
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
          style={{
            flexDirection: "column",
            height: 650,
            width: 410,
            padding: 20
          }}
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
                  source={require('./Assets/backArrow.png')}>
                </Image>
              </TouchableOpacity>
            </View>
              
            <View
              style={{flex:0.9}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 32
                }}>
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
                style={{
                  textAlign: 'left',
                  fontSize: 20,
                  padding: 10
                }}>
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
                  source={require('./Assets/trash.png')}>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
          
          <ScrollView style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
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
          style={{
            flexDirection: "column",
            height: 650,
            width: 410,
            padding: 20
          }}
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
                  source={require('./Assets/backArrow.png')}>
                </Image>
              </TouchableOpacity>
            </View>
              
            <View
              style={{flex:0.9}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontSize: 32
                }}>
                Wellness Contracts
              </Text>
            </View>
          </View>
          
          
          <Text
              style={{
                textAlign: 'left',
                fontSize: 20,
                padding: 10
              }}>
              Their tasks:
          </Text>
          <ScrollView style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
            
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


export default ViewWellnessContract;
