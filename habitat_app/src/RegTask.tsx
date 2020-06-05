import React from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image, } from 'react-native'
import {Header, Button,CheckBox, Icon, Tooltip} from 'react-native-elements'
import {Dimensions} from 'react-native';
import * as Screens from './Screens';
import {IP_ADDRESS} from './IP_Address'
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
      console.log(IP_ADDRESS)
    }

    /* Display the alert that allows a user to edit/delete a task */

    editAlert(index: number){
        Alert.alert("", "Select an option", [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => this.handleDelete(index),
          },
          { text: "Edit", onPress: () => {
            console.log("Edit Pressed")
            let data = this.state.data[index];
            let start = data.start_date;
            let end = data.due_date
            data.due_date = new Date(end)
            data.start_date = new Date(start) 
            let toSend = {data: data,
                          screen: Screens.RegTask}
            this.props.routeTo(Screens.EditTask, toSend)
          }} //TODO Route to Add Task
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
      var ret = daysInWeek[date.getDay()] + ', ' + months[date.getMonth()] + ' '
                + date.getDate()      
      return ret;
    }

    /* Update state when user navigates to a different day */
    handleDateChange(inc: boolean):void {
      const offset = inc ? 1 : -1
      var date = this.state.date
      date.setDate(date.getDate() + offset)
      date.setHours(0,0,0)
      var today = this.dateString(date) == this.dateString(START_DATE) ? true : false
      this.setState({date: date, isToday: today})
      this.updateStateData(this.state.allData)
    }

    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
      console.log(index) 
      var disabled = !this.state.isToday
      console.log("IS it disabled?", disabled)
      return(
        <View style={styles.itemView}>
          <TouchableOpacity onPress={() => this.editAlert(index)}>
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
          <CheckBox 
            checked={this.state.checked[index]}
            //disabled={disabled && !this.state.data[index].oneTimeOnly}
            onPress={() => {
              //if()
              if(disabled && !this.state.data[index].oneTimeOnly){
                Alert.alert('Invalid completion', 'Repeating tasks cannot be marked complete in advance', [{text: 'OK'}])
                let checked = this.state.checked;
                checked[index] = false
                this.setState({checked: checked})
                return
              }
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

      // Wellness contract ones are not implemented
      /*
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
      */
      toAward *= complete ? 1 : -1;

      console.log(toAward)
      
      //now that i have the amount to award:
      //give the user + cash, +.1x happiness
      //give other person
      this.sendRewards(toAward, "sendCash")
      this.sendRewards(toAward, "sendHappiness")
      let date = new Date()
      let oneTimeOnly = this.state.data[index].oneTimeOnly

      if(!oneTimeOnly)
      this.markAsComplete(index, complete, date)
      else{
        this.markAsComplete(index, complete, date, oneTimeOnly)
      }
      let allData = this.state.allData;
      if(complete){
        allData.forEach((element,ind) => {
          if (element._id == this.state.data[index]._id){
            console.log(date)
            element.datesCompleted.push(date)
            console.log(this.state.allData[ind])
          }
        })
        this.setState({allData: allData})
      }
      else{
        let task = this.state.data[index]
        if(this.state.data[index].oneTimeOnly){
          let tempData = this.state.data;

          tempData[index].datesCompleted = []
          this.setState({data: tempData})
        }
        else{
        allData = this.state.allData
        allData.forEach((element) => {
          if (element._id == this.state.data[index]._id){
            element.datesCompleted.forEach((date:string, index:number) => {
              let currDate = new Date(date)
              if(this.dateString(currDate) == this.dateString(this.state.date)){
                
                element.datesCompleted.splice(index)
              }
            })
          }
        })
        this.setState({allData: allData})
      }
      }
     }

    markAsComplete = async(index:number, complete:boolean, date:Date, oneTimeOnly:boolean = false) => {
       
      let toSend = {task_id: this.state.data[index]._id,
                    complete: complete,
                    date: date,
                    oneTimeOnly: oneTimeOnly}

      if(!complete){
        //find the date that I want to remove
        let task = this.state.data[index]

        task.datesCompleted.forEach((element:string) => {
          let currDate = new Date(element)
          if(this.dateString(currDate) == this.dateString(this.state.date)){
            toSend.date = currDate
          }
        });
      }
      
      const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend)
    };

      try{
        const response = await fetch(`http://${IP_ADDRESS}:3000/regTask/taskCompleted`, settings)
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }    
      

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

        this.getContractData().then((res2:Contract) => {
          this.setState({contract: res2})
          this.updateStateData(res, res2) 
        })

      })

      
     }  



    sendRewards = async(num:number, url:string) => {
       
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
        const response = await fetch(`http://${IP_ADDRESS}:3000/regTask/`+url, settings)
        const data = await response;
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
        const response = await fetch(`http://${IP_ADDRESS}:3000/regTask/deleteTask`, settings)
        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
      }    
      

    }

    getTaskData = async () => {
       const response = await fetch(`http://${IP_ADDRESS}:3000/regTask/myTask`);
       const body = await response.json();
       if (response.status !== 200) {
        console.error(body.message) 
      }
  
       return body;
     }

    getContractData = async () => {
      const response = await fetch(`http://${IP_ADDRESS}:3000/regTask/tasksInContract`);
      const body = await response.json();
      if (response.status !== 200) {
       console.error(body.message) 
     }
 
      return body;
    }

    updateStateData(res:any[], res2:Contract|undefined=undefined):void {
      let newData:any[] = [];
      res.forEach((element : Task) => {

        let startDate = new Date(element.start_date);
        let endDate = new Date(element.due_date);
        let day = this.state.date.getDay();
        let oneTimeOnly = true
        element.frequency.forEach((element:boolean) => {
          if(element == true)
            oneTimeOnly = false;
        });
        console.log(oneTimeOnly)
        let newElem:any = element;
        newElem.oneTimeOnly = oneTimeOnly
        if(/*startDate <= this.state.date &&*/ endDate >= this.state.date ){// start and end dates are valid 
          if(!element.daily  && (element.frequency[this.state.date.getDay()] || (oneTimeOnly && 
                (this.dateString(this.state.date) == this.dateString(endDate)))) ){
            newData.push(newElem);
          }

        }
        else{
          console.log(element.title + "is not valid")
        }

      });
      if(res2 != undefined){
        res2.tasks.forEach(element => {
          newData.forEach((otherItem,index) => {
            if(element == otherItem._id){
              newData.splice(index)
            }
          })
        })
      }
      var checks:boolean[] = []
      let today = this.state.date
      newData.forEach((element, index) => {
        checks[index] = false;
        let oneTimeOnly = true
        element.frequency.forEach((element:boolean) => {
          if(element)
            oneTimeOnly = false;
        });

        element.datesCompleted.forEach((date:string) => {
          let actual = new Date(date)

          if(oneTimeOnly){
            checks[index] = true
          }
          else if(this.dateString(today) == this.dateString(actual)){
            checks[index] = true;
          }
        })
      })
      this.setState({data: newData, checked: checks})
  
    }


    render() {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
  
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TouchableOpacity onPress={() => this.props.routeTo(Screens.Home)} style={styles.backButton}>
                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./assets/back.png')} />
              </TouchableOpacity>
            </View>
  
            <Text style={styles.headerText}>  Tasks</Text>
  
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TouchableOpacity style={[styles.backButton, { backgroundColor: 'rgb(176, 239, 179)' }]}
                onPress={() => this.props.routeTo(Screens.AddTask, { screen: Screens.RegTask })}
              >
                <Image source={require('./assets/plus.png')} style={{ width: 50, height: 50, borderRadius: 25 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <Icon
              name='arrow-left'
              onPress={() => this.handleDateChange(false)}
              type='simple-line-icon'
              size={20}
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
              size={20} />
          </View>
          <View style={styles.listContainer}>
            <View style={{ flex: 9 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item, index }) => this.Item(item.title, index)}
                keyExtractor={item => item._id}
              />
            </View>
            {/* <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={{ flex: 1, borderWidth: 4, borderLeftWidth: 0 }}
                onPress={() => this.props.routeTo(Screens.Home)}>
                <Image source={require('./assets/back.png')} style={styles.TouchableOpacityStyle} />
              </TouchableOpacity>
              <View style={{ flex: 4, opacity: 0 }}>
              </View>
              <TouchableOpacity style={{ flex: 1, borderWidth: 5, borderRightWidth: 0 }}
                onPress={() => this.props.routeTo(Screens.AddTask, { screen: Screens.RegTask })}
              >
                <Image source={require('./assets/plus.png')} style={styles.TouchableOpacityStyle} />
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blanchedalmond',
    },
    headerText: {
      flex: 2,
      fontSize: 35,
      fontWeight: '700',
      color: 'black',
      alignSelf: 'center',
      paddingHorizontal: 70,
    },
    headerContainer: {
      backgroundColor: 'skyblue',
      borderBottomWidth: 4,
      flexDirection: 'row',
      paddingHorizontal: 15,
      height: 100
    },
    dateContainer: {
      flex: 0.05,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      flex: 1,
      alignItems: 'center',
    },
    dateText: { fontSize: 24 },
    icon: { marginTop: 5 },
    itemView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
      borderColor: 'black',
      borderWidth: 4,
      backgroundColor: '#fff',
      borderRadius: 25,
      width: 370
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
      borderRadius: 25
    },
    addContainer: {
      alignSelf: 'flex-end',
      width: 50,
      height: 50,
      position: 'absolute',
      top: windowHeight - 100,
      left: windowWidth - 65
    },
    title: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold'
    },
    TouchableOpacityStyle: {
      flex: 1,
      resizeMode: 'contain',
      width: 'auto',
      height: 'auto',
      borderWidth: 4,
    },
    backButton: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgb(110, 192, 178)',
      borderRadius: 15,
      borderWidth: 4,
      height: 60,
      width: 60,
    },
  })
  export default RegTask;