import React, { Component, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import { create } from 'react-test-renderer';


class temp {
  constructor(name: string, key: string) {}
}

class FriendList extends Component{

  state = {
    addModalVisible: false,
    friendModalVis: false,
    currFriend: temp,
    arrayHolder: [],
    textInput_Holder: '',
    invalidCode: false,
  };

  dummy = [
    {
      key: '910',
      name: 'Alex',
    },
    {
      key: '5678',
      name: 'Darin',
    },
    {
      key: '1234',
      name: 'Evan',
    },
  ];

  data: temp[] = [];

  findName (code: string): any {
    return this.dummy.find(data => data.key === code);
  }; 

  joinData = () => {

    let friend: any = (this.findName(this.state.textInput_Holder));

    if (friend == undefined && this.state.textInput_Holder != '') {
      this.setState({invalidCode: true});
    }

    else if (this.state.textInput_Holder != ''){
      
      this.data.push({key: this.state.textInput_Holder, name: friend.name});
      
      this.setState({ arrayHolder: [...this.data] });

      this.setState({textInput_Holder: ''});
      this.setState({addModalVisible:false});
    }
  }

  onEnterCode = (input: string) => {
    this.setState({ textInput_Holder: input });
    this.setState({invalidCode: false});
  }

  renderAddForm = () => {

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.addModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View>
                <Text style={styles.modalText}>Add Friend!</Text>
              </View>

              <View style={styles.centerThis}>
              {this.state.invalidCode && <Text style={{color:'red'}}>Invalid Friend Code</Text>}
              </View>

              <View style={{...styles.centerThis}}>
              <TextInput
                style={styles.inputTxt}
                placeholder="Enter Friend Code"
                onChangeText={input => this.onEnterCode(input)}
              />
              </View>
              
              <View style={styles.buttonSeparation}>
                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "white" }}
                    onPress={() => {
                      this.setState({addModalVisible:false});
                    }}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "white" }}
                    onPress={this.joinData}
                  >
                    <Text style={styles.textStyle}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </Modal>

      </View>
    );
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  renderFriendForm = () => {
    return(
      <View>  
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.friendModalVis}
        >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View>
                  <Text style={styles.modalText}>{this.state.currFriend.name}</Text>
                </View>
                
                <View style={styles.buttonSeparation}>

                  <View>
                    <TouchableOpacity
                      style={{...styles.addButton}}
                      onPress={() => {
                        this.removeFriend(this.state.currFriend)
                      }}
                    >
                      <Text style={styles.textStyle}>Remove Friend</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={{...styles.addButton}}
                      //onPress={}
                    >
                      <Text style={styles.textStyle}>View Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.centerThis}>
                  <TouchableOpacity
                    style={{
                      ...styles.addButton,
                      width: 100,}}
                    onPress={() => {
                      this.setState({friendModalVis:false});
                    }}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
        </Modal>
      </View>
    );
  }

  onFriendPress = (friend: any) => {
    this.setState({friendModalVis: true, currFriend: friend});
  }

  removeFriend = (friend: temp) => {
    
    const index = this.data.indexOf(friend);
    this.data.splice(index, 1);
    this.setState({friendModalVis:false});
  }

  render(){
      return (
        <>
          <SafeAreaView>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>

                <View style={styles.fixToText}>

                  <Text style={styles.sectionTitle}>Friends List</Text>
                  <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.setState({addModalVisible: true}) }
                    >
                      <Text style={styles.textBox}>Add Friend</Text>
                  </TouchableOpacity>

                </View>
                <Text style={styles.sectionDescription}>
                  See who you will work with next:
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <View style={styles.container}>
              <FlatList
                data={this.data}
                renderItem={({item}) => 
                <TouchableOpacity onPress={() => this.onFriendPress(item)}>  
                  <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
                }
                ItemSeparatorComponent = {this.FlatListItemSeparator}
                ListEmptyComponent = {() => (<Text style={styles.emptyMessageStyle}>Add Some Friends!</Text>)}
              />
          </View>

          {this.state.addModalVisible && this.renderAddForm()}
          {this.state.friendModalVis && this.renderFriendForm()}
        </>

      );
  }
}

export default FriendList;

const styles = StyleSheet.create({

  container: {
   flex: 1,
   paddingTop: 15,
   paddingLeft: 15,
   paddingRight: 15,
   backgroundColor: 'blanchedalmond',
   borderWidth: 5,
   borderTopWidth: 0
  },
  item: {
    padding: 5,
    fontSize: 28,
    height: 44,
  },

  button: {
    backgroundColor: "#b4ecb4",
    borderWidth: 5,
    padding: 10,
    borderRadius: 20,

  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  body: {
    backgroundColor: 'mistyrose',
    borderWidth: 5
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 24,
    paddingRight: 10,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: 'serif',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 15,
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'serif'
  },

  centerText: {
    textAlign: 'center',
      fontFamily: "serif"
  },

  emptyMessageStyle: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: '50%',
    fontFamily: 'serif'
  },
  textBox: {
    fontFamily: 'serif'
  },


// MODAL STYLE
centeredView: {
    flex: 1,
    marginTop: 45,
  },
  modalView: {
    margin: 20,
    width: 375,
    backgroundColor: "blanchedalmond",
    borderRadius: 20,
    borderWidth: 5,
    padding: 35,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: 'serif'
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 25,
    fontFamily: 'serif'
  },

  buttonSeparation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },

  inputTxt: {
    height: 35, 
    width: 200, 
    borderColor: 'black', 
    borderWidth: 5, 
    borderRadius: 5, 
    margin: 10, 
    textAlign: 'center',
    fontFamily: 'serif',
  },

  centerThis: {
    alignSelf: 'center',

  },
  
});