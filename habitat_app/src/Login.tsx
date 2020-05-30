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
  username: yup.string().required(),
  password: yup.string().required(),
});

interface State {
  errortoggle: boolean;
  errormsg: string;
}

export default class Login extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {errortoggle: false, errormsg: ''};
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
                username: '',
                password: '',
              }}
              onSubmit={(values, actions) => {
                fetch(`http://${IP_ADDRESS}:3000/users/signin`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                  }),
                })
                  .then((response) => response.json()) //gets response body
                  .then((output) => {
                    console.log(output);
                    if (output.message) {
                      //used to check if error message exists
                      this.setState({
                        errortoggle: true,
                        errormsg: output.message,
                      });
                    } else {
                      actions.resetForm();
                      this.props.routeTo(Screens.FriendList);
                    }
                  });

                actions.resetForm();
              }}>
              {(props) => (
                <View>
                  {this.state.errortoggle && (
                    <Text style={styles.errorText}>{this.state.errormsg}</Text>
                  )}

                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor:
                        props.touched.username && props.errors.username
                          ? 'red'
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
                          ? 'red'
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
                      {props.errors.password}
                    </Text>
                  )}
                  <View style={styles.buttonGroup}>
                    <CustomButton text="Submit" onPress={props.handleSubmit} />
                    <CustomButton
                      text="Sign-up"
                      onPress={() => this.props.routeTo(Screens.SignUp)}
                    />
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
    paddingTop: 45,
    backgroundColor: '#0094FF',
  },
  bearImage: {
    height: imageHeight,
    width: imageWidth,
    marginTop: 70,
    marginBottom: 50,
  },
  header: {
    fontFamily: 'italic',
    fontSize: 80,
    textAlign: 'left',
    margin: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
});
