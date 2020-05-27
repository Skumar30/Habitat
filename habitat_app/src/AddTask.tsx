import React, {useState} from 'react';
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

declare const global: {HermesInternal: null | {}};



export default function AddTask(props){
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState([false,false,false,false,false,false,false]);
  const [emptyTitle, setEmpty] = useState(false);

  const checkDaily = () => {
    for(let i = 0; i < 7; i++){
      if(repeat[i] === false){
        return false;
      }
    }
    return true;
  }

  const addHandler = () => {
    if(title === ""){
      setEmpty(true);
      titleAlert();
      return;
    }
    var temp_id = new mongoose.Types.ObjectId();
    // post the task
    fetch('http://192.168.99.1:3000/createTask', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: temp_id,
        title: title,
        due_date: date,
        daily: checkDaily(),
        frequency: repeat,
      })
  });
    // link task to user
    fetch('http://192.168.99.1:3000/addTask', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId: temp_id
      })
  });
    // return to previous screen
    props.routeTo(props.props.screen)
}


  const titleAlert = () => {
      Alert.alert("", "Please input a task title.", [
        {
          text: "OK",
        }//TODO Route to Add Task
      ]
    )
  }

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
      <Text style={styles.titleText} >{"Add Task"}</Text>
      {/* Task Title */}
      <TextInput placeholder="Task Title" onChangeText={(val)=>setTitle(val)} style={styles.titleInput} borderColor={emptyTitle ? "#f00" : "000"}></TextInput>
      {/* Frequency */}
      <View style={{flex: 1}}>
        <View style={{...styles.repeat, flex: 1}}>
          <Button title="S" color={repeat[0] ? "powderblue" : "#999"} onPress={toggleSunday}/>
          <Button title="M" color={repeat[1] ? "powderblue" : "#999"} onPress={toggleMonday}/>
          <Button title="T" color={repeat[2] ? "powderblue" : "#999"} onPress={toggleTuesday}/>
          <Button title="W" color={repeat[3] ? "powderblue" : "#999"} onPress={toggleWednesday}/>
          <Button title="T" color={repeat[4] ? "powderblue" : "#999"} onPress={toggleThursday}/>
          <Button title="F" color={repeat[5] ? "powderblue" : "#999"} onPress={toggleFriday}/>
          <Button title="S" color={repeat[6] ? "powderblue" : "#999"} onPress={toggleSaturday}/>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textContainer}>Current Due Date is {date.getMonth()+1}/{date.getDate()}/{date.getYear()+1900}{repeat}</Text>
        </View>

        <View style={{flex: 5}}>
          <Text>{repeat}</Text>
        </View>
      </View>

      <View style={{flex: 1}}>
        {/* Due Date Picker */}
        <View style={styles.button}>
          <TouchableOpacity onPress={showDatepicker}>
            <Text style={styles.buttonText}>Change Due Date</Text>
          </TouchableOpacity>
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
        {/* Add Button */}
        <View style={styles.addButton}>
          <TouchableOpacity onPress={addHandler}>
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
        {/* Back Button */}
        <View style={styles.backButton}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: "serif"
    },
  container: {
    flex: 1,
    backgroundColor: 'blanchedalmond',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
    textContainer: {
        fontFamily: "serif",
        fontSize: 15
    },
  titleInput: {
    marginBottom: 20,
    borderWidth: 5,
    borderColor: '#000',
    width: 390,
    height: 50,
    padding: 8,
    borderRadius: 7,
    backgroundColor: '#ffffff',
      fontFamily: "serif"
  },
  repeat: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:200,
    borderWidth: 5,
    fontFamily: "serif",
    borderRadius: 5
  },
  dateText: {
    marginTop:10,
    fontFamily: "serif"
  },
  inputTitle: {
    marginTop: 10,
      fontFamily: "serif"
  },
  button: {
    marginBottom: 20,
    borderWidth: 5,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'powderblue',
    justifyContent: 'center',
  },
  addButton: {
    marginBottom: 20,
    borderWidth: 5,
    borderRadius: 10,
    backgroundColor: '#b4ecb4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backButton: {
      marginBottom: 90,
      borderWidth: 5,
      borderRadius: 10,
      backgroundColor: 'mistyrose',
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
    fontSize: 30
  }
});
