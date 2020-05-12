import React, { Component, useState, Props } from 'react';
import Icon from 'react-native-ionicons';
// import HeaderScrollView from 'react-native-header-scroll-view';
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

import { Colors } from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };

class Customize extends React.Component<{}, { modalVisible: boolean, changedSkin: boolean }>{
  constructor(props: any) {
    super(props)

    this.state = { modalVisible: false, changedSkin: false };
  }

  credits = 1000; // this will eventually come from value in database

  currID = '';
  currCategory = '';

  itemList = [
    { id: '0', category: 'skin', name: 'Bear', price: 100, image: require('./assets/bear.png'), owned: true, active: true },
    { id: '1', category: 'skin', name: 'Cat', price: 100, image: require('./assets/cat.png'), owned: true, active: false },
    { id: '2', category: 'skin', name: 'Cow', price: 100, image: require('./assets/cow.png'), owned: true, active: false },
    { id: '3', category: 'skin', name: 'Fox', price: 300, image: require('./assets/fox.png'), owned: false, active: false },
    { id: '4', category: 'skin', name: 'Pig', price: 600, image: require('./assets/pig.png'), owned: false, active: false },
    { id: '5', category: 'hat', name: 'ITEM 1', price: 100, image: require('./assets/gary-gillespie.png'), owned: true, active: true },
    { id: '6', category: 'hat', name: 'ITEM 2', price: 100, image: require('./assets/gary-gillespie.png'), owned: true, active: false },
    { id: '7', category: 'hat', name: 'ITEM 3', price: 100, image: require('./assets/gary-gillespie.png'), owned: true, active: false },
    { id: '8', category: 'hat', name: 'ITEM 4', price: 300, image: require('./assets/gary-gillespie.png'), owned: true, active: false },
    { id: '9', category: 'hat', name: 'ITEM 5', price: 600, image: require('./assets/gary-gillespie.png'), owned: false, active: false },
    { id: '10', category: 'hat', name: 'ITEM 6', price: 100, image: require('./assets/gary-gillespie.png'), owned: false, active: false },
    { id: '11', category: 'accessory', name: 'ITEM 1', price: 100, image: require('./assets/gary-gillespie.png'), owned: true, active: true },
    { id: '12', category: 'accessory', name: 'ITEM 2', price: 100, image: require('./assets/gary-gillespie.png'), owned: false, active: false },
    { id: '13', category: 'accessory', name: 'ITEM 3', price: 300, image: require('./assets/gary-gillespie.png'), owned: false, active: false },
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
    this.credits -= this.getPrice(code);
    //update database value here:
    // __________________
  }

  deactivateOthers(code: string, type: string) {
    // the "changedSkin" lines seem unnecessary, but i need them or else the
    //selection change will not be reflected on screen
    this.setState({ changedSkin: true });
    for (var i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].id !== code && this.itemList[i].category === type) {
        this.setActiveStatus(this.itemList[i].id, false);
      }
    }
    this.setState({ changedSkin: false });
  }

  unownedSelected(code: string, type: string) {
    this.setState({ modalVisible: true });
    this.currID = code;
    this.currCategory = type;
  }

  purchaseConfirmation = (code: string, type: string) => {
    if (this.credits - this.getPrice(code) < 0) {
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
                    You're too broke to afford {"\n"}
                    the {this.getName(code)} {this.getCategory(code)}... :(
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
                    Would you like to purchase the {"\n"}
                    {this.getName(code)} {this.getCategory(code)} for ${this.getPrice(code)}?
                </Text>
                </View>

                <View style={styles.buttonSeparation}>

                  <View>
                    <TouchableOpacity
                      style={[styles.confirmationButton, { backgroundColor: '#556' }]}
                      onPress={() => { this.setState({ modalVisible: false }); }}
                    >
                      <Text style={styles.itemText}>NO</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                      onPress={() => { this.handlePurchase(code, type) }}
                    >
                      <Text style={styles.itemText}>YES</Text>
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

  //mapping function. begin(inclusive), end(exclusive)
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
          <View style={[styles.body, { zIndex: 3 }]}>
            <Text style={styles.screenTitle}>Customize</Text>
            <Text style={styles.creditDisplay}>${this.credits}</Text>
          </View>

          <TouchableOpacity onPress={() => this.exit()}
            style={styles.backButton}>
            <Text style={{ textAlign: 'center', marginVertical: 11, color: 'white' }}>BACK</Text>
          </TouchableOpacity>

          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={[styles.body, { paddingTop: 10, paddingBottom: 35, zIndex: 1 }]}>
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

  exit() {
    //go back home
  }

}

const styles = StyleSheet.create({
  scrollView: {
    //backgroundColor: Colors.lighter,
    backgroundColor: Colors.white,
    marginBottom: 155,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  screenTitle: {
    fontSize: 38,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  body: {
    backgroundColor: Colors.white,
  },
  creditDisplay: {
    textAlign: 'right',
    fontSize: 22,
    fontWeight: '600',
    paddingRight: 20,
    paddingBottom: 10,
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
  },
  itemText: {
    margin: 5,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
    alignContent: 'space-between',
    textAlign: 'center',
  },
  itemImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginLeft: 7,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#202020',
    paddingHorizontal: 35,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  backButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 130,
    backgroundColor: 'rgba(210, 42, 42, 0.8)',
    borderRadius: 60,
    height: 40,
    width: 90,
    margin: 13,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  modalView: {
    margin: 20,
    marginTop: 300,
    width: 375,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
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
  },
  buttonSeparation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  confirmationButton: {
    padding: 10,
    borderRadius: 60,
    marginTop: 20,
    height: 50,
    width: 90,
    elevation: 2,
  },
});

export default Customize;
