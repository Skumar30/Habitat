import React, {useState, Component} from "react";
import { ScrollView, View, Text, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, Modal, StyleSheet } from "react-native";

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
          style={styles.cardContainer}
        >

          {/* View for pending contract title */}
          <View
            style={styles.cardTextContainer}
          >
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>
              {this.props.owner}
            </Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              due_date: {this.props.due_date}
            </Text>
          </View>

          {/* View for checkmark region */}
          <View
            style={styles.pendingCardInteractContainer}
          >
            <TouchableOpacity
              style={styles.pendingCardInteract}
              onPress={this.handleAcceptModalVisible}>
              <Image
                style={styles.pendingCardImage}
                source={require('./assets/checkmark.png')}>
              </Image>
            </TouchableOpacity>
          </View>

          {/* View for x mark region */}
          <View
            style={styles.pendingCardInteractContainer}
          >
            <TouchableOpacity
              style={styles.pendingCardInteract}
              onPress={this.handleRejectModalVisible}>
              <Image
                style={styles.pendingCardImage}
                source={require('./assets/x.png')}>
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
              style={styles.popupModalScreen}
            >
                <View
                  style={styles.popupModalContainer}
                >
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
              style={styles.popupModalScreen}
            >
                <View
                  style={styles.popupModalContainer}
                >
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
    alignItems: 'center'
  },

  popupModalContainer: {
    backgroundColor: 'blanchedalmond',
    borderWidth: 4,
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
    borderRadius: 10,
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
    margin: 5,
  },

  pendingCardImage: {
    height:35,
    width:35,
  }
});

export default PendingCard;
