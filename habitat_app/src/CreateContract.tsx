import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar, TextInput, Button,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const CreateContract = () => {
    function doSomething() {

    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Create Contract</Text>
                <Text >
                    Task Name
                    <TextInput placeholder="Task" style={styles.titleInput}/>
                </Text>
                <Text >
                    Frequency
                    <TextInput placeholder="Daily"/>
                </Text>
                <Text >
                    Friend to Invite
                    <TextInput/>
                </Text>
                <View style={styles.buttonContainer}>
                    <Button onPress={doSomething} title="Create Contract">Create Contract</Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonContainer: {
        marginTop: 100
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
    descriptionInput: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        width: 390,
        height: 150,
        padding: 8,
        borderRadius: 7
    }
});

export default CreateContract;