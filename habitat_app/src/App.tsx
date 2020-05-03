
import React, { useState, useEffect, Component } from "react";
import { View, Text, Button, Image } from "react-native";
import WellnessContractHome from "./WellnessContractHome";
/*
class App extends Component {

  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          height: 650,
          width: 410,
          padding: 20
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            fontSize: 32
          }}>
          Wellness Contracts
        </Text>
        <View style={{ flexDirection: "column", backgroundColor: "#DDDDDD" }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              padding: 10
            }}>
            Title Here
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              padding: 10
            }}>
            Your task #1
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              padding: 10
            }}>
            Your task #2
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              padding: 10
            }}>
            Your task #3
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              padding: 10
            }}>
            Your task #4
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              padding: 10
            }}>
            Your task #5
          </Text>
        </View>
        <Button title="Click here"></Button>
      </View>
    );
  }
}

export default App;
*/


class App extends Component {

  constructor(props){

    super(props);
    this.state = {displayWellnessContractScreen:false}
  }

  onClickHandler = (val: boolean) => {

    this.setState({displayWellnessContractScreen:val});
  }

  render() {

    if(this.state.displayWellnessContractScreen) {

      return(
        <View>
          <WellnessContractHome onBack={this.onClickHandler}/>
        </View>
      );
    }
    else {

      return(
        <View>
          <Button title="click here to go to wellness contract home screen" onPress={() => this.onClickHandler(true)}></Button>
        </View>
      );
    }

  }
}

export default App;
