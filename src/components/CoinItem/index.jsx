import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styles from './styles';

const CoinItem = ({ marketCoin }) => {
  const {
    id,
    name,
    image,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
    symbol,
    market_cap
  } = marketCoin

  const navigation = useNavigation()

  const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white'

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(2)} T`
    }
    if (marketCap > 1_000_000_000) {
      return `${(marketCap / 1_000_000_000).toFixed(2)} B`
    }
    if (marketCap > 1_000_000) {
      return `${(marketCap / 1_000_000).toFixed(2)} M`
    }
    if (marketCap > 1_000) {
      return `${(marketCap / 1_000).toFixed(2)} K`
    }
    return marketCap
  }

  return (
    <Pressable
      style={styles.coinContainer}
      onPress={() => navigation.navigate("CoinDetailsScreen", { coinId: id })}>
      <Image source={{ uri: image }} style={{ height: 30, width: 30, marginRight: 10, alignSelf: "center" }} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup'}
            size={14}
            color={percentageColor}
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>{price_change_percentage_24h?.toFixed(2)}%</Text>
        </View>
      </View>
      <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={{ color: 'white' }}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </Pressable>
  );
}

export default CoinItem