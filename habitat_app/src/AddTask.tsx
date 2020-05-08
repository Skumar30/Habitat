import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

declare const global: {HermesInternal: null | {}};

const addHandler = () => {
  //TODO
}

export default function AddTask(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState([false,false,false,false,false,false,false])

  const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

  const changeDate = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

  const showDatepicker = () => {
    showMode({currentMode: 'date'});
  };

  const toggleSunday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[0] === true){
        newRepeat[0] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[0] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleMonday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[1] === true){
        newRepeat[1] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[1] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleTuesday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[2] === true){
        newRepeat[2] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[2] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleWednesday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[3] === true){
        newRepeat[3] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[3] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleThursday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[4] === true){
        newRepeat[4] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[4] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleFriday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[5] === true){
        newRepeat[5] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[5] = true;
        setRepeat(newRepeat);
    }
  };

  const toggleSaturday = () => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[6] === true){
        newRepeat[6] = false;
        setRepeat(newRepeat);
    }
    else {
        newRepeat[6] = true;
        setRepeat(newRepeat);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <Button title="Back"/>
      </View>

      {/* Task Title */}
      <TextInput
        placeholder="Task Title"
        onChangeText={(val)=>setTitle(val)}
        style={styles.titleInput}/>

        {/* Due Date Picker */}
        <View style={styles.button}>
            <Button
            onPress={showDatepicker}
            title="Change Due Date"
            />
        </View>
        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                is24Hour={true}
                display="default"
                onChange={changeDate}
            />
        )}

      {/* Frequency */}
        <View style={styles.repeat}>
          <Button title="S" color={repeat[0] ? "" : "#999"} onPress={toggleSunday}/>
          <Button title="M" color={repeat[1] ? "" : "#999"} onPress={toggleMonday}/>
          <Button title="T" color={repeat[2] ? "" : "#999"} onPress={toggleTuesday}/>
          <Button title="W" color={repeat[3] ? "" : "#999"} onPress={toggleWednesday}/>
          <Button title="T" color={repeat[4] ? "" : "#999"} onPress={toggleThursday}/>
          <Button title="F" color={repeat[5] ? "" : "#999"} onPress={toggleFriday}/>
          <Button title="S" color={repeat[6] ? "" : "#999"} onPress={toggleSaturday}/>
        </View>

        <View>
          <Text>Current Due Date is {date.getMonth()+1}/{date.getDate()}/{date.getYear()+1900}{repeat}</Text>
        </View>
        <View>
        <Text>{repeat}</Text>
        </View>


      {/* Add Button */}
      <View style={styles.addButton}>
        <Button
        title="Add Task"
        onPress={addHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: 0,
    flex: 0,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: 100
  },
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#aaeeff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleInput: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#000',
    width: 390,
    height: 50,
    padding: 8,
    borderRadius: 7,
    backgroundColor: '#ffffff'
  },
  repeat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:200,
    height:100,
  },
  dateText: {
    marginTop:10
  },
  inputTitle: {
    marginTop: 10
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    width: 200,
  },
  addButton: {
    marginTop: 150,
    marginBottom: 180,
    width: 200
  }
});
