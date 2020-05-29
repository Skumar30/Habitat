import React, { Component, useState, Props } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import * as Screens from './Screens';
import { IP_ADDRESS } from './IP_Address';

declare const global: { HermesInternal: null | {} };

class Customize extends React.Component<any, { modalVisible: boolean, rerender: boolean, credits: number }>{
  constructor(props: any) {
    super(props)

    this.state = { modalVisible: false, rerender: false, credits: 0 };
  }

  currID = '';
  currCategory = '';

  itemList = [
    { id: '5ebddb16a428ab3a446f4d9c', category: 'skin', name: 'Bear', price: 0, image: require('./assets/bear.png'), owned: false, active: false },
    { id: '5ec1849acaf74254f8f6613e', category: 'skin', name: 'Cat', price: 100, image: require('./assets/cat.png'), owned: false, active: false },
    { id: '5ec184eecaf74254f8f6613f', category: 'skin', name: 'Cow', price: 100, image: require('./assets/cow.png'), owned: false, active: false },
    { id: '5ec18ab4caf74254f8f66140', category: 'skin', name: 'Fox', price: 300, image: require('./assets/fox.png'), owned: false, active: false },
    { id: '5ec1bac29a1d3fa4b9a5664b', category: 'skin', name: 'Pig', price: 600, image: require('./assets/pig.png'), owned: false, active: false },
    { id: '5ec1bc379a1d3fa4b9a5664c', category: 'hat', name: 'NONE', price: 0, image: require('./assets/blankicon.png'), owned: false, active: false },
    { id: '5ec1bc539a1d3fa4b9a5664d', category: 'hat', name: 'Bow', price: 100, image: require('./assets/bowicon.png'), owned: false, active: false },
    { id: '5ec1bc5a9a1d3fa4b9a5664e', category: 'hat', name: 'Cap', price: 100, image: require('./assets/capicon.png'), owned: false, active: false },
    { id: '5ec1bc6e9a1d3fa4b9a5664f', category: 'hat', name: 'Crown', price: 300, image: require('./assets/crownicon.png'), owned: false, active: false },
    { id: '5ec1bc749a1d3fa4b9a56650', category: 'hat', name: 'Duck', price: 600, image: require('./assets/duckicon.png'), owned: false, active: false },
    { id: '5ec1bc7a9a1d3fa4b9a56651', category: 'hat', name: 'Party', price: 100, image: require('./assets/partyicon.png'), owned: false, active: false },
    { id: '5ec1bc939a1d3fa4b9a56652', category: 'accessory', name: 'NONE', price: 0, image: require('./assets/blankicon.png'), owned: false, active: false },
    { id: '5ec1bc999a1d3fa4b9a56653', category: 'accessory', name: 'Balloon', price: 100, image: require('./assets/balloonicon.png'), owned: false, active: false },
    { id: '5ec1bc9e9a1d3fa4b9a56654', category: 'accessory', name: 'Sir', price: 300, image: require('./assets/siricon.png'), owned: false, active: false },
  ];

  getCategory(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.category;
  }

  getName(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.name;
  }

  getPrice(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.price;
  };

  getImage(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.image;
  }

  getOwnedStatus(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.owned;
  }

  setOwnedStatus(code: string, status: boolean): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    item.owned = status;
  }

  getActiveStatus(code: string): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    return item.active;
  }

  setActiveStatus(code: string, status: boolean): any {
    let item = this.itemList.find((itemList: { id: string; }) => itemList.id === code);
    item.active = status;
  }

  handlePurchase(code: string, type: string) {
    this.setState({ modalVisible: false });
    this.setOwnedStatus(code, true);
    this.setActiveStatus(code, true);
    this.deactivateOthers(code, type);
    this.setState({ credits: this.state.credits - this.getPrice(code) });
  }

  deactivateOthers(code: string, type: string) {
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].id !== code && this.itemList[i].category === type) {
        this.setActiveStatus(this.itemList[i].id, false);
      }
    }
    this.setState({ rerender: !this.state.rerender });
  }

  unownedSelected(code: string, type: string) {
    this.setState({ modalVisible: true });
    this.currID = code;
    this.currCategory = type;
  }

  purchaseConfirmation = (code: string, type: string) => {
    if (this.state.credits - this.getPrice(code) < 0) {
      return (
        <View>
          <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={{ flex: 1, marginTop: 45, height: 100 }}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalText}>
                    Sorry, you don't have enough for the {this.getName(code)} {this.getCategory(code)} right now.
                  </Text>
                </View>

                <View style={styles.buttonSeparation}>

                  <View>
                    <TouchableOpacity
                      style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                      onPress={() => { this.setState({ modalVisible: false }); }}
                    >
                      <Text style={styles.itemText}>OK</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </View>
          </Modal>
        </View >
      );
    } else {
      return (
        <View>
          <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={{ flex: 1, marginTop: 45, height: 100 }}>
              <View style={styles.modalView}>
                <View>
                  <Text style={styles.modalText}>
                    Would you like to purchase the {this.getName(code)} {this.getCategory(code)} for ${this.getPrice(code)}?
                  </Text>
                </View>

                <View style={styles.buttonSeparation}>

                  <View>
                    <TouchableOpacity
                      style={[styles.confirmationButton, { backgroundColor: 'indianred' }]}
                      onPress={() => { this.setState({ modalVisible: false }); }}
                    >
                      <Text style={[styles.itemText]}>NO</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={[styles.confirmationButton, { backgroundColor: '#b4ecb4' }]}
                      onPress={() => { this.handlePurchase(code, type) }}
                    >
                      <Text style={[styles.itemText, { color: 'black' }]}>YES</Text>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>
            </View>
          </Modal>
        </View >
      );
    }
  }

  owned: string[] = [];
  active: string[] = [];
  componentDidMount() {
    this.getOwnedandCredits().then(res => {
      console.log(res.owned);
      this.owned = res.owned;
      for (var i = 0; i < this.owned.length; i++) {
        for (var j = 0; j < this.itemList.length; j++) {
          if (this.owned[i] === this.itemList[j].id) {
            this.itemList[j].owned = true;
            this.setState({ rerender: !this.state.rerender });
          }
        }
      }
      this.setState({ credits: res.credits });
    });
    this.getActive().then(res => {
      console.log(res.active);
      this.active = res.active;
      for (var i = 0; i < this.active.length; i++) {
        for (var j = 0; j < this.itemList.length; j++) {
          if (this.active[i] === this.itemList[j].id) {
            this.itemList[j].active = true;
            this.setState({ rerender: !this.state.rerender });
          }
        }
      }
    });
  }

  getOwnedandCredits = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/customize/ownedAndCredits`);
    return await response.json();
  }

  getActive = async () => {
    const response = await fetch(`http://${IP_ADDRESS}:3000/customize/active`);
    return await response.json();
  }

  updateDB = async () => {
    this.owned = [];
    this.active = [];
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].owned) this.owned.push(this.itemList[i].id);
      if (this.itemList[i].active) this.active.push(this.itemList[i].id);
    }
    console.log(this.state.credits);
    console.log(this.owned);
    console.log(this.active);

    const updateOwned = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        owned: this.owned,
      })
    }

    try {
      const response = await fetch(`http://${IP_ADDRESS}:3000/customize/setOwned`, updateOwned);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }

    const updateActive = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active: this.active,
      })
    }

    try {
      const response = await fetch(`http://${IP_ADDRESS}:3000/customize/setActive`, updateActive);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }

    const updateCredits = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credits: this.state.credits,
      })
    }

    try {
      const response = await fetch(`http://${IP_ADDRESS}:3000/customize/setcredits`, updateCredits);
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }


  list = (begin: number, end: number) => {
    return this.itemList.slice(begin, end).map(e => {
      return (
        <TouchableOpacity onPressIn={() => { this.getOwnedStatus(e.id) ? this.setActiveStatus(e.id, true) : null }}
          onPressOut={() => {
            this.getOwnedStatus(e.id) ? this.deactivateOthers(e.id, this.getCategory(e.id)) :
              this.unownedSelected(e.id, this.getCategory(e.id))
          }}
          style={this.getActiveStatus(e.id) ? styles.itemElementActive :
            this.getOwnedStatus(e.id) ? styles.itemElement : styles.itemElementNotOwned}
        >
          <Text style={styles.itemText}>{this.getName(e.id)}</Text>
          <Image style={styles.itemImage} source={this.getImage(e.id)} />
          {this.getOwnedStatus(e.id) ? null : <Text style={styles.itemText} >${this.getPrice(e.id)}</Text>}
        </TouchableOpacity>
      );
    });
  };

  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.header}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TouchableOpacity onPressIn={() => this.updateDB()}
                onPressOut={() => this.props.routeTo(Screens.Home)}
                style={styles.backButton}>
                <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={require('./assets/back.png')} />
              </TouchableOpacity>
            </View>
            <Text style={styles.screenTitle}>Customize</Text>
            {/* <Text style={styles.creditDisplay}>${this.state.credits}</Text> */}
            {/* add logic to make negative nums appear as 0*/}
            {this.state.credits < 0 ? <Text style={styles.creditDisplay}>$0</Text> :
              <Text style={styles.creditDisplay}>${this.state.credits}</Text>}
          </View>

          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={[styles.body, { paddingTop: 25, paddingBottom: 70, zIndex: 1 }]}>
              <Text style={styles.sectionTitle}>SKINS</Text>
              <View style={styles.itemsContainer}>
                {this.list(0, 5)}
              </View>
              <Text style={styles.sectionTitle}>HATS</Text>
              <View style={styles.itemsContainer}>
                {this.list(5, 11)}
              </View>
              <Text style={styles.sectionTitle}>OTHER</Text>
              <View style={styles.itemsContainer}>
                {this.list(11, 14)}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        {this.state.modalVisible && this.purchaseConfirmation(this.currID, this.currCategory)}
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#e0eeee',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  header: {
    zIndex: 3,
    flexDirection: 'row',
    borderBottomWidth: 4,
    backgroundColor: '#a0aaaa',
    paddingHorizontal: 15,
    height: 100,
  },
  screenTitle: {
    flex: 2,
    fontSize: 35,
    fontWeight: '700',
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 15,
    //fontFamily: 'proximaSoft'
  },
  body: {
    backgroundColor: '#e0eeee',
    //backgroundColor: 'blanchedalmond'
  },
  creditDisplay: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    paddingTop: 60,
    flex: 1
  },
  itemsContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  itemElement: {
    margin: 10,
    borderRadius: 15,
    width: 100,
    height: 140,
    flexShrink: 100,
    flexGrow: 100,
    flexBasis: 100,
    backgroundColor: 'slategray',
    textAlign: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
    borderWidth: 4,
    justifyContent: 'center'
  },
  itemElementActive: {
    margin: 10,
    borderRadius: 15,
    width: 100,
    height: 140,
    flexShrink: 100,
    flexGrow: 100,
    flexBasis: 100,
    backgroundColor: 'rgb(90, 210, 110)',
    textAlign: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
    borderWidth: 4,
    justifyContent: 'center'
  },
  itemElementNotOwned: {
    margin: 10,
    borderRadius: 15,
    width: 100,
    height: 140,
    flexShrink: 100,
    flexGrow: 100,
    flexBasis: 100,
    backgroundColor: '#556',
    textAlign: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
    borderWidth: 4,
    justifyContent: 'center'
  },
  itemText: {
    margin: 5,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    alignContent: 'space-between',
    textAlign: 'center',
  },
  itemImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 4,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#202020',
    paddingHorizontal: 35,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgb(110, 192, 178)',
    borderRadius: 15,
    borderWidth: 4,
    height: 60,
    width: 60,
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  modalView: {
    margin: 20,
    marginTop: 250,
    width: 375,
    backgroundColor: '#e0eeee',
    borderWidth: 4,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'black'
  },
  buttonSeparation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  confirmationButton: {
    borderRadius: 60,
    marginTop: 20,
    height: 50,
    width: 90,
    elevation: 2,
    justifyContent: 'center',
    borderWidth: 4
  },
});

export default Customize;
