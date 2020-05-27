import React, {Component} from 'react';
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

interface State {
    checked: boolean[]
    streaks: number[]
    tasks: any[]
    completes: string[]
    contract: Contract | null
    inContract: boolean[]
}

interface Task{
    id: any
    title: string
    due_date: string
    daily: boolean
    streak: number
    frequency: boolean[]
    start_date: string
    datesCompleted: string[]
}

interface Contract{
    _id: string
    participants: string[]
    tasks : string[]
    owner: string
    pending: boolean
    due_date: string
}

const TODAY = new Date();
var month = TODAY.getUTCMonth() + 1; //months from 1-12
var day = TODAY.getUTCDate();
var year = TODAY.getUTCFullYear();
var newdate;

if (month < 10) {
    newdate = year + "-0" + month + "-" + day;
}
else{
    newdate = year + "-" + month + "-" + day
}

class DailyScreen extends Component {
    constructor(props){
        super(props);
        var checks:boolean[] = [];
        var bonus:boolean[] = [];
        this.state = { checked: checks, streaks: [], tasks: [], contract: null, inContract: bonus}
    }

    getDailies = async() => {
        const response = await fetch('http://192.168.1.81:3000/getDailies');
        const body = await response.json();
        if (response.status !== 200) {
            console.error(body.message)
        }
        return body;
    }

    getContract = async() => {
        const response = await fetch('http://192.168.1.81:3000/getContract');
        const body = await response.json();
        if (response.status !== 200) {
            console.error(body.message)
        }
        return body;
    }

    updateState(res:any[]):void {
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
        this.setState({tasks: data});
        this.setState({streaks: streak});
        this.setState({completes: complete});
        this.setState( {inContract: bonus});

        for ( var i = 0; i < complete.length; i++){
            if( complete[i] != []){
                var date1 = complete[i].toString();
                date1 = date1.substring(0,10);
            }
            else{
                date1 = "";
            }

            /*
            console.log(complete[i]);
            console.log(complete[i].toString());
            console.log("after date1");
            console.log(date1);
            console.log("above comparison");
            console.log(today, date1, newdate);
            console.log(newdate == date1);
            */

            if( newdate == date1){
                this.state.checked[i] = true;
            }
            else{
                this.state.checked[i] = false;
            }
        }
        console.log(this.state.checked);
    }

    updateContract (res:Contract|undefined=undefined):void{
        if(res != undefined){
            console.log(res.tasks.length);

            for (var i = 0; i < this.state.tasks.length; i++){
                console.log("inside contractUpdate");
                console.log(res.tasks[i]);
                console.log(this.state.tasks[i]._id);

                console.log("above 2nd loop");
                console.log(this.state.tasks.length);
                for (var j = 0; res.tasks.length; j++){
                    if( res.tasks[j] == this.state.tasks[i]._id){
                        console.log("inside 2nd loop");
                        this.state.inContract[i] = true;
                        console.log(res.tasks[j]);
                    }
                }
                console.log(this.state.inContract);
            }
        }
    }

    componentDidMount(){
    this.getDailies().then(res => {
        this.setState({tasks: res});
        this.updateState(res);
        console.log(this.state.inContract);
        })

    this.getContract().then(res1 => {
        this.setState({contract: res1})
        this.updateContract(res1)
        console.log(this.state.inContract);
    });

    }


    alert(index: number){
        Alert.alert("Title", "Select an option", [
                {
                    text: "Cancel"
                },
                {
                    text: "Delete",
                    onPress: () => this.handleDelete(index)
                },
                { text: "Edit", onPress: () => {
                        console.log("Edit Pressed")
                        let toSend = {data: this.state.tasks[index],
                            screen: Screens.DailyScreen}
                        this.props.routeTo(Screens.EditTask, toSend) } }
            ]
        )
    }

    /* Delete a task from data array */
    handleDelete(index: number) {

        console.log('inside handleDelete');
        let id = this.state.tasks[index]._id;
        console.log(id);

        console.log('before deleteTask');
        this.deleteTask(id).then(res => {
            console.log(res)
        });

        console.log('after deleteTask');
    }

    deleteTask = async(id:string) => {

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

        console.log('above deleteTask try');
        try {
            const response = await fetch('http://192.168.1.81:3000/deleteTask', settings);
            //console.log(response);
            //const data = await response.json();
            //console.log(data);
            //return data;
        } catch (e) {
            console.log( " Error for deleteTask ");
        }

        this.getDailies().then(res => {
            this.setState({tasks: res})
            this.updateState(res)
        })

        console.log("returning to handle");
    }

        /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
        return(
            <View>
                <TouchableOpacity onPress={() => this.alert(index)}>
                    <View style={[styles.body]}>
                        <Text >{title}</Text>
                        <Text >{this.state.streaks[index]}</Text>
                        <CheckBox
                            value={this.state.checked[index]}
                            onValueChange={() => {
                                var checked = this.state.checked
                                checked[index] = !checked[index];
                                this.setState({checked: checked})
                                if( this.state.checked[index] == true){
                                    this.incrementStreak(index);
                                }
                                else{
                                    this.decrementStreak(index);
                                }
                            }}/>
                    </View>
                </TouchableOpacity>
            </View>
        )};

    incrementStreak = async(index: number) => {
        this.complete(index);
        this.state.streaks[index] = this.state.streaks[index] + 1;

        console.log("above increment Daily");
        console.log(this.state.tasks[index]._id);
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {streak: this.state.streaks[index],
                        id: this.state.tasks[index]._id ,
                        inContract: this.state.inContract[index]
                })
        };

        try{
            const response = await fetch('http://192.168.1.81:3000/incrementStreak', settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    decrementStreak = async(index: number) =>{
        this.incomplete( index );
        this.state.streaks[index] = this.state.streaks[index] - 1;
        //const response = await fetch('http://192.168.1.81:3000/deleteTask', settings);
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {streak: this.state.streaks[index],
                       id: this.state.tasks[index]._id,
                       inContract: this.state.inContract[index]
                })
        };

        try{
            const response = await fetch('http://192.168.1.81:3000/decrementStreak', settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    complete = async(index: number) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {id: this.state.tasks[index]._id,
                        date: TODAY
                }
            )
        };
        try{
            const response = await fetch('http://192.168.1.81:3000/complete', settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    incomplete = async(index: number) => {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {id: this.state.tasks[index]._id,
                    date: TODAY
                }
            )
        };
        try{
            const response = await fetch('http://192.168.1.81:3000/incomplete', settings)
            const data = await response.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
         <>

        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={[styles.header]}>
              <Text style={styles.textBox}>Dailies</Text>
          </View>

          <View style={[styles.container]}>
              <ScrollView style={{flex: 1}}>
                  <FlatList
                      data={this.state.tasks}
                      renderItem={({ item, index }) => this.Item(item.title, index)}
                      keyExtractor={item => item._id}
                  />
              </ScrollView>

              <View style={{flex: 0.15, flexDirection: 'row'}}>
                <TouchableOpacity style={{flex: 1, borderWidth: 5, borderLeftWidth: 0}}
                                  onPress={() => this.props.routeTo(Screens.Home)}>
                  <Image source={require ('./assets/back.png') } style={styles.TouchableOpacityStyle}/>
                </TouchableOpacity>
                <View style={{flex: 4, opacity: 0}}>
                </View>
                <TouchableOpacity style={{flex: 1, borderWidth: 5, borderRightWidth: 0}}
                                  onPress={() => this.props.routeTo(Screens.AddTask, {screen: Screens.RegTask})}>
                  <Image source={require ('./assets/plus.png') } style={styles.TouchableOpacityStyle}/>
                </TouchableOpacity>
              </View>
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
    borderWidth: 5,
    borderTopWidth: 0
  },
    textBox: {
        fontSize:40,
        fontFamily: "serif",
    },
    card: {
        fontSize:30,
        fontFamily: "serif",
    },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#b4ecb4',
    borderWidth: 5
  },

  body:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    marginVertical: 20,
    marginHorizontal: 20,
    borderColor: '#000000',
    borderWidth: 5,
    flexDirection: 'row'
  },

TouchableOpacityStyle: {
  flex: 1,
  resizeMode: 'stretch',
  width: 'auto',
  height: 'auto'
}


});

export default DailyScreen;
