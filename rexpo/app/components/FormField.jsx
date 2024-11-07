import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons} from '../../constants';

const FormField = ({
    title,
    value, 
    otherStyles, 
    placeholder, 
    handleChangeText, 
    ...props}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl border ${isFocused ? 'border-secondary' : 'border-black-200'} flex flex-row items-center`}>
        <TextInput
        className="flex-1 text-white font-psemibold text-base"
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        value={value}
        onChangeText={handleChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={title === 'Password' && !showPassword}
        {...props}
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image 
                source= {!showPassword ? icons.eye : icons.eyeHide} 
                className="w-6 h-6"
                resizeMode="contain" 
                />
            </TouchableOpacity>
            )}
      </View>
    </View>
  )
}

export default FormField