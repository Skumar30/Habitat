/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    StatusBar, TextInput, Button, YellowBox, TextComponent,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {

  function doSomething() {

  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  function onChange ({event, selectedDate}: { event: any, selectedDate: any }) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  function showMode({currentMode}: { currentMode: any }) {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode({currentMode: 'date'});
  };

  return (
      <View style={styles.container}>

        <View>
          <Text style={styles.titleText}>Create Contract</Text>

          <TextInput placeholder="Task" style={styles.titleInput}/>
          <TextInput placeholder="Daily" style={styles.titleInput}/>

          <TextInput>
            "currentDate"
          </TextInput>
            <View>
                <Button onPress={showDatepicker} title="Change Due Date" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={date}
                    is24Hour={true}
                    display="default"
                />
            )}
          <View style={styles.buttonContainer}>
            <Button onPress={doSomething} title="Create Contract">Create Contract</Button>
          </View>
            <View style={styles.buttonContainer}>
                <Button onPress={doSomething} title="Cancel">Cancel</Button>
            </View>
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center'
  },
  container: {
    marginTop: 10,
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    marginTop: 100
  },
  titleInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 390,
    height: 50,
    padding: 8,
    borderRadius: 7
  },
  descriptionInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 390,
    height: 150,
    padding: 8,
    borderRadius: 7
  }
});

export default App;