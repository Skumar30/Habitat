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


class FriendList extends Component{

  state = {
    modalVisible: false,
    arrayHolder: [],
    textInput_Holder: '',
  };

  data = [
    {
      code: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      key: 'Alex',
    },
    {
      code: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      key: 'Darin',
    },
    {
      code: '58694a0f-3da1-471f-bd96-145571e29d72',
      key: 'Evan',
    },
  ];



  joinData = () => {

    if (this.state.textInput_Holder != ''){
    
      this.data.push({code: '0', key: this.state.textInput_Holder});
      
      this.setState({ arrayHolder: [...this.data] });

      this.setState({modalVisible:false});
    }
  }

  renderForm = () => {

    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <View>
                <Text style={styles.modalText}>Add Friend!</Text>
              </View>

              <View style={styles.centerThis}>
              <TextInput
                style={styles.inputTxt}
                placeholder="Enter Friend Code"
                onChangeText={data => this.setState({ textInput_Holder: data })}
              />
              </View>
              
              <View style={styles.buttonSeparation}>
                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                      this.setState({modalVisible:false});
                    }}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={{...styles.addButton, backgroundColor: "#2196F3" }}
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
                    onPress={() => this.setState({modalVisible: true}) }
                    >
                      <Text>Add Friend</Text>
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
                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
              />
          </View>

          {this.state.modalVisible && this.renderForm()}
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
  },
  item: {
    padding: 5,
    fontSize: 28,
    height: 44,
  },

  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 20,
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  body: {
    backgroundColor: '#FC886F',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
  },
  sectionDescription: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
  },
  OpTouchableOpacity: {
    fontWeight: '700',
  },
  centerText: {
    textAlign: 'center',
  },

// MODAL STYLE
centeredView: {
    flex: 1,
    marginTop: 45,
  },
  modalView: {
    margin: 20,
    width: 375,
    backgroundColor: "white",
    borderRadius: 20,
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 25,
  },

  buttonSeparation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  inputTxt: {
    height: 35, 
    width: 200, 
    borderColor: 'blue', 
    borderWidth: 1, 
    borderRadius: 5, 
    margin: 10, 
    textAlign: 'center', 
    
  },

  centerThis: {
    alignSelf: 'center',
  },
  
});