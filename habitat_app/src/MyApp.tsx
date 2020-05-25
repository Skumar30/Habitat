
import React, { useState, useEffect, Component, Fragment } from "react";
import { View, Text, Button, Image } from "react-native";
import Login from "./Login";
import FriendList from "./FriendList";

class MyApp extends Component {

  state = {trigger: true}
  
  constructor(props:any){
    super(props);
    this.state = {trigger: true}
  }

  render() {
      var trigger:boolean = this.state.trigger;
    return(
      <Fragment>
                {this.state.trigger && <Login/>}
        {this.state.trigger == false && <FriendList/>}
        <Button title="Toggle" onPress={() => this.setState({trigger: !this.state.trigger})} />
      </Fragment>
    );
  }
}

export default MyApp;
