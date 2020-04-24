import React from 'react';
import {Modal, Text, View, SectionList } from 'react-native'
class RegTask extends React.Component<any, any>{
  
    constructor(props:any){
      super(props);
    }
    render(){
        const date:string = new Date().toString();
        const tempData = [{title: 'In Progress', data: ["1","2","3"]}, {title:"Completed", data: ["5"]}]

        return(
        <View style={{flex: 1,
            justifyContent: "center",
            marginTop: 22}}>

            <Modal animationType='fade' transparent={true} visible={this.props.show} >
                <View style={{flex: 1,
                justifyContent: 'flex-start', marginTop: '5%'
                }} >
                <View style={{alignItems: 'center'}}>
                <Text>{date} </Text>
                </View>
                
                </View>
            </Modal>
        </View>
      )
    }
  }
  export default RegTask;
  