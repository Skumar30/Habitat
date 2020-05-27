import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from 'react-native';
import * as Screens from './Screens';
import { Formik } from 'formik';
import * as yup from 'yup';



const checkingSchema = yup.object({
  password: yup
    .string()
    .required()
    .min(5)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
      'Password must have at least one number, one letter, and one special character',
    ),
  //Minimum five characters, at least one letter, one number and one special character
  confirm_password: yup
    .string()
    .required('Must confirm new password')
    .oneOf([yup.ref('password'), null], 'New passwords must match'),
});

interface State {
  errormsg: boolean;
}

export default class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirm: ""
    };
  }

  //temporary fix
  onTextInput = (val: string, stateID: number) => {
    if (stateID == 0) {
      this.setState({ oldPassword: val });
    }
    else if (stateID == 1) {
      this.setState({ newPassword: val });
    }
    else {
      this.setState({ reEntered: val });
    }

  };

  render() {
    return (
      <>
        <View style={{
          height: 60,
          backgroundColor: '#485EEC',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View
            style={{
              paddingRight: 365,
              flex: 0.1
            }}>
            <TouchableOpacity onPress={() => this.props.routeTo(Screens.Settings)}>
              <Image
                source={require('./assets/backArrowTransparent.png')}>
              </Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Change Password</Text>
        </View>
        <View>
          <ScrollView>
            <Formik
              validationSchema={checkingSchema}
              initialValues={{
                old_password: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={(values, actions) => {
                fetch('http://INSERT YOUR IPv4 HERE:3000/users/signup', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    password: values.password,
                  }),
                })
                  .then((response) => response.json()) //gets response body
                  .then((output) => {
                    console.log(output);
                    if (output.message) {
                      //used to check if error message exists
                      this.setState({ errormsg: true });
                    } else {
                      actions.resetForm();
                      this.props.routeTo(Screens.Home);
                    }
                  });

                actions.resetForm();
              }}>

              {(props) => (
                <View>

                  <Text style={styles.textStyle}>Enter Old Password</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.oldPassword && props.errors.oldPassword
                          ? 'red'
                          : 'white',
                    }}
                    placeholder=""
                    onChangeText={props.handleChange('oldPassword')}
                    onBlur={props.handleBlur('oldPassword')}
                    value={props.values.oldPassword}
                    underlineColorAndroid="transparent"
                  />

                  <Text style={styles.textStyle}>Enter New Password</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.password && props.errors.password
                          ? 'red'
                          : 'white',
                    }}
                    placeholder=""
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    underlineColorAndroid="transparent"
                  />

                  <Text style={styles.textStyle}>Confirm New Password</Text>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.confirm_password && props.errors.confirm_password
                          ? 'red'
                          : 'white',
                    }}
                    placeholder=""
                    onChangeText={props.handleChange('confirm_password')}
                    onBlur={props.handleBlur('confirm_password')}
                    value={props.values.confirm_password}
                    underlineColorAndroid="transparent"
                  />
                  <View style={styles.buttonSpacing}>
                    <TouchableOpacity
                      style={styles.TO}
                      onPress={() => this.props.routeTo(Screens.Login)}>
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
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0094FF',
    flexDirection: 'column',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20
  },
  textInput: {
    height: 50,
    width: 300,
    borderRadius: 7,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 21
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonSpacing: {
    paddingTop: 80,
    paddingBottom: 200,
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

});