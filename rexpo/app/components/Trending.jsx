// Import necessary components and libraries
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import * as Animatable from 'react-native-animatable'; // For animation effects
import { icons } from '../../constants'
import { Video, ResizeMode } from 'expo-av'; // For video playback

// Animation configuration for zooming in effect
const zoomIn = {
  0: {
    scale: 0.9  // Start at 90% size
  },
  1: {
    scale: 1.1, // Expand to 110% size
  }
}

// Animation configuration for zooming out effect
const zoomOut = {
  0: {
    scale: 1.1  // Start at 110% size
  },
  1: {
    scale: 0.9, // Shrink to 90% size
  }
}

// Individual trending item component that displays either video or thumbnail
const TrendingItem = ({activeItem, item}) => {
  const [play, setPlay] = useState(false); // Track if video should play

  return(
    <Animatable.View
    className="mr-5"
    // Apply zoom animation based on whether this item is active
    animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
    duration={500}
    >
      {play ? (
        // Video player component shown when play is true
        <Video
        source={{uri: item.video}}
        className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        // Reset play state when video finishes
        onPlaybackStatusUpdate={(status)=> {
          if(status.didJustFinish) {
            setPlay(false);
          }
        }}
        />
      ) : (
        // Thumbnail view shown when play is false
        <TouchableOpacity 
          className="relative justify-center items-center" 
          activeOpacity={0.7} 
          onPress={() => setPlay(true)} // Start video on press
        >
          <ImageBackground
            source={{uri: item.thumbnail}}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
           />

           {/* Play button overlay */}
           <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
           />
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

// Main Trending component that renders a horizontal list of trending items
const Trending = ({posts}) => {
  const [activeItem, setactiveItem] = useState(posts[1]); // Track currently visible item
  
  // Update active item when scroll position changes
  const viewableItemsChanged = ({viewableItems}) => {
    setactiveItem(viewableItems[0].key);
  }

  return (
    <FlatList
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({item}) => (
        <TrendingItem activeItem={activeItem} item={item} />
    )}

    // Configure visibility detection
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold: 70 // Item must be 70% visible to be considered "active"
    }}

    contentOffset={{x: 170}} // Initial scroll position
    horizontal // Enable horizontal scrolling
    />
  )
}

export default Trending