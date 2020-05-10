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

    var currDate = "01/01/2020";

    function doSomething() {

    }

    function updateFriend({friend}: {friend: any}) {
        changeCurrFriend(friend);
    }

    function displayDate() {
        currDate = date.toDateString();
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

    // @ts-ignore
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.titleText}>Create Contract</Text>

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
                            <MenuOption value={'Darin'} onSelect={doSomething}>
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
                    Current Due Date is {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button onPress={showDatepicker} title="Change Due Date" />
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
                <View style={styles.buttonContainer}>
                    <Button onPress={doSomething} title="Create Contract">Create Contract</Button>
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={doSomething} title="Cancel">Cancel</Button>
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
        marginTop: 20,
    },
    container: {
        marginTop: 10,
        flex: 2,
        backgroundColor: '#FFF44F',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        marginBottom: 10,
    },
    titleInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        width: 390,
        height: 50,
        padding: 8,
        borderRadius: 7
    },
    dateInput: {
        marginTop: 10,
        width: 390,
        height: 50,
        padding: 8,
        borderRadius: 7,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
    },

    headerText: {
        fontSize: 20,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 7,
        textAlign: 'center',
        backgroundColor: '#58CEDF'
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
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    body: {
        backgroundColor: '#FC886F',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '600',
        color: 'white',
    },
    sectionDescription: {
        marginTop: 8,
        marginBottom: 8,
        fontSize: 24,
        fontWeight: '400',
        color: 'white',
    },

    centerText: {
        textAlign: 'center',
    },

    emptyMessageStyle: {
        textAlign: 'center',
        fontSize: 28,
        marginTop: '50%',
    },

// MODAL STYLE
    centeredView: {
        flex: 1,
        marginTop: 45,
    },
    modalView: {
        margin: 20,
        width: 375,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    addButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 25,
    },

    buttonSeparation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },

    inputTxt: {
        height: 35,
        width: 200,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        textAlign: 'center',

    },

    centerThis: {
        alignSelf: 'center',
    },
});

export default CreateContract;