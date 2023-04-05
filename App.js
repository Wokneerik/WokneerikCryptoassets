import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RecoilRoot } from 'recoil';
import WatchListProvider from './src/contexts/WatchListContext';
import Navigation from './src/navigation';


export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    LeagueGothic: require('./assets/fonts/LeagueGothic-Regular.otf')
  })

  if (!fontsLoaded) {
    return <ActivityIndicator size={'large'} />
  }

  return (
    <NavigationContainer theme={{
      colors: {
        background: '#121212'
      }
    }}>
      <RecoilRoot>
        <WatchListProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="light" />
          </View>
        </WatchListProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
  },
});
