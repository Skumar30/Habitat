import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';


declare const global: {HermesInternal: null | {}};

const addHandler = () => {
  //TODO
}

export default function AddTask(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Task Title"
        onChangeText={(val)=>setTitle(val)}
        style={styles.titleInput}/>

      <View style={styles.button}>
        <Button title="Add Task" style={styles.button} onPress={addHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleInput: {
    borderWidth: 3,
    borderColor: "#000000",
    padding: 9,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 16,
    width: 300
  },
  descriptionInput: {
    borderWidth: 3,
    borderColor: "#000000",
    padding: 9,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 16,
    width: 300,
    height: 160
  },
  inputTitle: {
    marginTop: 10
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    marginTop: 5,
    height: 40,
    zIndex: 1
  }
});
