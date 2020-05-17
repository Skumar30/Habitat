
import React, { useState, useEffect, Component } from "react";
import { View, Text, Button, Image } from "react-native";
import WellnessContractHome from "./WellnessContractHome";

class MyApp extends Component {

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

export default MyApp;
