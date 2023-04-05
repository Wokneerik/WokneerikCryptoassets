import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import CoinItem from '../../components/CoinItem';
import { getMarketData } from '../../services/requests';

const HomeScreen = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState()

  const fetchCoins = async (pageNumber) => {
    if (loading) {
      return
    }
    setLoading(true)
    const coinsData = await getMarketData(pageNumber)
    setCoins((existingCoins) => ([...existingCoins, ...coinsData]))
    setLoading(false)
  }

  const refreshCoins = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const coinsData = await getMarketData()
    setCoins(coinsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [])
  return (
    <View>
      <Text style={{ fontFamily: 'LeagueGothic', color: 'white', fontSize: 30, letterSpacing: 2, paddingHorizontal: 20, paddingBottom: 10, paddingTop: 5 }}>Wokneerik Cryptoassets</Text>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(coins.length / 50 + 1)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refreshCoins}
          />
        }
      />
    </View>
  )
}

export default HomeScreen