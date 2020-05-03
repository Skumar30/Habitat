import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, Modal } from "react-native";

class PendingCard extends Component {

  constructor(props){

    super(props);

    //acceptModalVisible and rejectModalVisible initialized to false
    this.state = {acceptModalVisible: false, rejectModalVisible: false};
  }

  //method which toggles acceptModalVisible
  handleAcceptModalVisible = () => {

    this.setState({acceptModalVisible: !this.state.acceptModalVisible});
  }

  //method which toggles rejectModalVisible
  handleRejectModalVisible = () => {

    this.setState({rejectModalVisible: !this.state.rejectModalVisible});
  }

  render() {

    return(

      <TouchableOpacity onPress={() => alert("popup with wellness contract info")}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 4,
            borderColor: '#CCCCCC',
            flexDirection: 'row',
            margin: 5
        }}>
          
          {/* View for pending contract title */}
          <View
            style={{
              flex: 0.7,
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>
              {this.props.title}
            </Text>
          </View>
          
          {/* View for checkmark region */}
          <View
            style={{
              flex:0.15,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                margin: 5
              }}
              onPress={this.handleAcceptModalVisible}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/checkmark.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          
          {/* View for x mark region */}
          <View
            style={{
              flex:0.15,
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              justifyContent: 'center'
            }}>
            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                margin: 5
              }}
              onPress={this.handleRejectModalVisible}>
              <Image
                style={{
                  height:35,
                  width:35
                }}
                source={require('./Assets/x.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          
          {/* Modal for confirming accept invitation */}
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.acceptModalVisible}
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
                      Are you sure you want to accept the invitation?
                  </Text>
                  <Button
                    title="Accept Invitation"
                    onPress={() => this.props.handleAccept(this.props.id)}>
                  </Button>
                  <Button
                    title="Cancel"
                    onPress={this.handleAcceptModalVisible}>
                  </Button>
                </View>
            </View>
          </Modal>

          {/* Modal for confirming reject invitation */}
          <Modal
            animationType='none'
            transparent={true}
            visible={this.state.rejectModalVisible}
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
                      Are you sure you want to reject the invitation?
                  </Text>
                  <Button
                    title="Reject Invitation"
                    onPress={() => this.props.handleReject(this.props.id)}>
                  </Button>
                  <Button
                    title="Cancel"
                    onPress={this.handleRejectModalVisible}>
                  </Button>
                </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
      
    );
  }
          
}


export default PendingCard;
