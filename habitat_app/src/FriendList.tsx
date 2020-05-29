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
  Image,
} from 'react-native';
import { create } from 'react-test-renderer';
import * as Screens from './Screens';
import {IP_ADDRESS} from './IP_Address'
class temp {
  constructor(key: string, name: string, username: string) {}
}

class FriendList extends Component{
  
  constructor(props: any) {
    super(props);
  }

  state = {
    addModalVisible: false,
    friendModalVis: false,
    currFriend: temp,
    arrayHolder: [],
    textInput_Holder: '',
    invalidCode: false,
    existingFriend: false,
    data: []
  };


  onEnterCode = (input: string) => {
    this.setState({ textInput_Holder: input });
    this.setState({invalidCode: false});
    this.setState({existingFriend: false});
  }

  codeInList = (code: string) => {
    if (this.state.data.find(element => element.username === code)) {
      return true;
    } else {
      return false;
    }
  }

  addFriend = async () => {

    if (this.codeInList(this.state.textInput_Holder)) {
      this.setState({existingFriend: true});
      return;
    }
    else if (this.state.textInput_Holder.length == 0) {
      return;
    }

    console.log(this.state.textInput_Holder)
    const friendUsername = this.state.textInput_Holder
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_username: friendUsername
      }) 
    }
    
    try {
      const response = await fetch(`http://${IP_ADDRESS}/addFriend`, settings);
      console.log("Responce" + response)

      const friendData = await response.json();

      if (friendData == null) {
        this.setState({invalidCode: true});
        return
      }

      var dataArr = this.state.data;
      dataArr.push( {key: friendData._id, name: friendData.name, username: friendData.username} )
      this.setState({data: dataArr})

      this.setState({textInput_Holder: ''});
      this.setState({addModalVisible:false});

    } catch (e) {
      console.log(e);
    }
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
                <Text style={styles.modalText}>Add Friends!</Text>
              </View>

              <View style={styles.centerThis}>
              {this.state.invalidCode && <Text style={{color:'red'}}>Invalid Username</Text>}
              </View>

              <View style={styles.centerThis}>
              {this.state.existingFriend && <Text style={{color:'red'}}>Friend Already Added</Text>}
              </View>

              <View style={{...styles.centerThis}}>
              <TextInput
                style={styles.inputTxt}
                placeholder="Enter Friend Username"
                onChangeText={input => this.onEnterCode(input)}
              />
              </View>
              
              <View style={styles.buttonSeparation}>
                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "white" }}
                    onPress={() => {
                      this.setState({addModalVisible:false});
                      this.setState({invalidCode: false});
                      this.setState({existingFriend: false});
                    }}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "white" }}
                    onPress={this.addFriend}
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

  viewFriend = async (friend: any) => {
    console.log("key: " + friend.key)
    
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_id: friend.key
      })
    }

    try {
      const response = await fetch(`http://${IP_ADDRESS}/getFriendData`, settings);

      console.log("Responce " + response)

      const friendData = await response.json();
      console.log("friendProfData: " + friendData);
      
      //this.setState({friendModalVis:false});

    } catch (e) {
      console.log("ERROR: " + e);
    }
  }

  removeFriend = async (friend: any) => {
  
    const settings = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friend_id: friend.key
      })
    }
    
    try {
      await fetch(`http://${IP_ADDRESS}/deleteFriend`, settings);

      const index = this.state.data.indexOf(friend);
      console.log("Index: " + index)
      var dataArr = this.state.data

      dataArr = dataArr.filter(pair => pair != friend);

      //dataArr.splice(index, 1);
      this.setState({data: dataArr});
      this.setState({friendModalVis:false});

    } catch (e) {
      console.log("ERROR: " + e);
    }
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
                      onPress={() => this.viewFriend(this.state.currFriend)}
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

  componentDidMount() {
    this.createFriendList();
  }

  createFriendList() {
    this.getFriends().then(res => {

      //    res -> data
      var friendData: { key: any; name: any; }[] = [];
      res.forEach((element: { _id: any; name: any; username: any}) => {
        var temp = {key: element._id, name: element.name, username: element.username}
        friendData.push(temp)
      });

      this.setState({data: friendData});
      console.log(this.state.data);
    });
  }

  getFriends = async () => {
    const response = await fetch(`http://${IP_ADDRESS}/friends`);
    return await response.json();
  }

  render(){
      return (
        <>
          <SafeAreaView>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>

                <View style={styles.fixToText}>
                  <View style={{flex:0}}>
                    <TouchableOpacity 
                    onPress={() => this.props.routeTo(Screens.Home)}>
                      <Image
                        source={require('./assets/backsmall.png')}>
                      </Image>
                    </TouchableOpacity>
                  </View>
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
                data={this.state.data} 
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
    //fontFamily: '',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 15,
    fontSize: 17,
    fontWeight: '400',
    //fontFamily: ''
  },

  centerText: {
    textAlign: 'center',
    //fontFamily: ""
  },

  emptyMessageStyle: {
    textAlign: 'center',
    fontSize: 28,
    marginTop: '50%',
    //fontFamily: ''
  },
  textBox: {
    //fontFamily: ''
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
    //fontFamily: ''
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 25,
    //fontFamily: ''
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
    //fontFamily: 'serif',
  },

  centerThis: {
    alignSelf: 'center',

  },
  
});