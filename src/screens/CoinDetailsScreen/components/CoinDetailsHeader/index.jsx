import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { useWatchList } from '../../../../contexts/WatchListContext';
import styles from './styles';


const CoinDetailsHeader = (props) => {
  const { coinId, image, symbol, marketCapRank } = props
  const navigation = useNavigation()
  const { watchListCoinIds, storeWatchListCoinId, removeStoreWatchListCoinId } = useWatchList()

  const checkIfCoinIsWatchListed = () =>
    watchListCoinIds.some((coinIdValue) => coinIdValue === coinId)


  const handleWatchListCoin = () => {
    if (checkIfCoinIsWatchListed()) {
      return removeStoreWatchListCoinId(coinId)
    }
    return storeWatchListCoinId(coinId)
  }

  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back-sharp" size={30} color="white" onPress={() => navigation.goBack()} />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ height: 25, width: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>#{marketCapRank}</Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchListed() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchListed() ? "#FFBF00" : "white"}
        onPress={handleWatchListCoin}
      />
    </View>
  )
}

export default CoinDetailsHeader