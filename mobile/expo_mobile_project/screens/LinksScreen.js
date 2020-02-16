import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen({route}) {
    // let route = this.props.route
    // if (route.params != null) {
    //     console.log(route.params.data['SODIUM BENZOATE'])
    //   for (let [key, value] of Object.entries(route.params.data)) {
    //     side_effects_arr.push({'key': key, 'value': value})
    //       console.log(key + ' | ' + value)
    //   }
  let side_effects_arr = []
    for (let [key, value] of Object.entries(route.params.data)) {
      console.log(key, value)
      side_effects_arr.push({'key': key, 'value': value})
    }

    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {side_effects_arr.map(side_effect => (<Text>{side_effect.key} {side_effect.value}</Text>))}
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
