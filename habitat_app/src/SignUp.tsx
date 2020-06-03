/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  ScrollView,
} from 'react-native';
import * as Screens from './Screens';
import CustomButton from './components/button';
import {IP_ADDRESS} from './IP_Address';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 1) / 4);
const imageWidth = dimensions.width;
const checkingSchema = yup.object({
  name: yup.string().required().min(1),
  email: yup.string().required().email(),
  username: yup.string().required().min(5),
  password: yup
    .string()
    .required()
    .min(5)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&_-]{5,}$/,
      'Password must have at least one number, one letter, and one special character',
    ),
  //Minimum five characters, at least one letter, one number and one special character
  confirm_password: yup
    .string()
    .required('Must confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
interface State {
  errormsg: boolean;
}

export default class SignUp extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {errormsg: false};
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require('./assets/logo.jpg')}
            style={styles.bearImage}
          />
          <ScrollView>
            <Formik
              validationSchema={checkingSchema}
              initialValues={{
                name: '',
                email: '',
                username: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={(values, actions) => {
                fetch(`http://${IP_ADDRESS}:3000/users/signup`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    username: values.username,
                    password: values.password,
                  }),
                })
                  .then((response) => response.json()) //gets response body
                  .then((output) => {
                    console.log(output);
                    if (output.message) {
                      //used to check if error message exists
                      this.setState({errormsg: true});
                    } else {
                      actions.resetForm();
                      this.props.routeTo(Screens.Home);
                    }
                  });

                actions.resetForm();
              }}>
              {(props) => (
                <View>
                  {this.state.errormsg && (
                    <Text style={styles.errorText}>
                      Username already exists!
                    </Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.name && props.errors.name
                          ? 'indianred'
                          : 'white',
                    }}
                    placeholder="Name"
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                    underlineColorAndroid="transparent"
                  />
                  {props.touched.name && props.errors.name && (
                    <Text style={styles.errorText}>{props.errors.name}</Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.email && props.errors.email
                          ? 'indianred'
                          : 'white',
                    }}
                    placeholder="Email"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    underlineColorAndroid="transparent"
                  />
                  {props.touched.email && props.errors.email && (
                    <Text style={styles.errorText}>{props.errors.email}</Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.username && props.errors.username
                          ? 'indianred'
                          : 'white',
                    }}
                    placeholder="Username"
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                    underlineColorAndroid="transparent"
                  />

                  {props.touched.username && props.errors.username && (
                    <Text style={styles.errorText}>
                      {props.errors.username}
                    </Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.password && props.errors.password
                          ? 'indianred'
                          : 'white',
                    }}
                    placeholder="Password"
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                  />

                  {props.touched.password && props.errors.password && (
                    <Text style={styles.errorText}>
                      {props.touched.password && props.errors.password}
                    </Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.confirm_password &&
                        props.errors.confirm_password
                          ? 'indianred'
                          : 'white',
                    }}
                    placeholder="Confirm Password"
                    onChangeText={props.handleChange('confirm_password')}
                    onBlur={props.handleBlur('confirm_password')}
                    value={props.values.confirm_password}
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                  />

                  {props.touched.confirm_password &&
                    props.errors.confirm_password && (
                      <Text style={styles.errorText}>
                        {props.touched.confirm_password &&
                          props.errors.confirm_password}
                      </Text>
                    )}

                  <View style={styles.buttonGroup}>
                    <CustomButton
                      text="Login"
                      onPress={() => this.props.routeTo(Screens.Login)}
                    />
                    <CustomButton text="Submit" onPress={props.handleSubmit} />
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
    paddingTop: 15,
    backgroundColor: '#0094FF',
  },
  bearImage: {
    height: imageHeight,
    width: imageWidth,
    marginTop: 70,
    marginBottom: 5,
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
});
