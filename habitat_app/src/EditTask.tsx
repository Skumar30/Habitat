import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Screens from './Screens';
import {IP_ADDRESS} from './App'
declare const global: {HermesInternal: null | {}};



export default function EditTask(props){
  const [title, setTitle] = useState(props.props.data.title);
  const [date, setDate] = useState(props.props.data.due_date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [repeat, setRepeat] = useState(props.props.data.frequency);
  const [emptyTitle, setEmpty] = useState(false);

// this.props.props is the json object passed into this screen
  const checkDaily = () => {
    for(let i = 0; i < 7; i++){
      if(repeat[i] === false){
        return false;
      }
    }
    return true;
  }

  const addHandler = () => {
    if(title.trim() === ""){
      setEmpty(true);
      titleAlert();
      return;
    }
    if(date.getTime() < new Date().getTime()){
      dateAlert();
      return;
    }
    // edit task
    fetch('http://${IP_ADDRESS}:3000/editTask', {
      method: 'POST',
      headers: {
        Accept: 'application/json', //expects a JSON
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: props.props.data._id,
        title: title,
        due_date: date,
        daily: checkDaily(),
        frequency: repeat,
        start_date: props.props.data.start_date,
        datesCompleted: props.props.data.datesCompleted
      }),
    });
    // return to previous screen
    props.routeTo(props.props.screen)
  }

  const backHandler = () => {
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
    showMode({currentMode: 'date'});
  };

  // handles toggle for frequency
  const toggleRepeat = (day) => {
    let newRepeat = [].concat(repeat);
    if (newRepeat[day] === true){
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
      <Text style={styles.titleText} >{"Update Task"}</Text>
      {/* Task Title */}
      <TextInput
      placeholder="Task Title"
      onChangeText={(val)=>setTitle(val)}
      style={styles.titleInput}
      borderColor={emptyTitle ? "#f00" : "000"}>
        {title}
      </TextInput>
      {/* Frequency */}
      <View style={{flex: 1}}>
        <View style={{...styles.repeat, flex: 1}}>
           <Button title="S" color={repeat[0] ? "powderblue" : "#999"} onPress={() => toggleRepeat(0)}/>
          <Button title="M" color={repeat[1] ? "powderblue" : "#999"} onPress={() => toggleRepeat(1)}/>
          <Button title="T" color={repeat[2] ? "powderblue" : "#999"} onPress={() => toggleRepeat(2)}/>
          <Button title="W" color={repeat[3] ? "powderblue" : "#999"} onPress={() => toggleRepeat(3)}/>
          <Button title="T" color={repeat[4] ? "powderblue" : "#999"} onPress={() => toggleRepeat(4)}/>
          <Button title="F" color={repeat[5] ? "powderblue" : "#999"} onPress={() => toggleRepeat(5)}/>
          <Button title="S" color={repeat[6] ? "powderblue" : "#999"} onPress={() => toggleRepeat(6)}/>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.textContainer}>Current Due Date is {date.getMonth()+1}/{date.getDate()}/{date.getYear()+1900}</Text>
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
            <Text style={styles.buttonText}>Update Task</Text>
          </TouchableOpacity>
        </View>
        {/* Back Button */}
        <View style={styles.backButton}>
          <TouchableOpacity>
            <Text style={styles.buttonText} onPress={backHandler}>Back</Text>
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
