/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component, useState } from 'react';
import Icon from 'react-native-ionicons';
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
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

declare const global: { HermesInternal: null | {} };

const Customize = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          {/* <Icon name="close" /> */}
          <View style={styles.body}>
            <Text style={styles.screenTitle}>Customize</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>SKINS</Text>
            <View style={styles.itemsContainer}>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>Cow</Text>
                  <Image style={styles.itemImage} source={require('../assets/cow.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>Goat</Text>
                  <Image style={styles.itemImage} source={require('../assets/goat.png')} />
                  <Text style={[styles.itemText, { textAlignVertical: 'bottom' }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.sectionTitle}>HATS</Text>
            <View style={styles.itemsContainer}>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 4</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 5</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 6</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.sectionTitle}>OTHER</Text>
            <View style={styles.itemsContainer}>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 1</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 2</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.itemElement} >
                <TouchableOpacity>
                  <Text style={styles.itemText}>ITEM 3</Text>
                  <Text style={[styles.itemText, { paddingTop: 80 }]}>$ PRICE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );


  function exit() { }

  function select() {
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
    paddingTop: 45,
    paddingBottom: 25,
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
  itemText: {
    margin: 5,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    alignContent: 'space-between',
    textAlign: 'center',
  },
  itemImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginVertical: 15,
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
});

export default Customize;
