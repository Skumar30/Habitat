/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Fragment} from 'react';
import * as Screens from './Screens';
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

import Home from './Home'
import Login from './Login'
import FriendList from './FriendList'
import MyApp from './MyApp'
import DailyScreen from './DailyScreen'
import AddTask from './AddTask'
import CreateContract from './CreateContract'
import CustomizeScreen from './CustomizeScreen'
import PendingCard from './PendingCard'
import WellnessContractHome from './WellnessContractHome';
import TaskCard from './TaskCard'
import SignUp from './SignUp';
import ViewWellnessContract from './ViewWellnessContract';
import WellnessContract from './WellnessContract'

declare const global: { HermesInternal: null | {} };

interface State{
    screen: string
    toSend: any
    trigger: boolean
}
class App extends React.Component<{}, State>{
  
  constructor(props:any){
    super(props);
    this.state = {screen: 'Login', toSend: {}, trigger: true}
  }

  routeTo(screen:string, props:any={}){

    this.setState({screen: screen, toSend: props})
  }


  renderScreen(){
    var screenToShow;
    switch(this.state.screen){

      case Screens.AddTask : screenToShow = <AddTask routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.CreateContract : screenToShow = <CreateContract routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.CustomizeScreen : screenToShow = <CustomizeScreen routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.DailyScreen : screenToShow = <DailyScreen routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.FriendList : screenToShow = <FriendList routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.Home : screenToShow = <Home routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.Login : screenToShow = <Login routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.RegTask : screenToShow = <RegTask routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.SignUp : screenToShow = <SignUp routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.ViewWellnessContract : screenToShow = <ViewWellnessContract routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.WellnessContract : screenToShow = <WellnessContract routeTo={this.routeTo} props={this.state.toSend} />
      case Screens.WellnessContractHome : screenToShow = <WellnessContractHome routeTo={this.routeTo} props={this.state.toSend} />
    }
    return(screenToShow);
  }
  render(){
      

    return(
      /*
      <Fragment>
       {this.renderScreen()}

       </Fragment>
      */

     <Fragment>
     {this.state.trigger && <Login/>}
     {this.state.trigger == false && <RegTask/>}
     <Button title="Toggle" onPress={() => this.setState({trigger: !this.state.trigger})} />
 </Fragment>

    )

  }
}

export default App;
