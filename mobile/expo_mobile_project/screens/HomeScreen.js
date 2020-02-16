import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons'; 
import { MonoText } from '../components/StyledText';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image source = {require('../assets/images/logo_centered.png')} style = {styles.logo}/>
          <View>
            <Button title = ''></Button>
            <TouchableOpacity>
            <Ionicons name= 'md-camera' size={160} onPress = {()=>navigation.navigate('Camera')}/>
            </TouchableOpacity>
            
          </View>
          <Text style = {{fontSize: 20}} >Click the Camera to Get Started</Text>
        </View>

    </View>
  );
}


HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center'
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    alignSelf: "center"
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});
