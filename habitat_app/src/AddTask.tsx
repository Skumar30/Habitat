import React from 'react';
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

const AddTask = () => {
  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input}/>
      <View style={styles.buttonContainer}>
        <Button title='Add Task' onPress={addHandler}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    marginTop: 100
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: 200,
    padding: 8
  }
});


export default AddTask;
