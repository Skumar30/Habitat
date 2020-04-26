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
        <View>
            <View>
                <Text>Create Contract</Text>
                <Text >
                    Task Name
                    <TextInput placeholder="Task"/>
                </Text>
                <Text >
                    Frequency
                    <TextInput placeholder="Daily"/>
                </Text>
                <Text >
                    Friend to Invite
                    <TextInput/>
                </Text>
                <Button onPress={doSomething} title="Create Contract">Create Contract</Button>
            </View>
        </View>
    );
};

export default CreateContract;