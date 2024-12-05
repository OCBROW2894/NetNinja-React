import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons} from '../../constants';

const SearchInput = ({
    title,
    value, 
    otherStyles, 
    placeholder, 
    handleChangeText, 
    ...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
  return (
      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center space-x-4`}>
        <TextInput
        className="flex-1 text-white font-psemibold text-base mt-0.5 font-pregular"
        placeholder="Search For A Video Topic"
        placeholderTextColor="#7B7B8B"
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={title === 'Password' && !showPassword}
        {...props}
        />

        <TouchableOpacity>
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