import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

const FormField = ({title, value, otherStyles, placeholder, handleChangeText, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={'space-y-2 ${otherStyles}'}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">

        <TextInput
        className="flex-1 text-white font-psemibold text-base"
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword}
        />
      </View>
    </View>
  )
}

export default FormField