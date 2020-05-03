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
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };

//interface 

class ToggleItem extends React.Component<{ label: string, imageSource: string }, { active: boolean }> {
  constructor(props: any) {
    super(props)

    this.state = {
      active: false
    };
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.setState({ active: !this.state.active })}
        style={this.state.active ? styles.itemElementActive : styles.itemElement}
      >
        <Text style={styles.itemText}>{this.props.label}</Text>
        <Image style={styles.itemImage} source={require('../assets/bear.png')} />
        <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
      </TouchableOpacity>
    );
  }

}

class Customize extends React.Component<{}, {
  op1: boolean, op2: boolean, op3: boolean, op4: boolean, op5: boolean, op6: boolean, op7: boolean,
  op8: boolean, op9: boolean, op10: boolean, op11: boolean, op12: boolean, op13: boolean, op14: boolean
}>{
  constructor(props: any) {
    super(props)

    this.state = {
      op1: true, op2: false, op3: false, op4: false, op5: false, op6: true, op7: false,
      op8: false, op9: false, op10: false, op11: false, op12: true, op13: false, op14: false
    };
  }

  render() {

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          {/* <Animated.View style={styles.body}>
            <Text style={styles.screenTitle}>Customize</Text>
            <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '600', paddingRight: 20 }}>$ CURRENCY</Text>
          </Animated.View> */}
          <View style={[styles.body, { zIndex: 3 }]}>
            <Text style={styles.screenTitle}>Customize</Text>
            <Text style={{
              textAlign: 'right', fontSize: 20, fontWeight: '600', paddingRight: 20,
              paddingBottom: 10
            }}>$ CURRENCY</Text>
          </View>
          {/* <FlatList
            ListHeaderComponent={this.Render_FlatList_Sticky_header}
            stickyHeaderIndices={[0]}
          /> */}

          <TouchableOpacity onPress={() => this.exit()}
            style={{
              position: 'absolute', alignSelf: 'center', bottom: 130, backgroundColor: 'rgba(10, 20, 30, 0.5)',
              borderRadius: 60, height: 40, width: 90, margin: 12
            }}>
            <Text style={{ textAlign: 'center', marginVertical: 10, color: 'white' }}>CLOSE</Text>
          </TouchableOpacity>

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          //onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true })}
          >
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            {/* <Icon name="close" /> */}
            {/* <View style={[styles.body, { zIndex: 3, backgroundColor: 'rgba(100, 100, 100, 0.5)' }]}>
              <Text style={styles.screenTitle}>Customize</Text>
              <Text style={{ textAlign: 'right', fontSize: 20, fontWeight: '600', paddingRight: 20 }}>$ CURRENCY</Text>
            </View> */}

            <View style={[styles.body, { paddingTop: 10, paddingBottom: 35, zIndex: 1 }]}>
              <Text style={styles.sectionTitle}>SKINS</Text>
              <View style={styles.itemsContainer}>
                <TouchableOpacity onPressIn={() => this.setState({ op1: true })}
                  onPressOut={() => {
                    this.setState({ op2: false }); this.setState({ op3: false }); this.setState({ op4: false });
                    this.setState({ op5: false });
                  }}
                  style={this.state.op1 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Bear</Text>
                  <Image style={styles.itemImage} source={require('../assets/bear.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPressIn={() => this.setState({ op2: true })}
                  onPressOut={() => {
                    this.setState({ op1: false }); this.setState({ op3: false }); this.setState({ op4: false });
                    this.setState({ op5: false });
                  }}
                  style={this.state.op2 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cat</Text>
                  <Image style={styles.itemImage} source={require('../assets/cat.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op3: true })}
                  onPressOut={() => {
                    this.setState({ op1: false }); this.setState({ op2: false }); this.setState({ op4: false });
                    this.setState({ op5: false });
                  }}
                  style={this.state.op3 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Cow</Text>
                  <Image style={styles.itemImage} source={require('../assets/cow.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op4: true })}
                  onPressOut={() => {
                    this.setState({ op1: false }); this.setState({ op2: false }); this.setState({ op3: false });
                    this.setState({ op5: false });
                  }}
                  style={this.state.op4 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Fox</Text>
                  <Image style={styles.itemImage} source={require('../assets/fox.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op5: true })}
                  onPressOut={() => {
                    this.setState({ op1: false }); this.setState({ op2: false }); this.setState({ op3: false });
                    this.setState({ op4: false });
                  }}
                  style={this.state.op5 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>Pig</Text>
                  <Image style={styles.itemImage} source={require('../assets/pig.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>HATS</Text>
              <View style={styles.itemsContainer}>
                <TouchableOpacity onPressIn={() => this.setState({ op6: true })}
                  onPressOut={() => {
                    this.setState({ op7: false }); this.setState({ op8: false }); this.setState({ op9: false });
                    this.setState({ op10: false }); this.setState({ op11: false });
                  }}
                  style={this.state.op6 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op7: true })}
                  onPressOut={() => {
                    this.setState({ op6: false }); this.setState({ op8: false }); this.setState({ op9: false });
                    this.setState({ op10: false }); this.setState({ op11: false });
                  }}
                  style={this.state.op7 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op8: true })}
                  onPressOut={() => {
                    this.setState({ op6: false }); this.setState({ op7: false }); this.setState({ op9: false });
                    this.setState({ op10: false }); this.setState({ op11: false });
                  }}
                  style={this.state.op8 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op9: true })}
                  onPressOut={() => {
                    this.setState({ op6: false }); this.setState({ op7: false }); this.setState({ op8: false });
                    this.setState({ op10: false }); this.setState({ op11: false });
                  }}
                  style={this.state.op9 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op10: true })}
                  onPressOut={() => {
                    this.setState({ op6: false }); this.setState({ op7: false }); this.setState({ op8: false });
                    this.setState({ op9: false }); this.setState({ op11: false });
                  }}
                  style={this.state.op10 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op11: true })}
                  onPressOut={() => {
                    this.setState({ op6: false }); this.setState({ op7: false }); this.setState({ op8: false });
                    this.setState({ op9: false }); this.setState({ op10: false });
                  }}
                  style={this.state.op11 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 6</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectionTitle}>OTHER</Text>
              <View style={styles.itemsContainer}>
                <TouchableOpacity onPressIn={() => this.setState({ op12: true })}
                  onPressOut={() => { this.setState({ op13: false }); this.setState({ op14: false }); }}
                  style={this.state.op12 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op13: true })}
                  onPressOut={() => { this.setState({ op12: false }); this.setState({ op14: false }); }}
                  style={this.state.op13 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={() => this.setState({ op14: true })}
                  onPressOut={() => { this.setState({ op12: false }); this.setState({ op13: false }); }}
                  style={this.state.op14 ? styles.itemElementActive : styles.itemElement}
                >
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Image style={styles.itemImage} source={require('../assets/gary-gillespie.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  exit() {
    //go back home
  }

  // Render_FlatList_Sticky_header = () => {
  //   var Sticky_header_View = (
  //     <View style={styles.header_style}>
  //       <Text style={{ textAlign: 'center', color: '#fff', fontSize: 22 }}> FlatList Sticky Header </Text>
  //     </View>
  //   );
  //   return Sticky_header_View;
  // };
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
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // alignSelf: 'flex-start',
  },
  itemsContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  itemElement: {
    // flex: 2,
    margin: 10,
    borderRadius: 10,
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
    // flex: 2,
    margin: 10,
    borderRadius: 10,
    width: 100,
    height: 140,
    flexShrink: 100,
    flexGrow: 100,
    flexBasis: 100,
    backgroundColor: 'limegreen',
    textAlign: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  itemText: {
    margin: 5,
    color: '#FFFFFF',
    fontSize: 15,
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
    // textAlign: 'center',
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
  // header_style: {
  //   width: '100%',
  //   height: 45,
  //   backgroundColor: 'transparent',
  //   alignItems: 'center',
  //   justifyContent: 'center'
  // },
});

export default Customize;
