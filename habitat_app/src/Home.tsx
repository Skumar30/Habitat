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

import * as Screens from './Screens'

interface HomeState {
  petName: string;
  playerName: string;
  credits: number;
  mood: number;
  pet: string;
  cosmetics: any[];
}

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
const blank = 'blank';
const bear = 'https://i.imgur.com/6H0QDqq.png';
const cat = 'https://imgur.com/PvPRg5I.png';
const pig = 'https://imgur.com/PPoEQZR.png';
const fox = 'https://imgur.com/lduNgbL.png';
const cow = 'https://imgur.com/bQhlxB6.png';

const crown = require('./assets/crown.png');

const bars = [];

class Home extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      petName: "",
      playerName: "",
      credits: 10,
      mood: 4,
      pet: blank,
      cosmetics: []
    };
  }

  calculateBars() {
    // Calculate how much of the healthbar to fill
    for (var i = 0; i < 5; i++) {
      if (i < this.state.mood) {
        bars[i] = full;
      }
      else {
        bars[i] = empty;
      }
    }
  }

  getData = async() => {
    const response = await fetch('http://192.168.1.98:3000/home');
    const body = await response.json();
    return body;
  }

  getPet() {
    var pet = this.state.pet;
    if (pet === 'bear') {
      pet = bear;
    }
    else if (pet === 'cat') {
      pet = cat;
    }
    else if (pet === 'cow') {
      pet = cow;
    }
    else if (pet === 'fox') {
      pet = fox;
    }
    else if (pet === 'pig') {
      pet = pig;
    }
    pet = fox;
    return pet;
  }

  getCosmetics() {
    console.log(this.state.cosmetics);
    var cosmetics:any[];
    cosmetics = [];
    if (this.state.cosmetics[0] === 'crown') {
      cosmetics[0] = crown;
    }
    return cosmetics;
  }

  componentDidMount(){
    this.getData().then(res => {
      console.log(res);
      this.setState({playerName: res.name, petName: res.petName, credits: res.credits, mood: (res.mood/20), pet: res.pet, cosmetics: res.cosmetics});
    })
   }  

  render() {
    console.log(this.state.mood);
    const feeling = this.state.mood >= 3 ? happy : sad;
    this.calculateBars();
    const petType = this.getPet();
    const cosmetics = this.getCosmetics();

    // Didn't make style class for the different flex values
    return(
      <>
        <View style={styles.singleColumn}>
          <View style={styles.infoBar}>
            <TouchableOpacity style={{flex: 1}}> 
            <View style={styles.singleRow}>
                  <Image source={head} style={styles.stretchImage}></Image>
                <View style={styles.playerName}>
                  <Text style={styles.textBox}>{this.state.playerName}</Text>
                </View>
            </View>
            </TouchableOpacity>
            <View style={styles.singleRow}>
              <Image source={points} style={styles.stretchImage}></Image>
              <View style={styles.friendshipPoints}>
                <Text style={styles.textBox}>{this.state.credits}</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 9}}>
            <ImageBackground source={background} style={styles.imageBackground} imageStyle={styles.imageBackground}>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{flex: 5}}></View>
                <View style={[styles.singleColumn, styles.border5]}>
                  <TouchableOpacity style={{flex: 1}} onPress={() => this.props.routeTo(Screens.CustomizeScreen)}>
                    <Image source={store} style={styles.stretchImage}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex: 1}} onPress={() => this.props.routeTo(Screens.Setting)}>
                    <Image source={settings} style={styles.stretchImage}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex: 4}}>
                <ImageBackground source={{uri: petType}} style={styles.containImage} imageStyle={styles.containImage}>
                  <ImageBackground source={cosmetics[0]} style={styles.containImage} imageStyle={styles.containImage}/>
                </ImageBackground>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.petName}>
            <TextInput style={styles.textBox} onSubmitEditing={event => fetch(`http://${Screens.ADDRESS}/petName`, {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json', //expects a JSON
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: event.nativeEvent.text
                  }),
                })}>{this.state.petName}</TextInput>
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
    )
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
    'blanchedalmond',
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
  },
  textBox: {
    fontFamily: 'serif',
    fontSize: 17
  }
});

export default Home;