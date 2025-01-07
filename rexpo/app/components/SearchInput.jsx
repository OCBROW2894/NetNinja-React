import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons} from '../../constants';
import { usePathname } from 'expo-router';

const SearchInput = () => {
    const pathname = usePathname();
    const [ query, setQuery ] = useState('');
    const [isFocused, setIsFocused] = useState(false);
  return (
      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center space-x-4`}>
        <TextInput
        className="flex-1 text-white font-psemibold text-base mt-0.5 font-pregular"
        placeholder="Search For A Video Topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity 
          onPress={() => {
            if (!query) {
              return Alert.alert("Missing Query", "Please enter a search query")
            }
          }}
        >
            <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode="contain"
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput