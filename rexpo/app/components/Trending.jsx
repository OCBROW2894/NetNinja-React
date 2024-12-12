import { View, Text, FlatList } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';

const trendingItem =() =>{
  return(
    <Animatable.View>
      
    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  return (
    <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
        <Text className="text-3xl text-white">{item.id}</Text>
    )}
    horizontal
    />
  )
}

export default Trending