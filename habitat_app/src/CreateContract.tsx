import React, { useState } from 'react';
var mongoose = require('mongoose');
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Platform,
    Alert,
    StatusBar, TextInput, Button, YellowBox, TextComponent, FlatList, TouchableOpacity, Modal,
} from 'react-native';

import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import DateTimePicker from '@react-native-community/datetimepicker';
import * as Screens from './Screens';
import { IP_ADDRESS } from './IP_Address';

interface State {
    date: any;
    mode: any;
    show: any;
    friendID: any;
    friend: String;
    tasks: any[];
    screen: any;
}

class CreateContract extends React.Component<any, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            date: this.props.props.date,
            mode: 'date',
            show: false,
            tasks: this.props.props.tasks,
            friendID: this.props.props.friendID,
            friend: this.props.props.friend,
            screen: Screens.CreateContract
        }

    }
    updateFriend() {
        this.props.routeTo(Screens.WellnessContractFriends, this.state)
    }

    changeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || this.state.date;
        this.setState({ show: (Platform.OS === 'ios') });
        this.setState({ date: (currentDate) });
    };

    submitData = async () => {
        var currDate = new Date();
        if (this.state.friendID == '') {


            Alert.alert("", "Please select a friend", [
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]);
        }
        else if ((this.state.date.getFullYear() < currDate.getFullYear()) || ((this.state.date.getMonth() < currDate.getMonth())
            && (currDate.getFullYear() == this.state.date.getFullYear()))
            || ((this.state.date.getDate() < currDate.getDate()) && (this.state.date.getMonth() == currDate.getMonth())
                && (this.state.date.getFullYear() == currDate.getFullYear()))) {
            Alert.alert("", "Please select a future due date", [
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]);
        }
        else {
            var temp_id = new mongoose.Types.ObjectId();
            await fetch(`http://${IP_ADDRESS}:3000/createContract/createContract`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: temp_id,
                    friend: this.state.friendID,
                    tasks: this.state.tasks,
                    due_date: this.state.date
                })
            });
            await fetch(`http://${IP_ADDRESS}:3000/createContract/addContract`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contractId: temp_id,
                })
            });

            await fetch(`http://${IP_ADDRESS}:3000/createContract/addContractToFriend`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contractId: temp_id,
                    friendID: this.state.friendID
                })
            });
            Alert.alert("", "You'll be able to view the contract once the other user accepts", [
                {
                    text: "OK",
                    style: "cancel"
                }
            ]);
            this.props.routeTo(Screens.WellnessContractHome);
        }

    };

    showMode({ currentMode }: { currentMode: any }) {
        this.setState({ show: true });
    };

    showDatepicker = () => {
        this.showMode({ currentMode: 'date' });
    };


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titleText} >{"Create Contract"}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.routeTo(Screens.EditWellnessContract, this.state)}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 7 }}>Add Tasks</Text>
                    </TouchableOpacity>

                    <Text style={styles.dateInput}>
                        {"Friend to Invite: "}{this.state.friend}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.updateFriend()}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 7 }}>Invite a Friend</Text>
                    </TouchableOpacity>


                    <Text style={styles.dateInput}>
                        {"Current Due Date: "}{this.state.date.getMonth() + 1}/{this.state.date.getDate()}/{this.state.date.getFullYear()}
                    </Text>

                    <View style={{ flex: 1 }}>
                        {/* Due Date Picker */}

                        <TouchableOpacity style={styles.changeButton} onPress={this.showDatepicker}>
                            <Text style={styles.buttonText}>Change Due Date</Text>
                        </TouchableOpacity>
                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                timeZoneOffsetInMinutes={0}
                                value={this.state.date}
                                is24Hour={true}
                                display="default"
                                onChange={this.changeDate}
                            />
                        )}
                        {/* Add Button */}
                        <TouchableOpacity style={styles.addButton} onPress={this.submitData}>
                            <Text style={styles.buttonText}>Create Contract</Text>
                        </TouchableOpacity>
                        {/* Back Button */}
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.routeTo(Screens.WellnessContractHome)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        );
    }
};

const styles = StyleSheet.create({
    titleText: {
        marginVertical: 30,
        fontSize: 45,
        fontWeight: "bold",
        textAlign: 'center',
        // fontFamily: "serif"
    },
    container: {
        flex: 1,
        backgroundColor: 'blanchedalmond',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        marginBottom: 10,
        marginLeft: 70,
        marginRight: 70,
        // fontFamily: "serif"
    },
    titleInput: {
        marginTop: 50,
        borderWidth: 1,
        borderColor: '#000',
        width: 390,
        height: 50,
        padding: 8,
        borderRadius: 7,
        // fontFamily: "serif"
    },
    dateInput: {
        marginTop: 25,
        marginBottom: 5,
        // height: 50,
        textAlign: 'center',
        // textAlignVertical: 'center',
        fontSize: 15,
        // backgroundColor: 'blanchedalmond'
        // fontFamily: "serif"
    },

    headerText: {
        marginTop: 30,
        fontSize: 15,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 5,
        borderColor: '#000',
        borderRadius: 30,
        textAlign: 'center',
        backgroundColor: 'white',
        // fontFamily: "serif"
    },
    menuContent: {
        color: "#000",
        padding: 2,
        fontSize: 20
    },
    container2: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    item: {
        padding: 5,
        fontSize: 28,
        height: 44,
    },

    button: {
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 20,
        paddingBottom: 20,
        borderWidth: 4
        // fontFamily: "serif"
    },
    lastButton: {
        marginBottom: 50,
        marginLeft: 70,
        marginRight: 70,
        // fontFamily: "serif"
    },
    changeButton: {
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

export default CreateContract;
