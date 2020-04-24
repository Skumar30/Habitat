/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import RegTask from './RegTask'
import { View, Text,
 Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

class App extends React.Component<{}, any>{
  
  constructor(props:any){
    super(props);
    this.state = {trigger: false}
  }

  render(){
    const trigger:boolean = this.state.trigger;
    return(
      <View>
     {this.state.trigger != true && <Button onPress={()=>this.setState({trigger: true})} title="Click here" />}
     {this.state.trigger && <RegTask show={this.state.trigger}/>}
     </View>
    )
  }
}
export default App;
