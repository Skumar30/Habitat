import React, {useLayoutEffect} from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image, CheckBox} from 'react-native'
import {Header, Button, Icon, Tooltip} from 'react-native-elements'
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept',
    'Oct', 'Nov', 'Dec']

interface State {

    checked: boolean[]
    data: any[] //TODO
}

class EditWellnessContract extends React.Component<{}, State>{

    constructor(props:any){
        super(props);
        var checks  =[]
        var found = false;
        for(var i = 0; i < (User tasks).length; i++){
            for(var j = 0; j < (WC tasks).length; j++){
                if((User task) == (WC task))
                {
                    found = true;
                }
            }
            checks.push(found);
            found = false;
        }
        this.state ={checked: checks, data: FAKE_DATA}
        // TODO REMEMBER TO DO
    }

    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
        console.log(index)
        return(
            <View style={styles.itemView}>
            <CheckBox
                value={this.state.checked[index]}
                onValueChange={() => {
            var checked = this.state.checked
            checked[index] = !checked[index];
            this.setState({checked: checked})
        }}/>
        </View>
    )};

    submitForm = () => {
        // go back to create contract
        // post/update request (?)
    }

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Edit Tasks</Text>
            </View>

            <View style={styles.listContainer}>
                <View style={{flex: 9}}>
        <FlatList
            data={this.state.data} //TODO
            renderItem={({ item, index }) => this.Item(item.title, index)}
            keyExtractor={item => item.id}
        />
        </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex: 1, borderWidth: 5, borderLeftWidth: 0}}>
                        <Image source={require ('./assets/back.png') } style={styles.TouchableOpacityStyle} onPress={}/>
                        // TODO link to CreateContract
                    </TouchableOpacity>
                    <View style={{flex: 4, opacity: 0}}>

                    </View>
                    <TouchableOpacity style={{flex: 1, borderWidth: 5, borderRightWidth: 0}}>
                        <Image source={require ('./assets/plus.png') } style={styles.TouchableOpacityStyle} onPress={this.submitForm}/>
                        // TODO link to CreateContract
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
export default EditWellnessContract;
