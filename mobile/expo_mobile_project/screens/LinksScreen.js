import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen({route}) {
  let side_effects_arr = []
    for (let [key, value] of Object.entries(route.params.data)) {
      console.log(key, value)
      side_effects_arr.push({'key': key, 'effects': value['effects'], 'type': value['type']})
    }

    return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {side_effects_arr.map(side_effect => <ListItem props={side_effect}/>)}
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

function ListItem(props) {
    let key = props.props.key
    let effects = props.props.effects
    let type = props.props.type

    let icon = type == "GOOD"
        ?
        <Ionicons style={{marginRight: 12}} name="md-heart" size={24} color="red"/>
        :
        <Ionicons style={{marginRight: 12}} name="md-heart-dislike" size={24} color="red"/>;

    return(
        <View style={{marginTop: 4, marginBottom: 4}}>
        <View style={{
            flexDirection: 'row',
            marginLeft: 8,
            marginRight: 48,
            justifyContent: 'flex-start',
        }}>
            {icon}
            <View style={{flexDirection: 'row', marginRight: 180}}>
                <Text>{key}: </Text>
                <Text style={{color: 'rgb(108, 117, 125)'}}>{effects}</Text>
            </View>
        </View>
            <View
                style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    marginTop: 16,
                    marginBottom: 8,
                    width: '85%',
                    alignSelf: 'center'
                }}
            />
        </View>
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
