import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Screens from './Screens';

export default class Settings extends React.Component {

  constructor(props) {

    super(props);
    this.state = { displayNotifications: false };
    this.state = { displayChangePassword: false };
  }

  toNotifications = (val: boolean) => {
    this.setState({ displayNotifications: val });
  }

  toChangePassword = (val: boolean) => {
    this.setState({ displayChangePassword: val });
  }

  render() {

    return (
      <>
        <View
          style={{
            height: 60,
            backgroundColor: '#485EEC',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              paddingRight: 365,
              flex: 0.1
            }}>
            <TouchableOpacity onPress={() => this.props.routeTo(Screens.Home)}>
              <Image
                source={require('./assets/backArrowTransparent.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Settings</Text>
        </View>
        <SafeAreaView style={styles.buttonGroup}>
          <View style={styles.buttonSpacing}>
            <TouchableOpacity
              style={styles.TO}
              onPress={() => this.props.routeTo(Screens.Notifications)}>
              <Text style={styles.buttonText}>Notification Settings</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSpacing}>
            <TouchableOpacity
              style={styles.TO}
              onPress={() => this.props.routeTo(Screens.ChangePassword)}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSpacing}>
            <TouchableOpacity
              style={styles.TO}
              onPress={() => this.props.routeTo(Screens.Login)}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: '#0094FF',
  },
  buttonSpacing: {
    paddingTop: 70,
    paddingBottom: 70,
    flex: 1,
  },
  TO: {
    backgroundColor: '#485EEC',
    height: 45,
    width: 300,
    borderRadius: 7,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20
  },
  buttonGroup: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0094FF'
  }
});