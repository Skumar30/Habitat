/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  FlatList,
  Modal,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };

class Customize extends React.Component<{}, {
  skin1: boolean, skin2: boolean, skin3: boolean, skin4: boolean, skin5: boolean, hat1: boolean, hat2: boolean,
  hat3: boolean, hat4: boolean, hat5: boolean, hat6: boolean, other1: boolean, other2: boolean, other3: boolean,
  unownedClicked: boolean, confirmationVisible: boolean, skin5owned: boolean,
}>{
  constructor(props: any) {
    super(props)

    this.state = {
      skin1: true, skin2: false, skin3: false, skin4: false, skin5: false, hat1: true, hat2: false,
      hat3: false, hat4: false, hat5: false, hat6: false, other1: true, other2: false, other3: false,
      unownedClicked: false, confirmationVisible: false, skin5owned: false,
    };
  }

  credits = 1000; // this will eventually come from value in database

  currID = 0;

  itemList = [
    { id: 0, name: 'Bear', price: 100, owned: true, active: true },
    { id: 1, name: 'Cat', price: 100, owned: true, active: false },
    { id: 2, name: 'Cow', price: 100, owned: true, active: false },
    { id: 3, name: 'Fox', price: 100, owned: true, active: false },
    { id: 4, name: 'Pig', price: 100, owned: false, active: false },
  ];

  getPrice(code: number): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    return item.price;
  };

  getItemName(code: number): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    return item.name;
  }

  getOwnedStatus(code: number): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    return item.owned;
  }

  setOwnedStatus(code: number, status: boolean): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    item.owned = status;
  }

  handlePurchase() {
    this.setState({ confirmationVisible: false });
    this.setState({ unownedClicked: false });
    this.setState({ skin5owned: true });
    this.setState({ skin5: true });
    this.activateSkin5();
    this.credits -= this.getPrice(4);
    //update database value
  }

  //this is hardcoded just for the pig skin for now. 
  //planning on properly implementing this once the database is working
  purchaseConfirmation = (code: number) => {
    return (
      <View>
        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.unownedClicked}
        >
          <View style={{ flex: 1, marginTop: 45, height: 100 }}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalText}>Would you like to purchase {this.getItemName(code)} for ${this.getPrice(code)}?</Text>
              </View>

              <View style={styles.buttonSeparation}>

                <View>
                  <TouchableOpacity
                    style={[styles.confirmationButton, { backgroundColor: '#555' }]}
                    onPress={() => {
                      this.setState({ confirmationVisible: false }); this.setState({ unownedClicked: false });
                      this.setState({ skin5owned: false });
                    }}
                  >
                    <Text style={styles.itemText}>NO</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                    onPress={() => { this.handlePurchase() }}
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

  activateSkin5() {
    this.setState({ skin1: false });
    this.setState({ skin2: false });
    this.setState({ skin3: false });
    this.setState({ skin4: false });
  }

  unownedSkin5Selected() {
    this.setState({ unownedClicked: true });
    this.currID = 4;
  }

  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={[styles.body, { zIndex: 3 }]}>
            <Text style={styles.screenTitle}>Customize</Text>
            <Text style={{
              textAlign: 'right', fontSize: 20, fontWeight: '600', paddingRight: 20,
              paddingBottom: 10
            }}>${this.credits}</Text>
          </View>

          <TouchableOpacity onPress={() => this.exit()}
            style={{
              position: 'absolute', alignSelf: 'center', bottom: 130, backgroundColor: 'rgba(210, 42, 42, 0.8)',
              borderRadius: 60, height: 40, width: 90, margin: 13
            }}>
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

                <TouchableOpacity onPressIn={() => this.setState({ skin1: true })}
                  onPressOut={() => {
                    this.setState({ skin2: false }); this.setState({ skin3: false }); this.setState({ skin4: false });
                    this.setState({ skin5: false });
                  }}
                  style={this.state.skin1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Bear</Text>
                  <Image style={styles.itemImage} source={require('../assets/bear.png')} />
                  {/* <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ skin2: true })}
                  onPressOut={() => {
                    this.setState({ skin1: false }); this.setState({ skin3: false }); this.setState({ skin4: false });
                    this.setState({ skin5: false });
                  }}
                  style={this.state.skin2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cat</Text>
                  <Image style={styles.itemImage} source={require('../assets/cat.png')} />
                  {/* <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ skin3: true })}
                  onPressOut={() => {
                    this.setState({ skin1: false }); this.setState({ skin2: false }); this.setState({ skin4: false });
                    this.setState({ skin5: false });
                  }}
                  style={this.state.skin3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cow</Text>
                  <Image style={styles.itemImage} source={require('../assets/cow.png')} />
                  {/* <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ skin4: true })}
                  onPressOut={() => {
                    this.setState({ skin1: false }); this.setState({ skin2: false }); this.setState({ skin3: false });
                    this.setState({ skin5: false });
                  }}
                  style={this.state.skin4 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Fox</Text>
                  <Image style={styles.itemImage} source={require('../assets/fox.png')} />
                  {/* <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text> */}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.state.skin5owned ? this.setState({ skin5: true }) : null }}
                  onPressOut={() => { this.state.skin5owned ? this.activateSkin5() : this.unownedSkin5Selected() }}
                  style={this.state.skin5 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Pig</Text>
                  <Image style={styles.itemImage} source={require('../assets/pig.png')} />
                  {this.state.skin5owned ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(4)}</Text>}
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>HATS</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => this.setState({ hat1: true })}
                  onPressOut={() => {
                    this.setState({ hat2: false }); this.setState({ hat3: false }); this.setState({ hat4: false });
                    this.setState({ hat5: false }); this.setState({ hat6: false });
                  }}
                  style={this.state.hat1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat2: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat3: false }); this.setState({ hat4: false });
                    this.setState({ hat5: false }); this.setState({ hat6: false });
                  }}
                  style={this.state.hat2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat3: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat2: false }); this.setState({ hat4: false });
                    this.setState({ hat5: false }); this.setState({ hat6: false });
                  }}
                  style={this.state.hat3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat4: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat2: false }); this.setState({ hat3: false });
                    this.setState({ hat5: false }); this.setState({ hat6: false });
                  }}
                  style={this.state.hat4 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat5: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat2: false }); this.setState({ hat3: false });
                    this.setState({ hat4: false }); this.setState({ hat6: false });
                  }}
                  style={this.state.hat5 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat6: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat2: false }); this.setState({ hat3: false });
                    this.setState({ hat4: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat6 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 6</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>OTHER</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => this.setState({ other1: true })}
                  onPressOut={() => { this.setState({ other2: false }); this.setState({ other3: false }); }}
                  style={this.state.other1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ other2: true })}
                  onPressOut={() => { this.setState({ other1: false }); this.setState({ other3: false }); }}
                  style={this.state.other2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ other3: true })}
                  onPressOut={() => { this.setState({ other1: false }); this.setState({ other2: false }); }}
                  style={this.state.other3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        {this.state.unownedClicked && this.purchaseConfirmation(this.currID)}
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
    backgroundColor: '#55dc69',
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
