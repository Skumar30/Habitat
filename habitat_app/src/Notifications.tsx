import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Switch,
  Text,
  Alert
} from 'react-native';

export default function Notifications() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    if (isEnabled) {
      Alert.alert('Notifications are now disabled. Insert logic here.');
    }
    else {
      Alert.alert('Notifications are now enabled. Insert logic here.');
    }
  }

  return (
    <>
      <View style={{
        height: 60,
        backgroundColor: '#485EEC',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={styles.buttonText}>Notifications</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.buttonText}>Enable Push Notifications </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#77E2FF" : "#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0094FF',
    flexDirection: 'row',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20
  }
});