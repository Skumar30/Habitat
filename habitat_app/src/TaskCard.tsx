import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, CheckBox, TouchableHighlightBase, TabBarIOS, Modal, StyleSheet } from "react-native";
import {IP_ADDRESS} from './IP_Address';
import * as Screens from "./Screens";
class TaskCard extends Component {

  constructor(props){

    super(props);
    this.state = {isSelected: false}
  }

  addReward = async() => {


    fetch(`http://${IP_ADDRESS}:3000/wellnessContract/addReward`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        contractId: this.props.currentContractId,
        taskId: this.props.task._id
      })
    })
      .then((response) => response.json()) //gets response body
      .then((output) => {

      });
  }

  removeReward = async() => {

    fetch(`http://${IP_ADDRESS}:3000/wellnessContract/removeReward`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        contractId: this.props.currentContractId,
        taskId: this.props.task._id
      })
    })
      .then((response) => response.json()) //gets response body
      .then((output) => {

      });
  }

  checkboxHandler = () => {

    //if user is unmarking the task as complete
    if(this.state.isSelected) {

      this.removeReward();
    }
    else { //if user is marking task as complete

      this.addReward();
    }

    this.setState({isSelected: !this.state.isSelected});
  }

  handleSelect = () => {

    //present task info
    var title = this.props.task.title;
    var frequency = this.props.task.frequency;
    var date = new Date(this.props.task.due_date);
    this.props.routeTo(Screens.EditTask, {screen: Screens.WellnessContractHome, data: {title: title, due_date: date, frequency: frequency}});
  }

  isDone = async() => {

    const response = await fetch(`http://${IP_ADDRESS}:3000/wellnessContract/isDone?id=${encodeURIComponent(this.props.task._id)}`);
    const body = await response.json();

    this.setState({isSelected: body.done});
  }

  dueDateString = (due_date) => {

    var temp = new Date(due_date);
    const daysOfWeek = ["Nan", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ["Nan", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"];
    var formatted = daysOfWeek[temp.getDay()] + ", " + monthsOfYear[temp.getMonth()] + " " + temp.getDate();


    return formatted;
  }

  componentDidMount() {

    this.isDone();
  }

  render() {

    if(this.props.viewMyTasks){

      return(

        <TouchableWithoutFeedback onPress={this.handleSelect}>
          <View
            style={styles.cardContainer}
          >

            <View
              style={styles.cardTextContainer}
            >
              <Text style={{textAlign: 'center', fontSize: 24}}>
                {this.props.task.title}
              </Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Due: {this.dueDateString(this.props.task.due_date)}
              </Text>

            </View>
            <View
              style={styles.taskCardCheckboxContainer}
            >
              <CheckBox
                style={{
                  alignSelf: 'center',
                  margin: 5
                }}
                value={this.state.isSelected}
                onValueChange={this.checkboxHandler}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    else {

      return(

        <TouchableWithoutFeedback>
          <View
            style={styles.cardContainer}
          >

            <View
              style={styles.cardTextContainer}
            >
              <Text style={{textAlign: 'center', fontSize: 24}}>
                {this.props.task.title}
              </Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Due: {this.dueDateString(this.props.task.due_date)}
              </Text>
            </View>
            <View
              style={styles.taskCardCheckboxContainer}
            >
              <CheckBox
                style={{
                  alignSelf: 'center',
                  margin: 5
                }}
                value={this.state.isSelected}
                disabled={true}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    backgroundColor: "#DDDDDD"
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 5,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10
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
    margin: 6,
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

export default TaskCard;
