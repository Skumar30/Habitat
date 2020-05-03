import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, CheckBox, TouchableHighlightBase, TabBarIOS, Modal } from "react-native";

class TaskCard extends Component {

  constructor(props){

    super(props);
    this.state = {isSelected: false, deleteTaskModalVisible:false}
  }

  checkboxHandler = () => {

    this.setState({isSelected: !this.state.isSelected});
  }

  handleSelect = () => {

    if(this.props.deleteMode) {

      //highlight the task
      Alert.alert("Exit Delete Mode", "Please exit delete mode in order to delete a task.");
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
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 4,
                borderColor: '#CCCCCC',
                flexDirection: 'row',
                margin: 5
            }}>
              
              <View
                style={{
                  flex: 0.7,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center'
                }}>
                <Text style={{textAlign: 'center', fontSize: 24}}>
                  {this.props.message}
                </Text>
              </View>
              <View
                style={{
                  flex:0.3,
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center'
                }}>
                <TouchableOpacity
                  style={{
                    alignSelf: "center"
                  }}
                  onPress={this.handleDeleteTaskModalVisible}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      margin: 6
                    }}
                    source={require('./Assets/x.png')}>
  
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
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderWidth: 4,
                            borderColor: '#CCCCCC',
                            width: 300,
                            height: 200
                          }}>
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
              style={{
                backgroundColor: '#FFFFFF',
                borderWidth: 4,
                borderColor: '#CCCCCC',
                flexDirection: 'row',
                margin: 5
            }}>
              
              <View
                style={{
                  flex: 0.7,
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center'
                }}>
                <Text style={{textAlign: 'center', fontSize: 24}}>
                  {this.props.message}
                </Text>
              </View>
              <View
                style={{
                  flex:0.3,
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center'
                }}>
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
    }
    else {
      
      return(

        <TouchableWithoutFeedback onPress={this.handleSelect}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 4,
              borderColor: '#CCCCCC',
              flexDirection: 'row',
              margin: 5
          }}>
            
            <View
              style={{
                flex: 0.7,
                backgroundColor: '#FFFFFF',
                justifyContent: 'center'
              }}>
              <Text style={{textAlign: 'center', fontSize: 24}}>
                {this.props.message}
              </Text>
            </View>
            <View
                style={{
                  flex:0.3,
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'center'
                }}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 30,
                    height: 30,
                    margin: 6
                  }}
                  source={require('./Assets/checkmark.png')}>

                </Image>
              </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
          
}


export default TaskCard;
