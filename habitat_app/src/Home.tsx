import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Modal
} from 'react-native';
import * as Screens from './Screens';
import { BabelFileResult } from '@babel/core';
import { IP_ADDRESS } from './IP_Address';

interface HomeState {
  petName: string;
  playerName: string;
  credits: number;
  mood: number;
  cosmetics: string[];
  temp: string;
  modal: boolean;
}

// Assets
const full = require('./assets/fullheart.png');
const empty = require('./assets/emptyheart.png');
const store = require('./assets/store.png');
const menu = require('./assets/menuicon.png');
const points = require('./assets/points.png');
const bearhead = require('./assets/bearhead.png');
const cathead = require('./assets/cathead.png');
const foxhead = require('./assets/foxhead.png');
const pighead = require('./assets/pighead.png');
const cowhead = require('./assets/cowhead.png');
const happy = require('./assets/happy.png');
const sad = require('./assets/sad.png');
const background = require('./assets/background.png');

const daily = require('./assets/dailyicon.png');
const reg = require('./assets/regicon.png');
const settings = require('./assets/settings.png');
const contract = require('./assets/contracticon.png');
const friend = require('./assets/friendicon.png');
const back = require('./assets/back.png');

// Doesnt load as a local for some reason
const blank = 'blank';
const bear = 'https://i.imgur.com/5BYS7cz.png';
const cat = 'https://imgur.com/PvPRg5I.png';
const pig = 'https://imgur.com/PPoEQZR.png';
const fox = 'https://imgur.com/lduNgbL.png';
const cow = 'https://imgur.com/bQhlxB6.png';

const crown = require('./assets/crown.png');
const bow = require('./assets/bow.png');
const cap = require('./assets/cap.png');
const duck = require('./assets/duck.png');
const party = require('./assets/party.png');
const sir = require('./assets/sir.png');
const balloon = require('./assets/balloon.png');

const none = null;

var itemList: { [key: string]: any } = {
  '5ebddb16a428ab3a446f4d9c': bear,
  '5ec1849acaf74254f8f6613e': cat,
  '5ec184eecaf74254f8f6613f': cow,
  '5ec18ab4caf74254f8f66140': fox,
  '5ec1bac29a1d3fa4b9a5664b': pig,
  '5ec1bc379a1d3fa4b9a5664c': none,
  '5ec1bc539a1d3fa4b9a5664d': bow,
  '5ec1bc5a9a1d3fa4b9a5664e': cap,
  '5ec1bc6e9a1d3fa4b9a5664f': crown,
  '5ec1bc749a1d3fa4b9a56650': duck,
  '5ec1bc7a9a1d3fa4b9a56651': party,
  '5ec1bc939a1d3fa4b9a56652': none,
  '5ec1bc999a1d3fa4b9a56653': balloon,
  '5ec1bc9e9a1d3fa4b9a56654': sir,
};

var headList: { [key: string]: any } = {
  '5ebddb16a428ab3a446f4d9c': bearhead,
  '5ec1849acaf74254f8f6613e': cathead,
  '5ec184eecaf74254f8f6613f': cowhead,
  '5ec18ab4caf74254f8f66140': foxhead,
  '5ec1bac29a1d3fa4b9a5664b': pighead,
};

const bars = [];

class Home extends React.Component<{}, HomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      petName: "",
      playerName: "",
      credits: 0,
      mood: 0,
      cosmetics: [],
      temp: "",
      modal: false
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

  getData = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/Home/home`);
    const body = await response.json();
    return body;
  }

  getPet() {
    console.log(this.state.cosmetics);
    return bear;
  }

  componentDidMount() {
    setTimeout(() => {
      this.getData().then(res => {
        console.log(res);
        var vcredits = res.credits < 0 ? 0 : res.credits;
        this.setState({ playerName: res.name, petName: res.petName, credits: vcredits, mood: (res.mood / 20), cosmetics: res.cosmetics, temp: res.petName });
      })
    }, 1000);
  }

  renderModal = () => {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal}
        >
        </Modal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.DailyScreen)}><Image style={styles.modalimage} source={daily}></Image></TouchableOpacity>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.RegTask)}><Image style={styles.modalimage} source={reg}></Image></TouchableOpacity>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.WellnessContractHome)}><Image style={styles.modalimage} source={contract}></Image></TouchableOpacity>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.FriendList)}><Image style={styles.modalimage} source={friend}></Image></TouchableOpacity>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.Settings)}><Image style={styles.modalimage} source={settings}></Image></TouchableOpacity>
              <TouchableOpacity style={styles.modaltouch} onPress={() => this.setState({ modal: false })}><Image style={styles.modalimage} source={back}></Image></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    console.log(this.state.mood);
    const feeling = this.state.mood >= 3 ? happy : sad;
    this.calculateBars();
    const petType = itemList[this.state.cosmetics[0]];
    const hat = itemList[this.state.cosmetics[1]];
    const other = itemList[this.state.cosmetics[2]];
    const head = headList[this.state.cosmetics[0]];
    //const cosmetics = this.getCosmetics();

    // Didn't make style class for the different flex values
    return (
      <>
        <View style={styles.singleColumn}>
          <View style={styles.infoBar}>
            <TouchableOpacity style={{ flex: 1 }}>
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
          <View style={{ flex: 9 }}>
            <ImageBackground source={background} style={styles.imageBackground} imageStyle={styles.imageBackground}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 5 }}></View>
                <View style={[styles.singleColumn, styles.border5, { borderRadius: 20, margin: 15}]}>

                  <TouchableOpacity style={{ flex: 1, borderRadius: 35 }} onPress={() => this.setState({ modal: !this.state.modal })}>
                    <Image source={menu} style={[styles.stretchImage, { borderRadius: 50 }]}></Image>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flex: 4 }}>
                <ImageBackground source={{ uri: petType }} style={styles.containImage} imageStyle={styles.containImage}>
                  <ImageBackground source={other} style={styles.containImage} imageStyle={styles.containImage}>
                    <ImageBackground source={hat} style={styles.containImage} imageStyle={styles.containImage}>
                      {this.state.modal &&
                        <View>

                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.DailyScreen)}><Image style={styles.modalimage} source={daily}></Image></TouchableOpacity>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.RegTask)}><Image style={styles.modalimage} source={reg}></Image></TouchableOpacity>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.WellnessContractHome)}><Image style={styles.modalimage} source={contract}></Image></TouchableOpacity>
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.FriendList)}><Image style={styles.modalimage} source={friend}></Image></TouchableOpacity>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.CustomizeScreen)}><Image style={styles.modalimage} source={store}></Image></TouchableOpacity>
                                <TouchableOpacity style={styles.modaltouch} onPress={() => this.props.routeTo(Screens.Settings)}><Image style={styles.modalimage} source={settings}></Image></TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>}

                    </ImageBackground>
                  </ImageBackground>
                </ImageBackground>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.petName}>
            <TextInput style={[styles.textBox, { fontSize: 30 }]} onSubmitEditing={event => {
              fetch(`http://${IP_ADDRESS}:3000/Home/petName`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json', //expects a JSON
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: event.nativeEvent.text
                }),
              });
            }}>{this.state.petName}</TextInput>
          </View>
          <View style={[styles.singleRow, { backgroundColor: 'black' }]}>
            <Image source={feeling} style={[styles.stretchImage, { borderRadius: 100, backgroundColor: '#FDED8D' }]}></Image>
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
    borderTopWidth: 4,
    borderBottomWidth: 4,
    backgroundColor: 'blanchedalmond',
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
    borderTopWidth: 4,
    borderBottomWidth: 4,
  },
  playerName: {
    flex: 2, justifyContent: 'center', alignItems: 'center'
  },
  textBox: {
    fontSize: 22,
    fontWeight: '500',
  },
  centeredView: {
    backgroundColor: 'blanchedalmond',
    justifyContent: 'center',
    borderWidth: 5,
    padding: 10,
    borderRadius: 20,
    width: 295,
    alignSelf: 'center'
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  modalimage: {
    width: 70,
    height: 70,
    borderRadius: 10
  },
  modaltouch: {
    borderWidth: 4,
    borderRadius: 15,
    margin: 6
  },
  radius5: {
    borderRadius: 10
  }
});

export default Home;