import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from "react";

const WatchListContext = createContext()

export const useWatchList = () => useContext(WatchListContext)

const WatchListProvider = ({ children }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState([])

  const getWatchListData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins")
      setWatchListCoinIds(jsonValue != null ? JSON.parse(jsonValue) : [])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getWatchListData()
  }, [])

  const storeWatchListCoinId = async (coinId) => {
    try {
      const newWatchList = [...watchListCoinIds, coinId]
      const jsonValue = JSON.stringify(newWatchList)
      await AsyncStorage.setItem('@watchlist_coins', jsonValue)
      setWatchListCoinIds(newWatchList)
    } catch (e) {
      console.log(e)
    }
  }

  const removeStoreWatchListCoinId = async (coinId) => {
    const newWatchList = watchListCoinIds.filter((coinIdValue) => coinIdValue !== coinId)
    const jsonValue = JSON.stringify(newWatchList)
    await AsyncStorage.setItem('@watchlist_coins', jsonValue)
    setWatchListCoinIds(newWatchList)

  }



  return (
    <WatchListContext.Provider value={{ watchListCoinIds, storeWatchListCoinId, removeStoreWatchListCoinId }}>
      {children}
    </WatchListContext.Provider>
  )
}

export default WatchListProvider