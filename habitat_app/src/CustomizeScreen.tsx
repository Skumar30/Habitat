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
    { id: '0', category: 'skin', name: 'Bear', price: 100, owned: true, active: true },
    { id: '1', category: 'skin', name: 'Cat', price: 100, owned: true, active: false },
    { id: '2', category: 'skin', name: 'Cow', price: 100, owned: true, active: false },
    { id: '3', category: 'skin', name: 'Fox', price: 300, owned: false, active: false },
    { id: '4', category: 'skin', name: 'Pig', price: 600, owned: false, active: false },
    { id: '5', category: 'hat', name: 'ITEM 1', price: 100, owned: true, active: true },
    { id: '6', category: 'hat', name: 'ITEM 2', price: 100, owned: true, active: false },
    { id: '7', category: 'hat', name: 'ITEM 3', price: 100, owned: true, active: false },
    { id: '8', category: 'hat', name: 'ITEM 4', price: 300, owned: true, active: false },
    { id: '9', category: 'hat', name: 'ITEM 5', price: 600, owned: false, active: false },
    { id: '10', category: 'hat', name: 'ITEM 6', price: 100, owned: false, active: false },
    { id: '11', category: 'accessory', name: 'ITEM 1', price: 100, owned: true, active: true },
    { id: '12', category: 'accessory', name: 'ITEM 2', price: 100, owned: false, active: false },
    { id: '13', category: 'accessory', name: 'ITEM 3', price: 300, owned: false, active: false },
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

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('0') ? this.setActiveStatus('0', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('0') ? this.deactivateOthers('0', 'skin') : this.unownedSelected('0', 'skin')
                  }}
                  style={this.getActiveStatus('0') ? styles.itemElementActive :
                    this.getOwnedStatus('0') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>Bear</Text>
                  <Image style={styles.itemImage} source={require('./assets/bear.png')} />
                  {this.getOwnedStatus('0') ? null : <Text style={styles.itemText} >${this.getPrice('0')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('1') ? this.setActiveStatus('1', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('1') ? this.deactivateOthers('1', 'skin') : this.unownedSelected('1', 'skin')
                  }}
                  style={this.getActiveStatus('1') ? styles.itemElementActive :
                    this.getOwnedStatus('1') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>Cat</Text>
                  <Image style={styles.itemImage} source={require('./assets/cat.png')} />
                  {this.getOwnedStatus('1') ? null : <Text style={styles.itemText} >${this.getPrice('1')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('2') ? this.setActiveStatus('2', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('2') ? this.deactivateOthers('2', 'skin') : this.unownedSelected('2', 'skin')
                  }}
                  style={this.getActiveStatus('2') ? styles.itemElementActive :
                    this.getOwnedStatus('2') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>Cow</Text>
                  <Image style={styles.itemImage} source={require('./assets/cow.png')} />
                  {this.getOwnedStatus('2') ? null : <Text style={styles.itemText} >${this.getPrice('2')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('3') ? this.setActiveStatus('3', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('3') ? this.deactivateOthers('3', 'skin') : this.unownedSelected('3', 'skin')
                  }}
                  style={this.getActiveStatus('3') ? styles.itemElementActive :
                    this.getOwnedStatus('3') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>Fox</Text>
                  <Image style={styles.itemImage} source={require('./assets/fox.png')} />
                  {this.getOwnedStatus('3') ? null : <Text style={styles.itemText} >${this.getPrice('3')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('4') ? this.setActiveStatus('4', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('4') ? this.deactivateOthers('4', 'skin') : this.unownedSelected('4', 'skin')
                  }}
                  style={this.getActiveStatus('4') ? styles.itemElementActive :
                    this.getOwnedStatus('4') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>Pig</Text>
                  <Image style={styles.itemImage} source={require('./assets/pig.png')} />
                  {this.getOwnedStatus('4') ? null : <Text style={styles.itemText} >${this.getPrice('4')}</Text>}
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>HATS</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('5') ? this.setActiveStatus('5', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('5') ? this.deactivateOthers('5', 'hat') : this.unownedSelected('5', 'hat')
                  }}
                  style={this.getActiveStatus('5') ? styles.itemElementActive :
                    this.getOwnedStatus('5') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('5') ? null : <Text style={styles.itemText} >${this.getPrice('5')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('6') ? this.setActiveStatus('6', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('6') ? this.deactivateOthers('6', 'hat') : this.unownedSelected('6', 'hat')
                  }}
                  style={this.getActiveStatus('6') ? styles.itemElementActive :
                    this.getOwnedStatus('6') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('6') ? null : <Text style={styles.itemText} >${this.getPrice('6')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('7') ? this.setActiveStatus('7', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('7') ? this.deactivateOthers('7', 'hat') : this.unownedSelected('7', 'hat')
                  }}
                  style={this.getActiveStatus('7') ? styles.itemElementActive :
                    this.getOwnedStatus('7') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('7') ? null : <Text style={styles.itemText} >${this.getPrice('7')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('8') ? this.setActiveStatus('8', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('8') ? this.deactivateOthers('8', 'hat') : this.unownedSelected('8', 'hat')
                  }}
                  style={this.getActiveStatus('8') ? styles.itemElementActive :
                    this.getOwnedStatus('8') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('8') ? null : <Text style={styles.itemText} >${this.getPrice('8')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('9') ? this.setActiveStatus('9', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('9') ? this.deactivateOthers('9', 'hat') : this.unownedSelected('9', 'hat')
                  }}
                  style={this.getActiveStatus('9') ? styles.itemElementActive :
                    this.getOwnedStatus('9') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('9') ? null : <Text style={styles.itemText} >${this.getPrice('9')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('10') ? this.setActiveStatus('10', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('10') ? this.deactivateOthers('10', 'hat') : this.unownedSelected('10', 'hat')
                  }}
                  style={this.getActiveStatus('10') ? styles.itemElementActive :
                    this.getOwnedStatus('10') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 6</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('10') ? null : <Text style={styles.itemText} >${this.getPrice('10')}</Text>}
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>OTHER</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('11') ? this.setActiveStatus('11', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('11') ? this.deactivateOthers('11', 'accessory') : this.unownedSelected('11', 'accessory')
                  }}
                  style={this.getActiveStatus('11') ? styles.itemElementActive :
                    this.getOwnedStatus('11') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('11') ? null : <Text style={styles.itemText} >${this.getPrice('11')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('12') ? this.setActiveStatus('12', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('12') ? this.deactivateOthers('12', 'accessory') : this.unownedSelected('12', 'accessory')
                  }}
                  style={this.getActiveStatus('12') ? styles.itemElementActive :
                    this.getOwnedStatus('12') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('12') ? null : <Text style={styles.itemText} >${this.getPrice('12')}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus('13') ? this.setActiveStatus('13', true) : null }}
                  onPressOut={() => {
                    this.getOwnedStatus('13') ? this.deactivateOthers('13', 'accessory') : this.unownedSelected('13', 'accessory')
                  }}
                  style={this.getActiveStatus('13') ? styles.itemElementActive :
                    this.getOwnedStatus('13') ? styles.itemElement : styles.itemElementNotOwned}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  {this.getOwnedStatus('13') ? null : <Text style={styles.itemText} >${this.getPrice('13')}</Text>}
                </TouchableOpacity>

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
    backgroundColor: 'rgba(255, 255, 255, 0)',

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
