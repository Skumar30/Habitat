import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import * as Screens from './Screens';
import {Formik} from 'formik';
import * as yup from 'yup';
import {IP_ADDRESS} from './IP_Address';

const checkingSchema = yup.object({
  old_password: yup.string(),
  password: yup
    .string()
    .required()
    .min(5)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{5,}$/,
      'Password must have at least one number, \none letter, and one special character',
    ),
  //Minimum five characters, at least one letter, one number and one special character
  confirm_password: yup
    .string()
    .required('Must confirm new password')
    .oneOf([yup.ref('password'), null], 'New passwords must match'),
});

interface State {
  errormsg: boolean;
  error_message: String;
}

export default class ChangePassword extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {errormsg: false, error_message: ''};
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
          }}>
          <View
            style={{
              paddingRight: 365,
              flex: 0.1,
            }}>
            <TouchableOpacity
              onPress={() => this.props.routeTo(Screens.Settings)}>
              <Image
                source={require('./assets/backArrowTransparent.png')}></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Change Password</Text>
        </View>
        <View style={styles.buttonGroup}>
          <ScrollView>
            <Formik
              validationSchema={checkingSchema}
              initialValues={{
                old_password: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={(values, actions) => {
                console.log('fetch request');
                fetch(`http://${IP_ADDRESS}:3000/settings/changePassword`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    old_password: values.old_password,
                    password: values.password,
                  }),
                })
                  .then((response) => response.json())
                  .then((output) => {
                    console.log(output);
                    if (output.message) {
                      this.setState({
                        errormsg: true,
                        error_message: output.message,
                      });
                    } else {
                      this.props.routeTo(Screens.Login);
                      actions.resetForm();
                      Alert.alert('Password changed successfully!');
                    }
                  });
                actions.resetForm();
              }}>
              {(props) => (
                <View
                  style={{
                    paddingTop: 20,
                  }}>
                  {this.state.errormsg && (
                    <Text style={styles.errorText}>
                      {this.state.error_message}
                    </Text>
                  )}
                  <TextInput
                    style={{
                      ...styles.textInput,
                      backgroundColor:
                        props.touched.old_password && props.errors.old_password
                          ? 'red'
                          : 'white',
                    }}
                    placeholder="Old Password"
                    onChangeText={props.handleChange('old_password')}
                    onBlur={props.handleBlur('old_password')}
                    value={props.values.old_password}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                  />

                  {props.touched.password && props.errors.password && (
                    <Text style={styles.errorText}>
                      {props.touched.password && props.errors.password}
                    </Text>
                  )}
                  <TextInput
                    style={{
                      ...styles.textInput,
                      backgroundColor:
                        props.touched.password && props.errors.password
                          ? 'red'
                          : 'white',
                    }}
                    placeholder="New Password"
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                  />

                  {props.touched.confirm_password &&
                    props.errors.confirm_password && (
                      <Text style={styles.errorText}>
                        {props.touched.confirm_password &&
                          props.errors.confirm_password}
                      </Text>
                    )}
                  <TextInput
                    style={{
                      ...styles.textInput,
                      backgroundColor:
                        props.touched.confirm_password &&
                        props.errors.confirm_password
                          ? 'red'
                          : 'white',
                    }}
                    placeholder="Confirm New Password"
                    onChangeText={props.handleChange('confirm_password')}
                    onBlur={props.handleBlur('confirm_password')}
                    value={props.values.confirm_password}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                  />

                  <View style={styles.buttonSpacing}>
                    <TouchableOpacity
                      style={styles.TO}
                      onPress={props.handleSubmit}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0094FF',
    flexDirection: 'column',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  textInput: {
    margin: 20,
    height: 50,
    width: 300,
    borderRadius: 7,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 21,
    paddingTop: 20,
  },
  buttonStyle: {
    backgroundColor: '#485EEC',
    height: 45,
    width: 250,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'italic',
    fontSize: 13,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 3,
    borderColor: '#000000',
    padding: 8,
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 18,
  },
  buttonGroup: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0094FF',
  },
  buttonSpacing: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
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
});
