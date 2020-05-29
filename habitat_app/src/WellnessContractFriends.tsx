import React from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image, CheckBox} from 'react-native'
import {Dimensions} from 'react-native';
import * as Screens from "./Screens";
import {IP_ADDRESS} from './IP_Address';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


interface State {
    friends: {key: any; name: any;}[];
    screen: any;
    friend: any;
    friendID: any;
    date: any;
    tasks: any[];
    post: false;
}

class WellnessContractFriends extends React.Component<any, State>{

    constructor(props:any){
            super(props);
            this.state = {friendID: this.props.props.friendID,
                friends: [],
                screen: Screens.WellnessContractFriends,
                friend: props.props.friend,
                date: props.props.date,
                tasks: props.props.tasks,
                post: false};
    }


    getFriends = async() => {
        const response = await fetch(`http://${IP_ADDRESS}:3000/createContract/getFriends`);
        const body = await response.json();
        if(response.status != 200) {
            console.error(body.message);
        }
        return body;
    }



    componentDidMount() {
        this.getFriends().then(res => {
            var newFriends:{key: any; name: any;}[] = [];
            res.forEach((element: { _id: any; name: any; }) => {
                var temp = {key: element._id, name: element.name};
                newFriends.push(temp);
            });
            this.setState({friends: newFriends});
        });
    }

    updateScreen(getFriend:boolean, index?:any) {
        if(getFriend)
        {
            this.setState({friend: this.state.friends[index].name});
            this.setState({friendID: this.state.friends[index].key});
        }
        this.props.routeTo(Screens.CreateContract, this.state)
    }

    editAlert(index: number){
        Alert.alert("", "Select this friend?", [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "Select", onPress: () => this.updateScreen(true, index)}

            ]

        )
    }

    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) =>{
        return(
            <View style={styles.itemView}>
                <TouchableOpacity onPress={() => this.editAlert(index)}>
                    <View style={styles.item}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )};

    render(){
        return(
            <View style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Select Friend</Text>
        </View>

        <View style={styles.listContainer}>
        <View style={{flex: 9}}>
        <FlatList
            data={this.state.friends}
            renderItem={({ item, index }) => this.Item(item.name, index)}

        />
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <TouchableOpacity style={{flex: 1, borderWidth: 5, borderLeftWidth: 0}} onPress={() => this.updateScreen(false)}>
        <Image source={require ('./assets/back.png') } style={styles.TouchableOpacityStyle}/>
        </TouchableOpacity>
        <View style={{flex: 4, opacity: 0}}>

        </View>
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
export default WellnessContractFriends;
