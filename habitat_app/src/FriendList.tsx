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
import { IP_ADDRESS } from './IP_Address'
class temp {
  constructor(key: string, name: string, username: string) { }
}

class FriendList extends Component {

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
    data: [],
    user_username: '',
    friendingSelf: false,
  };


  onEnterCode = (input: string) => {
    this.setState({ textInput_Holder: input });
    this.setState({ invalidCode: false });
    this.setState({ existingFriend: false });
    this.setState({ friendingSelf: false });
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
      this.setState({ existingFriend: true });
      return;
    }
    else if (this.state.textInput_Holder == this.state.user_username) {
      this.setState({friendingSelf: true});
      return
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
      const response = await fetch(`http://${IP_ADDRESS}:3000/friends/addFriend`, settings);
      console.log("Responce" + response)

      const friendData = await response.json();

      if (friendData == null) {
        this.setState({ invalidCode: true });
        return
      }

      var dataArr = this.state.data;
      dataArr.push({ key: friendData._id, name: friendData.name, username: friendData.username })
      this.setState({ data: dataArr })

      this.setState({ textInput_Holder: '' });
      this.setState({ addModalVisible: false });

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
                <Text style={[styles.modalText, { fontSize: 22, fontWeight: '500' }]}>Enter Friend Username</Text>
              </View>

              <View style={styles.centerThis}>
                {this.state.invalidCode && <Text style={{ color: 'red' }}>Invalid Username</Text>}
              </View>

              <View style={styles.centerThis}>
                {this.state.existingFriend && <Text style={{ color: 'red' }}>Friend Already Added</Text>}
              </View>

              <View style={styles.centerThis}>
              {this.state.friendingSelf && <Text style={{color:'red'}}>You Cannot Add Yourself</Text>}
              </View>

              <View style={{ ...styles.centerThis }}>
                <TextInput
                  style={styles.inputTxt}
                  placeholder= "Username"
                  onChangeText={input => this.onEnterCode(input)}
                />
              </View>

              <View style={styles.buttonSeparation}>
                <View>
                  <TouchableOpacity
                    style={{ ...styles.addButton, backgroundColor: '#556' }}
                    onPress={() => {
                      this.setState({ addModalVisible: false });
                      this.setState({ invalidCode: false });
                      this.setState({ existingFriend: false });
                      this.setState({ friendingSelf: false });
                    }}
                  >
                    <Text style={styles.textStyle}>CANCEL</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={{ ...styles.addButton, backgroundColor: 'slategray' }}
                    onPress={this.addFriend}
                  >
                    <Text style={styles.textStyle}>ADD</Text>
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
      const response = await fetch(`http://${IP_ADDRESS}:3000/friends/getFriendData`, settings);

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
      await fetch(`http://${IP_ADDRESS}:3000/friends/deleteFriend`, settings);

      const index = this.state.data.indexOf(friend);
      console.log("Index: " + index)
      var dataArr = this.state.data

      dataArr = dataArr.filter(pair => pair != friend);

      //dataArr.splice(index, 1);
      this.setState({ data: dataArr });
      this.setState({ friendModalVis: false });

    } catch (e) {
      console.log("ERROR: " + e);
    }
  }


  renderFriendForm = () => {
    return (
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
                    style={{ ...styles.addButton }}
                    onPress={() => {
                      this.removeFriend(this.state.currFriend)
                    }}
                  >
                    <Text style={styles.textStyle}>REMOVE FRIEND</Text>
                  </TouchableOpacity>
                </View>

                {/*<View>
                  <TouchableOpacity
                    style={{ ...styles.addButton }}
                    onPress={() => this.viewFriend(this.state.currFriend)}
                  >
                    <Text style={styles.textStyle}>VIEW PROFILE</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.centerThis}>*/}
                <TouchableOpacity
                  style={{
                    ...styles.addButton,
                    width: 100,
                  }}
                  onPress={() => {
                    this.setState({ friendModalVis: false });
                  }}
                >
                  <Text style={styles.textStyle}>CANCEL</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }

  onFriendPress = (friend: any) => {
    this.setState({ friendModalVis: true, currFriend: friend });
  }

  componentDidMount() {
    this.createFriendList();
    this.getUsername();
  }

  createFriendList() {
    this.getFriends().then(res => {

      //    res -> data
      var friendData: { key: any; name: any; }[] = [];
      res.forEach((element: { _id: any; name: any; username: any }) => {
        var temp = { key: element._id, name: element.name, username: element.username }
        friendData.push(temp)
      });

      this.setState({ data: friendData });
      console.log(this.state.data);
    });
  }

  getFriends = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/friends/friends`);
    return await response.json();
  }

  getUsername = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/friends/getUsername`)

    console.log("RESPONSE: " + response);
    var userName = await response.json();

    console.log("USERNAME: " + userName);
    this.setState({ user_username: userName })

  }

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.header}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => this.props.routeTo(Screens.Home)} style={styles.backButton}>
                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./assets/back.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.screenTitle}>Friends</Text>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TouchableOpacity style={[styles.backButton, { backgroundColor: 'rgb(176, 239, 179)' }]} onPress={() => this.setState({ addModalVisible: true })}>
                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./assets/plus.png')} />
              </TouchableOpacity>
            </View>

          </View>


        </SafeAreaView>

        <View style={styles.container}>
          <Text style={{ ...styles.sectionDescription, marginBottom: 10, marginTop: 2 }}>
            YOUR USERNAME:  <Text style={{ fontSize: 19, fontWeight: "bold" }}>{this.state.user_username}</Text>
          </Text>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this.onFriendPress(item)} style={styles.itemOpacity}>
                <Text style={styles.item}>{item.name}</Text>
              </TouchableOpacity>
            }
            // ItemSeparatorComponent={this.FlatListItemSeparator}
            ListEmptyComponent={() => (<Text style={styles.emptyMessageStyle}>Add Some Friends!</Text>)}
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
    // backgroundColor: 'rgb(255, 230, 230)',
    backgroundColor: 'blanchedalmond',
    // borderWidth: 5,
    borderTopWidth: 0,
    alignItems: 'center'
  },
  item: {
    paddingLeft: 15,
    paddingTop: 6,
    fontSize: 24,
    height: 44,
    fontWeight: '500'
  },

  button: {
    backgroundColor: "#b4ecb4",
    borderWidth: 4,
    padding: 10,
    borderRadius: 20,

  },

  header: {
    zIndex: 3,
    flexDirection: 'row',
    borderBottomWidth: 4,
    // backgroundColor: '#c27a86',
    backgroundColor: 'rgb(225, 155, 160)',
    paddingHorizontal: 15,
    height: 100,
  },
  sectionContainer: {
    marginTop: 15,
    paddingHorizontal: 24,
    paddingRight: 10,
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
    marginTop: 110,
    width: 375,
    //backgroundColor: 'rgb(255, 230, 230)',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 4,
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
    borderRadius: 60,
    marginTop: 20,
    height: 50,
    width: 90,
    elevation: 2,
    justifyContent: 'center',
    borderWidth: 3,
    backgroundColor: 'slategray'
  },
  textStyle: {
    fontWeight: "500",
    textAlign: "center",
    fontSize: 16,
    color: 'white'
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
    borderWidth: 3,
    borderRadius: 10,
    padding: 5,
    textAlign: 'left',
    backgroundColor: 'white',
    paddingLeft: 10,
    //fontFamily: 'serif',
  },

  centerThis: {
    alignSelf: 'center',

  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(110, 192, 178)',
    borderRadius: 15,
    borderWidth: 4,
    height: 60,
    width: 60,
  },
  screenTitle: {
    flex: 2,
    fontSize: 35,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 69,
  },
  itemOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    borderColor: 'black',
    borderWidth: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 370,
    height: 70,
  },
});