import React from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image, CheckBox} from 'react-native'
import {Header, Button, Icon, Tooltip} from 'react-native-elements'
import {Dimensions} from 'react-native';
import * as Screens from './Screens';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
                'Oct', 'Nov', 'Dec']


interface State {

  checked: boolean[]
  isToday: boolean
  date: Date
  allData: any[]
  data: any[]
  contract: Contract | null
  countDailyTasks: number
}

interface Task{
  _id: any
  title: string
  due_date: string
  daily: boolean
  start_date: string
  frequency: boolean[]
}

interface Contract{
  _id: string
  participants: string[]
  tasks : string[]
  owner: string
  pending: boolean
  due_date: string
}
const START_DATE = new Date()

class RegTask extends React.Component<any, State>{
  
    constructor(props:any){
      super(props);
      var checks:boolean[]  =[]
      this.state ={date: new Date(), checked: checks, isToday: true, allData: [], data: [], contract: null, countDailyTasks: 0}
    }

    /* Display the alert that allows a user to edit/delete a task */

    editAlert(index: number){
        Alert.alert("Title", "Select an option", [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => this.handleDelete(index),
          },
          { text: "Edit", onPress: () => console.log("Edit Pressed") } //TODO Route to Add Task
        ]
      )
    }

    /* Delete a task from data array */
    handleDelete(index: number) {

      console.log("Delete pressed on" + index)

      let id = this.state.data[index]._id;
      this.deleteTask(id).then(res => {
        console.log(res)
        let data = this.state.data;
        data.splice(index, 1);
        this.setState({data: data})

        let totalData:any = [];
        this.state.allData.forEach(item => {
          if(item._id != id){
            totalData.push(item)
          }
        })
        this.setState({allData: totalData})

        
      })

    }

    /* Create a string for the date */
    dateString(date:Date):string {
      console.log(date.toString());
      var ret = daysInWeek[date.getDay()] + ', ' + months[date.getMonth()] + ' '
                + date.getDate()      
      return ret;
    }

    /* Update state when user navigates to a different day */
    handleDateChange(inc: boolean):void {
      const offset = inc ? 1 : -1
      var date = this.state.date
      date.setDate(date.getDate() + offset)
      var today = this.dateString(date) == this.dateString(START_DATE) ? true : false
      this.setState({date: date, isToday: today})
      this.updateStateData(this.state.allData)
    }

    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
      console.log(index) 
      var disabled = !this.state.isToday
      return(
        <View style={styles.itemView}>
          <TouchableOpacity onPress={() => this.editAlert(index)}>
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
          <CheckBox 
            value={this.state.checked[index]}
            onValueChange={() => {
                if( disabled) 
                  return
                var checked = this.state.checked
                checked[index] = !checked[index];
                this.setState({checked: checked})
                this.toggleTaskComplete(checked[index], index);
            }}/>
        </View>
     )};
    
     toggleTaskComplete(complete:boolean, index:number){

      var task = this.state.data[index]
      var inWellnessContract = false
      var numTasks = this.state.data.length + this.state.countDailyTasks
      var numContractTasks = this.state.contract != null ? this.state.contract.tasks.length : 1;
      var toAward = 30 //base reward
      toAward += Math.floor(100/numTasks) // all task completion reward
      if(this.state.contract != null && this.state.contract.tasks.length > 0){
      this.state.contract.tasks.forEach((element:any) => {
        console.log(task._id, "and", element)
        if( task._id == element){
          inWellnessContract = true;
        }
      });
    }
      else{
        console.log("YO")
      }
    

      toAward += inWellnessContract ? (15 + Math.floor(100/numContractTasks)) : 0

      toAward *= complete ? 1 : -1;

      console.log(toAward)
      
      //now that i have the amount to award:
      //give the user + cash, +.1x happiness
      //give other person
      this.sendRewards(toAward)

     }
    componentDidMount(){
      this.getTaskData().then(res => {
        console.log(res)
        this.setState({allData: res})
        //find the data for the list
        let dailyCount = 0;
        let currDate = new Date();
        res.forEach( (element:Task) => {

          if(element.daily && (new Date(element.start_date) <= currDate)
             && (currDate <= new Date(element.due_date))){
              dailyCount++
          }
        })
        this.setState({countDailyTasks: dailyCount})
       this.updateStateData(res) 
      })

      this.getContractData().then((res:Contract) => {
        this.setState({contract: res})
        console.log(res.tasks)
      })
     }  



     sendRewards = async(num:number) => {
       
      let toSend = {points: num}
      
      const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend)
    };

      try{
        const response = await fetch('http://10.0.0.10:3000/sendRewards', settings)
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }    
      

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

      try{
        const response = await fetch('http://10.0.0.10:3000/deleteTask', settings)
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }    
      

    }

    getTaskData = async () => {
       const response = await fetch('http://10.0.0.10:3000/myTask');
       const body = await response.json();
       if (response.status !== 200) {
        console.error(body.message) 
      }
  
       return body;
     }

     getContractData = async () => {
      const response = await fetch('http://10.0.0.10:3000/tasksInContract');
      const body = await response.json();
      if (response.status !== 200) {
       console.error(body.message) 
     }
 
      return body;
    }

    updateStateData(res:any[]):void {
      let newData:any[] = [];
      res.forEach((element : Task) => {

        let startDate = new Date(element.start_date);
        let endDate = new Date(element.due_date);
        let day = this.state.date.getDay();
        console.log("The day is ", element.frequency[day], "and the daily is", element.daily)
        console.log("Today is", this.state.date)
        console.log("start", startDate);
        console.log("end", endDate)

        console.log(startDate <= this.state.date, endDate >= this.state.date)
        if(startDate <= this.state.date && endDate >= this.state.date){// start and end dates are valid 
          if(!element.daily  && (element.frequency[this.state.date.getDay()]) ){
            newData.push(element);
          }

        }
        else{
          console.log(element + "is not valid")
        }

      });
      console.log(newData)
      this.setState({data: newData})
  
    }
    
    render(){
        return(
        <View style={styles.container}>
          <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Your Tasks</Text>
          </View>
          <View style={styles.dateContainer}>
            <Icon 
              name='arrow-left'
              onPress={() => this.handleDateChange(false)}
              type='simple-line-icon'
              size={12}
              containerStyle={styles.icon}
              solid={true} />
            <Text style={styles.dateText}> 
              {this.state.isToday ? "Today" : this.dateString(this.state.date)} 
            </Text>
            <Icon 
              containerStyle={styles.icon}
              name='arrow-right'
              onPress={() => this.handleDateChange(true)}
              type='simple-line-icon'
              size={12} />           
          </View>
          <View style={styles.listContainer}>
            <View style={{flex: 9}}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => this.Item(item.title, index)}
                keyExtractor={item => item._id}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1, borderWidth: 5, borderLeftWidth: 0}}
                                onPress={() => this.props.routeTo(Screens.Home)}>
                <Image source={require ('./assets/back.png') } style={styles.TouchableOpacityStyle}/>
              </TouchableOpacity>
              <View style={{flex: 4, opacity: 0}}>

              </View>
              <TouchableOpacity style={{flex: 1, borderWidth: 5, borderRightWidth: 0}}>
                <Image source={require ('./assets/plus.png') } style={styles.TouchableOpacityStyle}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'blanchedalmond', 
      borderRightWidth: 5,
      borderLeftWidth: 5,
      borderBottomWidth: 5
    },
    headerText: {
      fontSize: 40,
      fontFamily: 'serif',
      padding: 10
    },
    headerContainer : {
      flex: 0.1,
      backgroundColor: 'skyblue',
      borderTopWidth: 5,
      borderBottomWidth: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    dateContainer : {
      flex: 0.05,
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateText : {fontSize: 16},
    icon : {marginTop: 5},
    itemView: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 8,
      borderColor: 'black', 
      borderWidth: 5, 
      backgroundColor: '#fff', 
      borderRadius: 50,
      width: 350
    },
    item: {
      backgroundColor: '#fff',
      padding: 20, 
      width: 250,
      marginVertical: 8,
      marginHorizontal: 16, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 50
    },
    addContainer: {
      alignSelf:'flex-end', 
      width: 50, 
      height: 50, 
      position: 'absolute', 
      top: windowHeight-100, 
      left: windowWidth-65
    },
    title: {
      fontSize: 18, 
      color: 'black', 
      fontWeight: 'bold'},
    TouchableOpacityStyle: {
      flex: 1,
      resizeMode: 'contain',
      width: 'auto',
      height: 'auto',
      borderWidth: 5,
    }
  })
  export default RegTask;
  