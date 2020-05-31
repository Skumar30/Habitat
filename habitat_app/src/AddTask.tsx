import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
var mongoose = require('mongoose');
import { IP_ADDRESS } from './IP_Address'
import * as Screens from "./Screens"
declare const global: { HermesInternal: null | {} };



export default function AddTask(props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState([false, false, false, false, false, false, false]);
  const [emptyTitle, setEmpty] = useState(false);

  const checkDaily = () => {
    for (let i = 0; i < 7; i++) {
      if (repeat[i] === false) {
        return false;
      }
    }
    return true;
  }

  const addHandler = () => {
    if (title.trim() === "") {
      setEmpty(true);
      titleAlert();
      return;
    }
    var today = new Date();
    today.setHours(0, 0, 0);
    if (date.getTime() < today.getTime()) {
      dateAlert();
      return;
    }
    var temp_id = new mongoose.Types.ObjectId();
    // post the task
    fetch(`http://${IP_ADDRESS}:3000/addTask/createTask`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: temp_id,
        title: title,
        due_date: date.setHours(23, 59, 59),
        daily: checkDaily(),
        frequency: repeat,
      })
    });
    // link task to user
    fetch(`http://${IP_ADDRESS}:3000/addTask/addTask`, {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId: temp_id
      })
    }).then((res) => {
      // return to previous screen
      if (checkDaily()) {
        props.routeTo(Screens.DailyScreen);
      }
      else {
        props.routeTo(Screens.RegTask);
      }
    });


  }

  const backHandler = () => {
    // return to previous screen
    props.routeTo(props.props.screen)
  }

  const titleAlert = () => {
    Alert.alert("", "Please input a valid task title.", [
      {
        text: "OK",
      }
    ]
    )
  }

  const dateAlert = () => {
    Alert.alert("", "Please input a valid due date.", [
      {
        text: "OK",
      }
    ]
    )
  }
  // datetimepicker functions
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
    showMode({ currentMode: 'date' });
  };

  // handles toggle for frequency
  const toggleRepeat = (day) => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[day] === true) {
      newRepeat[day] = false;
      setRepeat(newRepeat);
    }
    else {
      newRepeat[day] = true;
      setRepeat(newRepeat);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText} >{"Add Task"}</Text>
      {/* Task Title */}
      <TextInput placeholder="Task Title" onChangeText={(val) => setTitle(val)} style={styles.titleInput} borderColor={emptyTitle ? "#f00" : "000"}></TextInput>
      {/* Frequency */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ ...styles.repeat, flex: 1 }}>
          <Button title="S" color={repeat[0] ? "powderblue" : "#999"} onPress={() => toggleRepeat(0)} />
          <Button title="M" color={repeat[1] ? "powderblue" : "#999"} onPress={() => toggleRepeat(1)} />
          <Button title="T" color={repeat[2] ? "powderblue" : "#999"} onPress={() => toggleRepeat(2)} />
          <Button title="W" color={repeat[3] ? "powderblue" : "#999"} onPress={() => toggleRepeat(3)} />
          <Button title="T" color={repeat[4] ? "powderblue" : "#999"} onPress={() => toggleRepeat(4)} />
          <Button title="F" color={repeat[5] ? "powderblue" : "#999"} onPress={() => toggleRepeat(5)} />
          <Button title="S" color={repeat[6] ? "powderblue" : "#999"} onPress={() => toggleRepeat(6)} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.textContainer}>
            Current Due Date: <Text style={{ fontSize: 20, fontWeight: "bold" }}>{date.getMonth() + 1}/{date.getDate()}/{date.getYear() + 1900}{repeat}</Text>
          </Text>
        </View>

        <View style={{ flex: 5 }}>
          <Text>{repeat}</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Due Date Picker */}

        <TouchableOpacity onPress={showDatepicker} style={styles.button}>
          <Text style={styles.buttonText}>Change Due Date</Text>
        </TouchableOpacity>
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
        {/* Add Button */}
        <TouchableOpacity onPress={addHandler} style={styles.addButton}>
          <Text style={styles.buttonText}>Add Task</Text>
        </TouchableOpacity>
        {/* Back Button */}
        <TouchableOpacity onPress={backHandler} style={styles.backButton}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: 'center',
    // fontFamily: "serif"
  },
  container: {
    flex: 1,
    backgroundColor: 'blanchedalmond',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  textContainer: {
    // fontFamily: "serif",
    fontSize: 18,
    fontWeight: '400',
    padding: 10,
  },
  titleInput: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#000',
    width: 390,
    height: 50,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    // fontFamily: "serif"
  },
  repeat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    borderWidth: 3,
    // fontFamily: "serif",
    borderRadius: 5
  },
  dateText: {
    marginTop: 10,
    // fontFamily: "serif"
  },
  inputTitle: {
    marginTop: 10,
    // fontFamily: "serif"
  },
  button: {
    marginBottom: 20,
    borderWidth: 4,
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    padding: 6
  },
  addButton: {
    marginBottom: 20,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: '#b4ecb4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  backButton: {
    marginBottom: 90,
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: 'mistyrose',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6
  },
  buttonText: {
    fontSize: 26,
    fontWeight: '500'
  }
});
