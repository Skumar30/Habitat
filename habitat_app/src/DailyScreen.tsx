import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    TextInput,
    Text,
    CheckBox,
    Header,
    ScrollView,
    Container,
    Card,
    CardItem,
    Platform,
    Animated,
    Button,
    TouchableOpacity,
    UIManager, FlatList, Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Screens from './Screens';
import TaskCard from "./TaskCard";
import { IP_ADDRESS } from './IP_Address';

interface State {
    checked: boolean[]
    streaks: number[]
    tasks: any[]
    completes: string[]
    contract: Contract | null
    inContract: boolean[]
}

interface Task {
    id: any
    title: string
    due_date: string
    daily: boolean
    streak: number
    frequency: boolean[]
    start_date: string
    datesCompleted: string[]
}

interface Contract {
    _id: string
    participants: string[]
    tasks: string[]
    owner: string
    pending: boolean
    due_date: string
}
const TODAY = new Date();

class DailyScreen extends Component<any, any> {
    constructor(props: any) {
        super(props);
        var checks: boolean[] = [];
        var bonus: boolean[] = [];
        this.state = { checked: checks, streaks: [], tasks: [], completes: [], contract: null, inContract: bonus }
    }

    getDailies = async () => {
        const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/getDailies`);
        const body = await response.json();
        if (response.status !== 200) {
            console.error(body.message)
        }
        //console.log("in getDailies");
        //console.log(body);
        return body;
    }

    getContract = async () => {
        const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/getContract`);
        const body = await response.json();
        if (response.status !== 200) {
            console.error(body.message)
        }
        return body;
    }

    updateState(res: any[]): void {
        console.log("in updateState");
        let data: any[] = [];
        let streak: any[] = [];
        let complete: any[] = [];
        let bonus: any[] = [];
        res.forEach((element: Task) => {
            data.push(element);
            streak.push(element.streak);
            complete.push(element.datesCompleted);
            bonus.push(false);
        });
        this.setState({ tasks: data });
        this.setState({ streaks: streak });
        this.setState({ completes: complete });
        this.setState({ inContract: bonus });
        this.updateCheckbox();
    }

    updateContract(res: Contract | undefined = undefined): void {
        if (res != undefined) {
            console.log(res.tasks.length);

            for (var i = 0; i < this.state.tasks.length; i++) {
                console.log("inside contractUpdate");
                console.log(res.tasks[i]);
                console.log(this.state.tasks[i]._id);

                console.log("above 2nd loop");
                console.log(this.state.tasks.length);
                for (var j = 0; res.tasks.length; j++) {
                    if (res.tasks[j] == this.state.tasks[i]._id) {
                        console.log("inside 2nd loop");
                        this.state.inContract[i] = true;
                        console.log(res.tasks[j]);
                    }
                }
                console.log(this.state.inContract);
            }
        }
    }

    updateCheckbox() {
        const TODAY = new Date();
        var month = TODAY.getUTCMonth() + 1; //months from 1-12
        var day = TODAY.getUTCDate();
        var year = TODAY.getUTCFullYear();
        var newdate;
        let checked = []
        if (month < 10) {
            newdate = year + "-0" + month + "-" + day;
        }
        else {
            newdate = year + "-" + month + "-" + day
        }

        for (var i = 0; i < this.state.tasks.length; i++) {
            if (this.state.completes[i] != []) {
                var date1 = this.state.completes[i].toString();
                date1 = date1.substring(0, 10);
            }
            else
                date1 = "";

            if (newdate == date1)
                checked.push(true);
            else {
                checked.push(false);
            }
        }
        this.setState({ checked: checked })
        //console.log("inside updateCheckBox");
        //console.log(this.state.checked[0]);

    }

    checkStreak() {
        // Get Today's date in string format
        var TODAY = new Date();
        var month1 = TODAY.getUTCMonth() + 1; //months from 1-12
        var day1 = TODAY.getUTCDate();
        var year1 = TODAY.getUTCFullYear();
        var today;

        if (month1 < 10) {
            today = year1 + "-0" + month1 + "-" + day1;
        }
        else {
            today = year1 + "-" + month1 + "-" + day1;
        }

        // Get Yesterday's date in string format
        var YESTERDAY = new Date();
        YESTERDAY.setDate(TODAY.getDate() - 1);
        var month2 = YESTERDAY.getUTCMonth() + 1; //months from 1-12
        var day2 = YESTERDAY.getUTCDate();
        var year2 = YESTERDAY.getUTCFullYear();
        var yesterday;

        if (month2 < 10) {
            yesterday = year2 + "-0" + month2 + "-" + day2;
        }
        else {
            yesterday = year2 + "-" + month2 + "-" + day2;
        }

        // Go through each task and their last completed day
        for (var i = 0; i < this.state.tasks.length; i++) {
            var lastDay = this.state.tasks[i].datesCompleted[this.state.tasks.datesComplete.length - 1];
            lastDay = lastDay.substring(0, 10);
            console.log(lastDay);

            // If the last completed date was not today or yesterday, streak resets
            if (lastDay == today || lastDay == yesterday)
                console.log(lastDay);
            // Else, reset streak
            else {
                this.state.tasks[i].streak = 0;
                this.updateStreak(i);
            }
        }
    }

    updateStreak = async (index: number) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    streak: 0,
                    id: this.state.tasks[index]._id
                }
            )
        };
        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/updateStreak`, settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getDailies().then(res => {
            this.setState({ tasks: res });
            this.updateState(res);
            //this.checkStreak();
        });

        console.log("after getDailies");
        console.log(this.state.tasks);

        this.getContract().then(res1 => {
            this.setState({ contract: res1 })
            //this.updateContract(res1)
        });

        //console.log("tasks");
        console.log(this.state.tasks);
        //console.log("checks");
        console.log(this.state.checked);
    }

    alert(index: number) {
        Alert.alert("Title", "Select an option", [
            {
                text: "Cancel"
            },
            {
                text: "Delete",
                onPress: () => this.handleDelete(index)
            },
            {
                text: "Edit", onPress: () => {
                    console.log("Edit Pressed");
                    this.getDailies().then(res => {
                        this.setState({ tasks: res });
                        this.updateState(res);
                        let data = this.state.tasks[index];
                        let start = data.start_date;
                        let end = data.due_date;
                        data.due_date = new Date(end);
                        data.start_date = new Date(start);
                        let toSend = {
                            data: data,
                            screen: Screens.DailyScreen
                        };
                        this.props.routeTo(Screens.EditTask, toSend);
                    });
                }
            }
        ]
        )
    }

    /* Delete a task from data array */
    handleDelete(index: number) {

        //console.log('inside handleDelete');
        let id = this.state.tasks[index]._id;
        //console.log(id);

        // Removed checkbox for deleted task
        let checked = this.state.checked;
        if (index > -1) {
            checked = checked.splice(index, 1);
        }
        this.setState({ checked: checked });

        // Remove streak for deleted task
        let streaks = this.state.streaks;
        if (index > -1) {
            streaks = streaks.splice(index, 1);
        }
        this.setState({ streaks: streaks });

        //console.log('before deleteTask');
        this.deleteTask(id).then(res => {
            console.log(res)
        });

        //console.log('after deleteTask');
    }

    deleteTask = async (id: string) => {

        console.log("My id is", id)
        const settings = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                my_id: id
            })
        };

        //console.log('above deleteTask try');
        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/deleteTask`, settings);
            //console.log(response);
            const data = await response.json();
            //console.log(data);
            return data;
        } catch (e) {
            console.log(" Error for deleteTask ");
        }

        this.getDailies().then(res => {
            this.setState({ tasks: res })
            this.updateState(res)
        })

        //console.log("returning to handle");
    }

    /* Create the individual items for the flatlist */
    Item = (title: string, index: number) => {
        console.log("the index is", index)
        console.log("the len s", this.state.checked.length)
        console.log("index: " + this.state.checked[index]);
        console.log("double equal");
        console.log(this.state.checked[index] == true);
        console.log("triple equal: ");
        console.log(this.state.checked[index] === true);
        console.log("what is checked " + this.state.checked[index]);
        console.log("totalData")
        return (
            <View style={styles.itemView}>
                <TouchableOpacity onPress={() => this.alert(index)}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', paddingTop: 7 }}>
                            STREAK  <Text style={{ fontSize: 15, fontWeight: '500' }}>{this.state.streaks[index]}</Text>
                        </Text>
                        <CheckBox
                            value={this.state.checked[index] == true}
                            onValueChange={() => {
                                var checked = this.state.checked;
                                checked[index] = !checked[index];
                                this.setState({ checked: checked });
                                if (this.state.checked[index] == true) {
                                    this.incrementStreak(index);
                                }
                                else {
                                    this.decrementStreak(index);
                                }
                            }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    // <<<<<<< HEAD
    //     /* Create the individual items for the flatlist */
    //     Item = (title: string, index: number) => {
    //         return (
    //             <View style={styles.itemView}>
    //                 <TouchableOpacity onPress={() => this.alert(index)}>
    //                     <View style={styles.item}>
    //                         <Text style={styles.title}>{title}</Text>
    //                         <Text style={{ fontSize: 14, fontWeight: '400', textAlign: 'left', paddingTop: 7 }}>
    //                             STREAK  <Text style={{ fontSize: 15, fontWeight: '500' }}>{this.state.streaks[index]}</Text>
    //                         </Text>
    // =======
    //         /* Create the individual items for the flatlist */
    //     Item = (title:string, index:number) =>{
    //         console.log("the index is", index)
    //         console.log("the len s", this.state.checked.length)
    //         console.log("index: " + this.state.checked[index]);
    //         console.log("double equal");
    //         console.log(this.state.checked[index] == true);
    //         console.log("triple equal: ");
    //         console.log(this.state.checked[index] === true);
    //         console.log("what is checked " + this.state.checked[index]);
    //         console.log("totalData")
    //         return(
    //             <View>
    //                 <TouchableOpacity onPress={() => this.alert(index)}>
    //                     <View style={[styles.body]}>
    //                         <Text >{title}</Text>
    //                         <Text>{"   streak:"}</Text>
    //                         <Text >{this.state.streaks[index]}</Text>
    //                         <CheckBox
    //                             value={this.state.checked[index] == true}
    //                             onValueChange={() => {
    //                                 var checked = this.state.checked;
    //                                 checked[index] = !checked[index];
    //                                 this.setState({checked: checked});
    //                                 if( this.state.checked[index] == true){
    //                                     this.incrementStreak(index);
    //                                 }
    //                                 else{
    //                                     this.decrementStreak(index);
    //                                 }
    //                             }}/>
    // >>>>>>> a27a291aae6c9349ea1ea6b4588b64a8ae573c45
    //                     </View>
    //                 </TouchableOpacity>
    //                 <CheckBox
    //                     value={this.state.checked[index]}
    //                     onValueChange={() => {
    //                         var checked = this.state.checked;
    //                         checked[index] = !checked[index];
    //                         this.setState({ checked: checked });
    //                         if (this.state.checked[index] == true) {
    //                             this.incrementStreak(index);
    //                         }
    //                         else {
    //                             this.decrementStreak(index);
    //                         }
    //                     }} />
    //             </View>
    //         )
    //     };

    incrementStreak = async (index: number) => {
        //this.complete(index);
        let dates = this.state.tasks;
        dates[index].datesCompleted.push(new Date());
        this.setState({ tasks: dates });

        let tasks = this.state.tasks;
        tasks[index].streak = tasks[index].streak + 1;
        this.setState({ tasks: tasks });

        //this.state.tasks[index].streak = this.state.streaks[index] + 1;

        let streak = this.state.streaks;
        streak[index] = streak[index] + 1;
        this.setState({ streaks: streak });
        //this.state.streaks[index] = this.state.streaks[index] + 1;

        //console.log("above increment Daily");
        //console.log(this.state.tasks[index]._id);
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    streak: this.state.streaks[index],
                    taskId: this.state.tasks[index]._id,
                    contractId: this.state.contract._id
                })
        };

        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/addReward`, settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    decrementStreak = async (index: number) => {
        //this.incomplete( index );
        let dates = this.state.tasks;
        dates[index].datesCompleted.pop();
        this.setState({ tasks: dates });

        let tasks = this.state.tasks;
        tasks[index].streak = tasks[index].streak - 1;
        this.setState({ tasks: tasks });

        //this.state.tasks[index].streak = this.state.streaks[index] + 1;

        let streak = this.state.streaks;
        streak[index] = streak[index] - 1;
        this.setState({ streaks: streak });
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    streak: this.state.streaks[index],
                    taskId: this.state.tasks[index]._id,
                    contractId: this.state.contract._id
                })
        };

        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/removeReward`, settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    complete = async (index: number) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id: this.state.tasks[index]._id,
                    date: TODAY
                }
            )
        };
        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/complete`, settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    incomplete = async (index: number) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    id: this.state.tasks[index]._id,
                    date: TODAY
                }
            )
        };
        try {
            const response = await fetch(`http://${IP_ADDRESS}:3000/dailyTask/incomplete`, settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <>
                <View style={{ flex: 1 }}>
                    <View style={[styles.header]}>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <TouchableOpacity style={styles.backButton}
                                onPress={() => this.props.routeTo(Screens.Home)}>
                                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./assets/back.png')} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.headerText}> Dailies</Text>
                        <View style={{ flex: 1, alignSelf: 'center' }}>
                            <TouchableOpacity style={[styles.backButton, { backgroundColor: 'rgb(176, 239, 179)' }]}
                                onPress={() => this.props.routeTo(Screens.AddTask, { screen: Screens.DailyScreen })}>
                                <Image source={require('./assets/plus.png')} style={{ width: 50, height: 50, borderRadius: 25 }} />
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={[styles.container]}>
                        <ScrollView style={{ flex: 1 }}>
                            <FlatList
                                data={this.state.tasks}
                                renderItem={({ item, index }) => this.Item(item.title, index)}
                                keyExtractor={item => item._id}
                            />
                        </ScrollView>

                        {/* <View style={{ flex: 0.15, flexDirection: 'row' }}>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 5, borderLeftWidth: 0 }}
                                onPress={() => this.props.routeTo(Screens.Home)}>
                                <Image source={require('./assets/back.png')} style={styles.TouchableOpacityStyle} />
                            </TouchableOpacity>
                            <View style={{ flex: 4, opacity: 0 }}>
                            </View>
                            <TouchableOpacity style={{ flex: 1, borderWidth: 5, borderRightWidth: 0 }}
                                onPress={() => this.props.routeTo(Screens.AddTask, { screen: Screens.DailyScreen })}>
                                <Image source={require('./assets/plus.png')} style={styles.TouchableOpacityStyle} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: 'blanchedalmond',
        borderTopWidth: 0,
        alignItems: 'center',
        paddingTop: 20,
    },
    card: {
        fontSize: 30,
    },
    header: {
        backgroundColor: 'rgb(183, 283, 155)',
        borderBottomWidth: 4,
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 100
    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#fff',
        borderRadius: 25,
        width: 380
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        width: 250,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25
    },

    TouchableOpacityStyle: {
        flex: 1,
        resizeMode: 'stretch',
        width: 'auto',
        height: 'auto'
    },

    backButton: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgb(110, 192, 178)',
        borderRadius: 15,
        borderWidth: 4,
        height: 60,
        width: 60,
    },
    headerText: {
        flex: 2,
        fontSize: 35,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'center',
        paddingHorizontal: 70,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },

});

export default DailyScreen;
