import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, CheckBox, TouchableHighlightBase, TabBarIOS, Modal, StyleSheet } from "react-native";

class TaskCard extends Component {

  constructor(props){

    super(props);
    this.state = {isSelected: false, deleteTaskModalVisible:false}
  }

  addReward = async() => {

    console.log("contractId is: " + this.props.currentContractId);
    fetch('http://172.17.59.113:3000/addReward', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        contractId: this.props.currentContractId,
        taskId: this.props.id
      })
    })
      .then((response) => response.json()) //gets response body
      .then((output) => {
        console.log(output);
      });
  }

  removeReward = async() => {

    fetch('http://172.17.59.113:3000/removeReward', {
      method: 'POST'
    })
      .then((response) => response.json()) //gets response body
      .then((output) => {
        console.log(output);

      });
  }

  checkboxHandler = () => {

    //if user is marking the task as complete
    if(this.state.isSelected) {

      this.removeReward();
    }
    else { //if user is unmarking task as complete

      this.addReward();
    }

    this.setState({isSelected: !this.state.isSelected});
  }

  handleSelect = () => {

    if(this.props.deleteMode) {

      //cannot edit task if in delete mode
      Alert.alert("Exit Delete Mode", "Please exit delete mode in order to edit a task.");
    }
    else {

      //present task info
      Alert.alert("Task title", "Task Description");
    }
  }

  handleDeleteTaskModalVisible = () => {

    this.setState({deleteTaskModalVisible: !this.state.deleteTaskModalVisible})
  }

  render() {

    if(this.props.viewMyTasks){

      if(this.props.deleteMode) {

        return(

          <TouchableWithoutFeedback onPress={this.handleSelect}>
            <View
              style={styles.cardContainer}
            >

              <View
                style={styles.cardTextContainer}
              >
                <Text style={{textAlign: 'center', fontSize: 24}}>
                  {this.props.title}
                </Text>
              </View>
              <View
                style={styles.taskCardCheckboxContainer}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: "center"
                  }}
                  onPress={this.handleDeleteTaskModalVisible}>
                  <Image
                    style={styles.taskCardInteract}
                    source={require('./assets/x.png')}>

                  </Image>
                </TouchableOpacity>

                {/* Modal for confirming delete task */}
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={this.state.deleteTaskModalVisible}
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
                              Are you sure you want to delete this task?
                          </Text>
                          <Button
                            title="Delete task"
                            onPress={() => this.props.handleDeleteTask(this.props.id)}>
                          </Button>
                          <Button
                            title="Cancel"
                            onPress={this.handleDeleteTaskModalVisible}>
                          </Button>
                        </View>
                    </View>
                  </Modal>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }
      else {

        return(

          <TouchableWithoutFeedback onPress={this.handleSelect}>
            <View
              style={styles.cardContainer}
            >

              <View
                style={styles.cardTextContainer}
              >
                <Text style={{textAlign: 'center', fontSize: 24}}>
                  {this.props.title}
                </Text>
                <Text style={{textAlign: 'center', fontSize: 18}}>
                  Due: {this.props.due_date}
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
                  checked={this.state.isSelected}
                  onValueChange={this.checkboxHandler}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      }
    }
    else {

      return(

        <TouchableWithoutFeedback onPress={this.handleSelect}>
          <View
            style={styles.cardContainer}
          >

            <View
              style={styles.cardTextContainer}
            >
              <Text style={{textAlign: 'center', fontSize: 24}}>
                {this.props.title}
              </Text>
            </View>
            <View
              style={styles.taskCardCheckboxContainer}
            >
              <Image
                style={styles.taskCardInteract}
                source={require('./assets/checkmark.png')}>
              </Image>
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
