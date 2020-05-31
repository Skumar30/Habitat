import React, {useLayoutEffect} from 'react';
import {Modal, Text, View, SectionList, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight, Image, CheckBox} from 'react-native'
import {Dimensions} from 'react-native';
import * as Screens from "./Screens";
import {IP_ADDRESS} from './IP_Address';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface State {
    checked: boolean[]
    allTasks:{key: any; title: any;}[];
    tasks:{key: any;}[];
    screen: any;
    friend: any;
    friendID: any;
    date: any;
    post: boolean;
    contractId?: any;
}

class EditWellnessContract extends React.Component<any, State>{

    constructor(props:any){
        super(props);

        var checks:boolean[] = [];
        this.state = {checked: checks,
            allTasks: [],
            tasks: this.props.props.tasks,
            screen: Screens.EditWellnessContract,
            date: this.props.props.date,
            friend: this.props.props.friend,
            friendID: this.props.props.friendID,
            post: this.props.props.post,
            contractId: this.props.props.contractId};
    }

    getTasks = async() => {
        const response = await fetch(`http://${IP_ADDRESS}:3000/createContract/getTasks`);

        const body = await response.json();
        if(response.status != 200) {
            console.error(body.message);
        }
        return body;
    };

    componentDidMount() {

        this.getTasks().then(res => {
            var tasks:{key: any; title: any;}[] = [];
            res.forEach((element: { _id: any; title: any; }) => {
                var temp = {key: element._id, title: element.title};
                tasks.push(temp);
            });
            this.setState({allTasks: tasks});
            var temp:boolean[] = [];
            for(var i = 0; i < this.state.allTasks.length; i++) {
                temp[i] = false;
            }
            for(var i = 0; i < this.state.allTasks.length; i++) {
                for(var j = 0; j < this.state.tasks.length; j++) {
                    if(this.state.tasks[j] == this.state.allTasks[i].key) {
                        temp[i] = true;
                    }
                }
            }
            this.setState({checked:temp});

        });
    }



    /* Create the individual items for the flatlist */
    Item = (title:string, index:number) => {
        return(
            <View style={styles.itemView}>
                <View style={styles.item}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            <CheckBox
                value={this.state.checked[index]}
                onValueChange={() => {
            var checks = this.state.checked;
            checks[index] = !checks[index];
            this.setState({checked: checks})
        }}/>
        </View>
    )};

    submitForm = async() => {
        this.state.tasks = [];
        for (var i = 0; i < this.state.allTasks.length; i++) {
            if (this.state.checked[i] == true) {

                this.state.tasks.push(this.state.allTasks[i].key);
                }
            }

            if (this.state.post) {

            await fetch(`http://${IP_ADDRESS}:3000/createContract/updateContract`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contractId: this.state.contractId,
                    tasks: this.state.tasks,
                })
            });
        }
        this.props.routeTo(this.props.props.screen, this.state);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={{ flex: 1, alignSelf: 'center' }}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.routeTo(this.props.props.screen, this.state)}>
                            <Image source={require('./assets/back.png')} style={{ width: 50, height: 50, borderRadius: 25 }} />

                        </TouchableOpacity>
                    </View>

                    <Text style={styles.headerText}>Edit Tasks</Text>
                </View>

                <View style={styles.listContainer}>
                    <View style={{ flex: 9 }}>
                        <FlatList
                            data={this.state.allTasks}
                            renderItem={({ item, index }) => this.Item(item.title, index)}
                        />
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, borderWidth: 5, borderLeftWidth: 0 }} onPress={() => this.props.routeTo(this.props.props.screen, this.state)}>
                            <Image source={require('./assets/back.png')} style={styles.TouchableOpacityStyle} />
                        </TouchableOpacity>
                        <View style={{ flex: 4, opacity: 0 }}>
                        </View>
                        <TouchableOpacity style={{ flex: 1, borderWidth: 5, borderRightWidth: 0 }} onPress={this.submitForm}>
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
        // borderRightWidth: 5,
        // borderLeftWidth: 5,
        // borderBottomWidth: 5
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
        fontSize: 30,
        fontWeight: '700',
        color: 'black',
        alignSelf: 'center',
        paddingHorizontal: 5,
        flex: 2.2,
    },
    headerContainer: {
        height: 100,
        backgroundColor: 'rgb(235, 150, 90)',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 10
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
    dateText: { fontSize: 16 },
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
        borderRadius: 50
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
        borderWidth: 5,
    }
})
export default EditWellnessContract;
