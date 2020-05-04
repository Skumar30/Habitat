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

import { Colors } from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };

class Customize extends React.Component<{}, {
  skin0: boolean, skin1: boolean, skin2: boolean, skin3: boolean, skin4: boolean,
  hat0: boolean, hat1: boolean, hat2: boolean, hat3: boolean, hat4: boolean, hat5: boolean,
  other0: boolean, other1: boolean, other2: boolean,
  unownedClicked: boolean, confirmationVisible: boolean,
  // i will get an error if i dont include this huge block for some reason...
}>{
  constructor(props: any) {
    super(props)

    this.state = {
      skin0: true, skin1: false, skin2: false, skin3: false, skin4: false,
      hat0: true, hat1: false, hat2: false, hat3: false, hat4: false, hat5: false,
      other0: true, other1: false, other2: false,
      unownedClicked: false, confirmationVisible: false,
    };
  }

  credits = 1000; // this will eventually come from value in database

  currID = 0;

  itemList = [
    { id: 0, name: 'Bear', price: 100, owned: true, active: true },
    { id: 1, name: 'Cat', price: 100, owned: false, active: false },
    { id: 2, name: 'Cow', price: 100, owned: false, active: false },
    { id: 3, name: 'Fox', price: 100, owned: false, active: false },
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

  getActiveStatus(code: number): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    return item.active;
  }

  setActiveStatus(code: number, status: boolean): any {
    let item = this.itemList.find((itemList: { id: number; }) => itemList.id === code);
    item.active = status;
    if (code == 0) {
      this.setState({ skin0: status });
    } else if (code == 1) {
      this.setState({ skin1: status });
    } else if (code == 2) {
      this.setState({ skin2: status });
    } else if (code == 3) {
      this.setState({ skin3: status });
    } else if (code == 4) {
      this.setState({ skin4: status });
    }
  }

  handlePurchase(code: number) {
    this.setState({ confirmationVisible: false });
    this.setState({ unownedClicked: false });
    this.setOwnedStatus(code, true);
    this.setActiveStatus(code, true);
    this.deactivateOthers(code);
    this.credits -= this.getPrice(code);

    //update database value here:
    // __________________
  }

  deactivateOthers(code: number) {
    if (code == 0) {
      this.setActiveStatus(1, false); this.setActiveStatus(2, false);
      this.setActiveStatus(3, false); this.setActiveStatus(4, false);
    } else if (code == 1) {
      this.setActiveStatus(0, false); this.setActiveStatus(2, false);
      this.setActiveStatus(3, false); this.setActiveStatus(4, false);
    } else if (code == 2) {
      this.setActiveStatus(0, false); this.setActiveStatus(1, false);
      this.setActiveStatus(3, false); this.setActiveStatus(4, false);
    } else if (code == 3) {
      this.setActiveStatus(0, false); this.setActiveStatus(1, false);
      this.setActiveStatus(2, false); this.setActiveStatus(4, false);
    } else if (code == 4) {
      this.setActiveStatus(0, false); this.setActiveStatus(1, false);
      this.setActiveStatus(2, false); this.setActiveStatus(3, false);
    } // will add more for other categories later
  }

  unownedSkinSelected(code: number) {
    this.setState({ unownedClicked: true });
    this.currID = code;
  }

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
                <Text style={styles.modalText}>
                  Would you like to purchase {this.getItemName(code)} for ${this.getPrice(code)}?
                </Text>
              </View>

              <View style={styles.buttonSeparation}>

                <View>
                  <TouchableOpacity
                    style={[styles.confirmationButton, { backgroundColor: '#555' }]}
                    onPress={() => {
                      this.setState({ confirmationVisible: false }); this.setState({ unownedClicked: false });
                      this.setOwnedStatus(code, false);
                    }}
                  >
                    <Text style={styles.itemText}>NO</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.confirmationButton, { backgroundColor: 'slategray' }]}
                    onPress={() => { this.handlePurchase(code) }}
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

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus(0) ? this.setActiveStatus(0, true) : null }}
                  onPressOut={() => { this.getOwnedStatus(0) ? this.deactivateOthers(0) : this.unownedSkinSelected(0) }}
                  style={this.state.skin0 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Bear</Text>
                  <Image style={styles.itemImage} source={require('./assets/bear.png')} />
                  {this.getOwnedStatus(0) ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(0)}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus(1) ? this.setActiveStatus(1, true) : null }}
                  onPressOut={() => { this.getOwnedStatus(1) ? this.deactivateOthers(1) : this.unownedSkinSelected(1) }}
                  style={this.state.skin1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cat</Text>
                  <Image style={styles.itemImage} source={require('./assets/cat.png')} />
                  {this.getOwnedStatus(1) ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(1)}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus(2) ? this.setActiveStatus(2, true) : null }}
                  onPressOut={() => { this.getOwnedStatus(2) ? this.deactivateOthers(2) : this.unownedSkinSelected(2) }}
                  style={this.state.skin2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cow</Text>
                  <Image style={styles.itemImage} source={require('./assets/cow.png')} />
                  {this.getOwnedStatus(2) ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(2)}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus(3) ? this.setActiveStatus(3, true) : null }}
                  onPressOut={() => { this.getOwnedStatus(3) ? this.deactivateOthers(3) : this.unownedSkinSelected(3) }}
                  style={this.state.skin3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Fox</Text>
                  <Image style={styles.itemImage} source={require('./assets/fox.png')} />
                  {this.getOwnedStatus(3) ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(3)}</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => { this.getOwnedStatus(4) ? this.setActiveStatus(4, true) : null }}
                  onPressOut={() => { this.getOwnedStatus(4) ? this.deactivateOthers(4) : this.unownedSkinSelected(4) }}
                  style={this.state.skin4 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Pig</Text>
                  <Image style={styles.itemImage} source={require('./assets/pig.png')} />
                  {this.getOwnedStatus(4) ? null : <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]} >${this.getPrice(4)}</Text>}
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>HATS</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => this.setState({ hat0: true })}
                  onPressOut={() => {
                    this.setState({ hat1: false }); this.setState({ hat2: false }); this.setState({ hat3: false });
                    this.setState({ hat4: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat0 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat1: true })}
                  onPressOut={() => {
                    this.setState({ hat0: false }); this.setState({ hat2: false }); this.setState({ hat3: false });
                    this.setState({ hat4: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat2: true })}
                  onPressOut={() => {
                    this.setState({ hat0: false }); this.setState({ hat1: false }); this.setState({ hat3: false });
                    this.setState({ hat4: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat3: true })}
                  onPressOut={() => {
                    this.setState({ hat0: false }); this.setState({ hat1: false }); this.setState({ hat2: false });
                    this.setState({ hat4: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat4: true })}
                  onPressOut={() => {
                    this.setState({ hat0: false }); this.setState({ hat1: false }); this.setState({ hat2: false });
                    this.setState({ hat3: false }); this.setState({ hat5: false });
                  }}
                  style={this.state.hat4 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ hat5: true })}
                  onPressOut={() => {
                    this.setState({ hat0: false }); this.setState({ hat1: false }); this.setState({ hat2: false });
                    this.setState({ hat3: false }); this.setState({ hat4: false });
                  }}
                  style={this.state.hat5 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 6</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

              </View>
              <Text style={styles.sectionTitle}>OTHER</Text>
              <View style={styles.itemsContainer}>

                <TouchableOpacity onPressIn={() => this.setState({ other0: true })}
                  onPressOut={() => { this.setState({ other1: false }); this.setState({ other2: false }); }}
                  style={this.state.other0 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ other1: true })}
                  onPressOut={() => { this.setState({ other0: false }); this.setState({ other2: false }); }}
                  style={this.state.other1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ other2: true })}
                  onPressOut={() => { this.setState({ other0: false }); this.setState({ other1: false }); }}
                  style={this.state.other2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('./assets/gary-gillespie.png')} />
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
