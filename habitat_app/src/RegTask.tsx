import React from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image } from 'react-native'
import {Header, Button, Icon, CheckBox, Tooltip} from 'react-native-elements'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
                'Oct', 'Nov', 'Dec']

var FAKE_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Task #1',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'My second task',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Another new task for me',
  },
  {
    id: '1',
    title: 'Oh boy this gonna be a a \nreal long string',
  },
  {
    id: '2',
    title: 'Task #5',
  },
  {
    id: '3',
    title: 'Task #6',
  }
];

interface State {

  checked: boolean[]
  isToday: boolean
  date: Date
  data: any[] //TODO
}

const START_DATE = new Date()

class RegTask extends React.Component<{}, State>{
  
    constructor(props:any){
      super(props);
      var checks  =[]
      for(var i = 0; i < FAKE_DATA.length; i++){
        checks.push(false)
      }
      this.state ={date: new Date(), checked: checks, isToday: true, data: FAKE_DATA}
    }

    /* Display the alert that allows a user to edit/delete a task */

    editAlert(index: number){
        Alert.alert("Title", "Select an options", [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            onPress: () => this.handleDelete(index),
          },
          { text: "Edit", onPress: () => console.log("Edit Pressed") }
        ]
      )
    }

    /* Delete a task from data array */
    handleDelete(index: number) {

      console.log("Delete pressed on" + index)
      var data = (this.state.data.slice(0,index)).concat(this.state.data.slice(index+1))
      this.setState({data: data})
      console.log(data)
    }

    /*Tooltip for help */
    helpToolTip = () => {
      return(

        <Tooltip 
          backgroundColor={'#f7ac4f'}
          skipAndroidStatusBar={true} 
          withOverlay={false} 
          popover={<Text>Click on a task to edit or delete</Text>}>

            <Image source={require('./assets/questionMark.png')}/>
        </Tooltip>
      )
    }

    /* back button, navigation needs to be handled*/
    backButton = () => {
      return(

        <TouchableOpacity onPress={() => console.log("back pressed")}>
          <Image  source={require('./assets/backArrowTransparent.png')} />
        </TouchableOpacity>
      )
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
    }


    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
      console.log(index) 
      var disabled = !this.state.isToday
      return(
        <View style={styles.itemView}>
          <TouchableOpacity disabled={disabled} onPress={() => this.editAlert(index)}>
            <View style={styles.item}>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableOpacity>
          <CheckBox 
            checked={this.state.checked[index]}
            onPress={() => {
                if( disabled) 
                  return
                var checked = this.state.checked
                checked[index] = !checked[index];
                this.setState({checked: checked})
            }}/>
        </View>
     )};
    
    render(){

        return(
        <View style={styles.container}>
          
          <Header 
            containerStyle={styles.headerContainer}
            leftComponent={this.backButton()}
            centerComponent={{ text: 'Your Tasks', style: styles.headerText }}
            rightComponent={this.helpToolTip()}
          />

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

          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) => this.Item(item.title, index)}
            keyExtractor={item => item.id}
          />
          <View style={styles.addContainer}>
            <Icon 
              name='add' 
              type='material'  
              reverse color='#43d151' 
              onPress={() => console.log("Add new task")}
            />
          </View>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#88e3e0', 
      alignItems: 'center'
    },
    headerText: {
      color: '#fff', 
      fontSize: 26
    },
    headerContainer : {
      height: 50
    },
    dateContainer : {
      width: 150, 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      marginTop: 5},
    dateText : {fontSize: 16},
    icon : {marginTop: 5},
    itemView: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginVertical: 8,
      borderColor: 'black', 
      borderWidth: 1, 
      backgroundColor: '#52f2bf', 
      width: 350
    },
    item: {
      backgroundColor: '#52f2bf',
      padding: 20, 
      width: 250,
      marginVertical: 8,
      marginHorizontal: 16, 
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center'
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
      fontWeight: 'bold'}
  })
  export default RegTask;
  