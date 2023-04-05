import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl } from 'react-native';
import CoinItem from '../../components/CoinItem';
import { useWatchList } from "../../contexts/WatchListContext";
import { getWatchListedCoins } from '../../services/requests';

const WatchListScreen = () => {
  const { watchListCoinIds } = useWatchList()

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)

  const transformCoinsIds = () => watchListCoinIds.join('%2C')

  const fetchWatchListedCoins = async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const watchListedCoinsData = await getWatchListedCoins(1, transformCoinsIds())
    setCoins(watchListedCoinsData)
    setLoading(false)
  }

  useEffect(() => {
    if (watchListCoinIds.length > 0) {
      fetchWatchListedCoins()
    }
  }, [watchListCoinIds])

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketCoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={watchListCoinIds.length > 0 ? fetchWatchListedCoins : null}
        />
      }
    />
  )
}

export default WatchListScreen