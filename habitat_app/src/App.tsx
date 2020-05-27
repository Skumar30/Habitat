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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
<<<<<<< Updated upstream
=======
import RegTask from './RegTask';
import Test from './Test';
>>>>>>> Stashed changes

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

<<<<<<< Updated upstream
=======
import Home from './Home';
import Login from './Login';
import FriendList from './FriendList';
import DailyScreen from './DailyScreen';
import AddTask from './AddTask';
import CreateContract from './CreateContract';
import CustomizeScreen from './CustomizeScreen';
import PendingCard from './PendingCard';
import WellnessContractHome from './WellnessContractHome';
import TaskCard from './TaskCard';
import SignUp from './SignUp';
import ViewWellnessContract from './ViewWellnessContract';
import WellnessContract from './WellnessContract';

>>>>>>> Stashed changes
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

<<<<<<< Updated upstream
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
=======
  renderScreen() {
    var screenToShow;
    switch (
      this.state.screen
      /*
      case Screens.AddTask : screenToShow = <AddTask routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.CreateContract : screenToShow = <CreateContract routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.CustomizeScreen : screenToShow = <CustomizeScreen routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.DailyScreen : screenToShow = <DailyScreen routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.FriendList : screenToShow = <FriendList routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.Login : screenToShow = <Login routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      
      case Screens.Home : screenToShow = <Home routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.RegTask : screenToShow = <RegTask routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      
      case Screens.SignUp : screenToShow = <SignUp routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.ViewWellnessContract : screenToShow = <ViewWellnessContract routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.WellnessContract : screenToShow = <WellnessContract routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      case Screens.WellnessContractHome : screenToShow = <WellnessContractHome routeTo={this.routeTo} props={this.state.toSend} />
                          break;
      */
    ) {
    }
    console.log(screenToShow);
    return screenToShow;
  }
  render() {
    return (
      /*<Fragment>
        {console.log(this.state.screen)}
        {this.renderScreen()}
      </Fragment>*/

      /*
        <Fragment>
          {this.state.trigger && <RegTask/>}
        </Fragment>
       */


        <Fragment>
          {this.state.trigger && <DailyScreen/>}
        </Fragment>


      /*
     <Fragment>
     {this.state.trigger && <Login/>}
     {this.state.trigger == false && <RegTask/>}
     <Button title="Toggle" onPress={() => this.setState({trigger: !this.state.trigger})} />
 </Fragment>*/

    );
  }
}
>>>>>>> Stashed changes

export default App;
