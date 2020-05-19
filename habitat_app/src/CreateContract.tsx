import React, {useState} from 'react';
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

import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

import DateTimePicker from '@react-native-community/datetimepicker';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CreateContract = () => {

    function submitData() {

    }

    function updateFriend({friend}: {friend: any}) {
        changeCurrFriend(friend);
    }

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [friend, changeCurrFriend] = useState('Not Selected');

    // @ts-ignore
    const changeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    function showMode({currentMode}: { currentMode: any }) {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode({currentMode: 'date'});
    };

    function rerouteScreen() {

    }

    // @ts-ignore
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText} >{"Create Contract"}</Text>

                <MenuProvider style={{padding: 30, paddingTop: 50 }}>
                    <Menu >

                        <MenuTrigger  >
                            <Text style={styles.headerText}>Tasks to Add</Text>
                        </MenuTrigger  >

                        <MenuOptions>
                            <MenuOption value={"Login"}>
                                <Text style={styles.menuContent}>Login</Text>
                            </MenuOption>
                            <MenuOption value={"Register"}>
                                <Text style={styles.menuContent}>Register</Text>
                            </MenuOption>
                            <MenuOption value={"Download"}>
                                <Text style={styles.menuContent}>Download</Text>
                            </MenuOption>
                            <MenuOption value={"Logout"}>
                                <Text style={styles.menuContent}>Logout</Text>
                            </MenuOption>
                        </MenuOptions>

                    </Menu>
                </MenuProvider>

                <Text style={styles.dateInput}>
                    Friend to Invite: {friend}
                </Text>
                <MenuProvider style={{paddingLeft: 30, paddingRight:30 }}>
                    <Menu >
                        <MenuTrigger  >
                            <Text style={styles.headerText}>Friend to Invite</Text>
                        </MenuTrigger  >

                        <MenuOptions>
                            <MenuOption value={'Darin'} onSelect={rerouteScreen}>
                                <Text style={styles.menuContent}>Darin</Text>
                            </MenuOption>
                            <MenuOption value={"Register"}>
                                <Text style={styles.menuContent}>Register</Text>
                            </MenuOption>
                            <MenuOption value={"Download"}>
                                <Text style={styles.menuContent}>Download</Text>
                            </MenuOption>
                            <MenuOption value={"Logout"}>
                                <Text style={styles.menuContent}>Logout</Text>
                            </MenuOption>
                        </MenuOptions>

                    </Menu>
                </MenuProvider>


                <Text style={styles.dateInput}>
                    {"Current Due Date is "}{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </Text>
            
                <View style={{flex: 1}}>
                {/* Due Date Picker */}
                <View style={styles.changeButton}>
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
                <TouchableOpacity onPress={submitData}>
                    <Text style={styles.buttonText}>Create Contract</Text>
                </TouchableOpacity>
                </View>
                {/* Back Button */}
                <View style={styles.backButton}>
                <TouchableOpacity onPress={rerouteScreen}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 45,
        fontWeight: "bold",
        textAlign: 'center',
        fontFamily: "serif"
    },
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: 'blanchedalmond',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        marginBottom: 10,
        marginLeft:70,
        marginRight:70,
        fontFamily: "serif"
    },
    titleInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        width: 390,
        height: 50,
        padding: 8,
        borderRadius: 7,
        fontFamily: "serif"
    },
    dateInput: {
        marginTop: 10,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontFamily: "serif"
    },

    headerText: {
        fontSize: 15,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 5,
        borderColor: '#000',
        borderRadius: 30,
        textAlign: 'center',
        backgroundColor: 'white',
        fontFamily: "serif"
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
        fontFamily: "serif"
    },
    lastButton: {
        marginBottom: 50,
        marginLeft:70,
        marginRight:70,
        fontFamily: "serif"
    },
    changeButton: {
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
        fontSize: 20
      }
});

export default CreateContract;