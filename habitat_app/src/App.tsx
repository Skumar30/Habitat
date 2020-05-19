/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, Button
} from 'react-native';
import RegTask from './RegTask'

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './Login'

declare const global: { HermesInternal: null | {} };

interface State{
    trigger: boolean
}
class App extends React.Component<{}, State>{
  
  constructor(props:any){
    super(props);
    this.state = {trigger: true}
  }

  render(){
      var trigger:boolean = this.state.trigger;
    return(
       <Fragment>
           {this.state.trigger && <Login/>}
           {this.state.trigger == false && <RegTask/>}
           <Button title="Toggle" onPress={() => this.setState({trigger: !this.state.trigger})} />
       </Fragment>

    )

  }
}
export default App;
