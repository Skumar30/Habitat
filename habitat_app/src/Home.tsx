import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

class Home extends React.Component {
  render() {
    // Placeholder values to pull from database
    const petName = "Pet Name"
    const playerName = "Joe"
    const friendshipPoints = 1312;
    const mood = 4;

    // Assets
    const full = require('./assets/full.png');
    const empty = require('./assets/empty.png');
    const store = require('./assets/store.png');
    const settings = require('./assets/settings.png');
    const points = require('./assets/points.png');
    const head = require('./assets/head.png');
    const happy = require('./assets/happy.png');
    const sad = require('./assets/sad.png');
    const background = require('./assets/background.png');
    // Doesnt load as a local for some reason
    const bear = 'https://i.imgur.com/6H0QDqq.png';
    const feeling = mood >= 3 ? happy : sad;


    // Calculate how much of the healthbar to fill
    const bars = [];
    for (var i = 0; i < 5; i++) {
      if (i < mood) {
        bars[i] = full;
      }
      else {
        bars[i] = empty;
      }
    }

    // Didn't make style class for the different flex values
    return(
      <>
        <View style={styles.singleColumn}>
          <View style={styles.infoBar}>
            <TouchableOpacity style={{flex: 1}}> 
            <View style={styles.singleRow}>
                  <Image source={head} style={styles.stretchImage}></Image>
                <View style={styles.playerName}>
                  <Text>{playerName}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style={styles.singleRow}>
              <Image source={points} style={styles.stretchImage}></Image>
              <View style={styles.friendshipPoints}>
                <Text>{friendshipPoints}</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 9}}>
            <ImageBackground source={background} style={styles.imageBackground} imageStyle={styles.imageBackground}>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 5}}></View>
                <View style={[styles.singleColumn, styles.border5]}>
                  <TouchableOpacity style={{flex: 1}}>
                    <Image source={store} style={styles.stretchImage}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1}}>
                    <Image source={settings} style={styles.stretchImage}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 4}}>
                <Image source={{uri: bear}} style={styles.containImage}/>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.petName}>
            <TextInput>{petName}</TextInput>
          </View>
          <View style={styles.singleRow}>
            <Image source={feeling} style={styles.stretchImage}></Image>
            <Image source={bars[0]} style={styles.stretchImage}></Image>
            <Image source={bars[1]} style={styles.stretchImage}></Image>
            <Image source={bars[2]} style={styles.stretchImage}></Image>
            <Image source={bars[3]} style={styles.stretchImage}></Image>
            <Image source={bars[4]} style={styles.stretchImage}></Image>
          </View>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center'
  },
  stretchImage: {
    flex: 1,
    resizeMode: 'stretch',
    width: 'auto',
    height: 'auto'
  },
  containImage: {
    flex: 1,
    resizeMode: 'contain'
  },
  petName: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    backgroundColor:
    'blanchedalmond'
  },
  singleRow: {
    flex: 1,
    flexDirection: 'row'
  },
  singleColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  border5: {
    borderWidth: 5
  },
  friendshipPoints: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blanchedalmond',
    borderWidth: 5
  },
  playerName: {
    flex: 2, justifyContent: 'center', alignItems: 'center'
  }
});

export default Home;